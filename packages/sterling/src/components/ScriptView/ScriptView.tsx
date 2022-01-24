import { DatumParsed, isDatumAlloy } from '@/sterling-connection';
import { Projection } from '@/sterling-theme';
import { Pane, PaneBody, PaneHeader } from '@/sterling-ui';
import { useToast } from '@chakra-ui/react';
import { require as d3require } from 'd3-require';
import { editor } from 'monaco-editor';
import { useCallback, useState } from 'react';
import { useSterlingDispatch, useSterlingSelector } from '../../state/hooks';
import { scriptTextSet } from '../../state/script/scriptSlice';
import {
  selectActiveDatum,
  selectProjections,
  selectScriptStage,
  selectScriptText
} from '../../state/selectors';
import { AlloyAtom } from './alloy-proxy/AlloyAtom';
import { AlloyInstance } from './alloy-proxy/AlloyInstance';
import { ScriptEditor } from './ScriptEditor';
import { ScriptViewHeader } from './ScriptViewHeader';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

const ScriptView = () => {
  const activeDatum = useSterlingSelector(selectActiveDatum);
  const projections = useSterlingSelector((state) =>
    activeDatum ? selectProjections(state, activeDatum.id) : []
  );
  const initialText = useSterlingSelector(selectScriptText);
  const stage = useSterlingSelector(selectScriptStage);
  const dispatch = useSterlingDispatch();
  const toast = useToast();

  const [size, setSize] = useState<DOMRect>();
  const [editor, setEditor] = useState<IStandaloneCodeEditor>();
  const [stageRef, setStageRef] = useState<
    SVGSVGElement | HTMLCanvasElement | HTMLDivElement | null
  >(null);

  const containerRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      setSize(node.getBoundingClientRect());
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === node) {
            setSize(entry.contentRect);
          }
        });
      });
      resizeObserver.observe(node);
    }
  }, []);
  const editorRef = useCallback((editor: IStandaloneCodeEditor) => {
    setEditor(editor);
  }, []);
  const svgRef = useCallback((node: SVGSVGElement) => {
    if (node) setStageRef(node);
  }, []);
  const canvasRef = useCallback((node: HTMLCanvasElement) => {
    if (node) setStageRef(node);
  }, []);
  const divRef = useCallback((node: HTMLDivElement) => {
    if (node) setStageRef(node);
  }, []);

  const onExecute = useCallback(() => {
    const scriptText = editor?.getValue();
    const instance = getAlloyProxy(activeDatum);
    if (scriptText && instance && stageRef && size) {
      dispatch(scriptTextSet(scriptText));
      const width = size.width;
      const height = size.height;
      const [libraryNames, script] = extractRequires(scriptText);
      const [variableNames, variables] = getInstanceVariables(
        instance,
        projections
      );
      Promise.all(libraryNames.map(fetchLibrary)).then((libraries) => {
        try {
          const executable = new Function(
            stage,
            'width',
            'height',
            'instance',
            ...variableNames,
            ...libraryNames,
            script
          );
          executable(
            stageRef,
            width,
            height,
            instance,
            ...variables,
            ...libraries
          );
        } catch (e) {
          if (e instanceof Error) {
            toast({
              variant: 'top-accent',
              position: 'bottom-right',
              title: e.name,
              description: e.message,
              status: 'error',
              duration: 10000,
              isClosable: true
            });
          } else {
            toast({
              variant: 'top-accent',
              position: 'bottom-right',
              title: 'Error',
              description: `${e}`,
              status: 'error',
              duration: 9000,
              isClosable: true
            });
          }
        }
      });
    }
  }, [editorRef, stageRef, activeDatum, projections, size]);

  const beforeUnmount = useCallback((text: string) => {
    dispatch(scriptTextSet(text));
  }, []);

  if (!activeDatum) return null;
  return (
    <Pane>
      <PaneHeader className='border-b'>
        <ScriptViewHeader datum={activeDatum} onExecute={onExecute} />
      </PaneHeader>
      <PaneBody>
        <div className='grid grid-cols-2 divide-x h-full'>
          <Pane ref={containerRef} className='relative'>
            {stage === 'div' && <div ref={divRef} className='w-full h-full' />}
            {stage === 'canvas' && (
              <canvas ref={canvasRef} className='w-full h-full' />
            )}
            {stage === 'svg' && (
              <svg
                ref={svgRef}
                className='relative inset-0'
                width='100%'
                height='100%'
              />
            )}
          </Pane>
          <Pane className='relative'>
            <ScriptEditor
              initialText={initialText}
              editorRef={editorRef}
              stageRef={stageRef}
              beforeUnmount={beforeUnmount}
              onExecute={onExecute}
            />
          </Pane>
        </div>
      </PaneBody>
    </Pane>
  );
};

function extractRequires(text: string): [string[], string] {
  const lines = text.split('\n');
  const requires: string[] = [];
  let firstIndex = 0;
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    const found = line.match(/require\(['|"](.*)['|"]\)/);
    if (found) {
      requires.push(found[1]);
      firstIndex += 1;
    } else {
      break;
    }
  }
  return [requires, lines.slice(firstIndex).join('\n')];
}

function getAlloyProxy(datum?: DatumParsed<any>): AlloyInstance | null {
  if (datum && isDatumAlloy(datum)) {
    return new AlloyInstance(datum.data);
  }
  return null;
}

function getInstanceVariables(
  instance: AlloyInstance,
  projections: Projection[]
): [string[], any[]] {
  const atoms = instance.atoms();
  const projectAtoms: AlloyAtom[] = [];
  projections.forEach((projection) => {
    const atomId = projection.atom;
    if (atomId) {
      const atom = atoms.find((atom) => atom.id() === atomId);
      if (atom) projectAtoms.push(atom);
    }
  });

  const _instance = instance.project(projectAtoms);
  const _sigs = _instance.signatures();
  const _atoms = _instance.atoms().filter((atom) => isNaN(+atom.id()));
  const _fields = _instance.fields();
  const _skolems = _instance.skolems();

  return [
    [
      ..._sigs.map(varName),
      ..._atoms.map(varName),
      ..._fields.map(varName),
      ..._skolems.map(varName)
    ],
    [..._sigs, ..._atoms, ..._fields, ..._skolems]
  ];
}

function varName(item: any): string {
  return Reflect.get(item, '__var__');
}

function fetchLibrary(library: string): Promise<any> {
  return d3require(library);
}

export { ScriptView };
