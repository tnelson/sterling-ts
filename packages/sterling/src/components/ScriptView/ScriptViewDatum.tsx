import { DatumParsed } from '@/sterling-connection';
import { useDimensions } from '@/sterling-hooks';
import { Pane, PaneBody, PaneHeader } from '@/sterling-ui';
import { useToast } from '@chakra-ui/react';
import { editor } from 'monaco-editor';
import { useCallback, useRef, useState } from 'react';
import { useSterlingDispatch, useSterlingSelector } from '../../state/hooks';
import { ScriptStageElement } from '../../state/script/script';
import {
  scriptStageDimensionsSet,
  scriptTextSet
} from '../../state/script/scriptSlice';
import {
  selectScriptStage,
  selectScriptStageDimensions,
  selectScriptText,
  selectScriptVariables
} from '../../state/selectors';
import { extractRequires } from './extractRequires';
import { fetchLibrary } from './fetchLibrary';
import { ScriptEditor } from './ScriptEditor';
import { ScriptViewHeader } from './ScriptViewHeader';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

interface ScriptViewDatumProps {
  datum: DatumParsed<any>;
}

const ScriptViewDatum = (props: ScriptViewDatumProps) => {
  const { datum } = props;

  const dispatch = useSterlingDispatch();
  const toast = useToast();

  const stage = useSterlingSelector(selectScriptStage);
  const size = useSterlingSelector(selectScriptStageDimensions);
  const initialText = useSterlingSelector(selectScriptText);
  const datumVariables = useSterlingSelector((state) =>
    selectScriptVariables(state, datum)
  );

  const [editor, setEditor] = useState<IStandaloneCodeEditor>();
  const [stageRef, setStageRef] = useState<ScriptStageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useDimensions(containerRef, (rect) => {
    dispatch(
      scriptStageDimensionsSet({
        width: rect.width,
        height: rect.height
      })
    );
  });

  // TN: todo more sanitization
  function sanitizeLibNames(ln: string): string {
    return ln.replaceAll('-', '_')
  }

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

  const beforeUnmount = useCallback((text: string) => {
    dispatch(scriptTextSet(text));
  }, []);

  // TODO: figure out the right way to actually import the real thing
  const internalSterlingHelpers = [
    {name: 'helper1', value: (x: number) => (x + 1)},
    {name: 'helper2', value: (x: number, y: number) => (y - x)}
  ]

  const onExecute = useCallback(() => {
    const text = editor?.getValue();
    if (text && stageRef && size) {
      // save the script text before executing
      dispatch(scriptTextSet(text));

      // extract any required libraries from the script
      const [libNames, script] = extractRequires(text);

      // fetch all libraries and execute the script
      Promise.all(libNames.map(fetchLibrary)).then((libraries) => {
        try {
          const executable = new Function(
            stage,
            'width',
            'height',
            ...internalSterlingHelpers.map((v) => v.name),
            ...datumVariables.map((v) => v.name),
            ...libNames.map((ln) => sanitizeLibNames(ln)),
            script
          );
          executable(
            stageRef,
            size.width,
            size.height,
            ...internalSterlingHelpers.map((v) => v.value),
            ...datumVariables.map((v) => v.variable),
            ...libraries
          );
        } catch (e) {
          toast({
            variant: 'top-accent',
            position: 'bottom-right',
            title: e instanceof Error ? e.name : 'Error',
            description: e instanceof Error ? e.message : `${e}`,
            status: 'error',
            duration: 10000,
            isClosable: true
          });
        }
      });
    }
  }, [editor, stage, stageRef, size, datumVariables]);

  return (
    <Pane>
      <PaneHeader className='border-b'>
        <ScriptViewHeader datum={datum} onExecute={onExecute} />
      </PaneHeader>
      <PaneBody>
        <div className='grid grid-cols-2 divide-x h-full'>
          <Pane ref={containerRef} className='relative'>
            {stage === 'div' && <div ref={divRef} className='w-full h-full' />}
            {stage === 'canvas' && (
              <canvas ref={canvasRef} className='w-full h-full' />
            )}
            {/* Placing the SVG element within a scrolling div will enable scrolling, 
                provided that the SVG height/width styling is changed directly by the script. 
                The slightly off-white background color shows the actual full SVG area.*/}
            {stage === 'svg' && 
              <div id='svg-container' style={{height: '100%', width: '100%', overflow: 'scroll'}}>
                <svg ref={svgRef} style={{width:'100%', height:'100%', backgroundColor: 'snow'}}/>
              </div>}
          </Pane>
          <Pane className='relative'>
            <ScriptEditor
              initialText={initialText}
              variables={datumVariables}
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

export { ScriptViewDatum };
