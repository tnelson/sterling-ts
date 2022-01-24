import { DatumParsed, isDatumAlloy } from '@/sterling-connection';
import { Pane, PaneBody, PaneHeader } from '@/sterling-ui';
import { editor } from 'monaco-editor';
import { useCallback } from 'react';
import { require as d3require } from 'd3-require';
import MonacoEditor, { monaco } from 'react-monaco-editor';
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

  const onRun = useCallback(
    (editor: IStandaloneCodeEditor) => {
      const value = editor.getModel()?.getValue();
      const instance = getAlloyProxy(activeDatum);
      const projs = new Map<string, string>();

      projections.forEach((projection) => {
        if (projection.type && projection.atom) {
          projs.set(projection.type, projection.atom);
        }
      });

      if (value && instance) {
        const [libs, val] = extractRequires(value);
        const [varnames, vars] = getInstanceVariables(instance, projs);

        Promise.all(libs.map(fetchLibrary)).then((libraries) => {
          const script = new Function(...varnames, ...libs, val);
          script(...vars, ...libraries);
        });
      }
    },
    [activeDatum, projections]
  );

  if (!activeDatum) return null;
  return (
    <Pane>
      <PaneHeader className='border-b'>
        <ScriptViewHeader datum={activeDatum} />
      </PaneHeader>
      <PaneBody>
        <div className='grid grid-cols-2 divide-x h-full'>
          <Pane className='relative'>
            {stage === 'div' && <div className='w-full h-full' />}
            {stage === 'canvas' && <canvas className='w-full h-full' />}
            {stage === 'svg' && <svg className='w-full h-full' />}
          </Pane>
          <Pane className='relative'>
            <MonacoEditor
              language='javascript'
              options={{
                automaticLayout: true,
                scrollBeyondLastLine: false,
                scrollbar: {
                  verticalScrollbarSize: 12
                },
                value: initialText
              }}
              editorDidMount={(editor) => {
                editor.addCommand(
                  monaco.KeyMod.WinCtrl | monaco.KeyCode.Enter,
                  () => {
                    onRun(editor);
                  }
                );
              }}
              editorWillUnmount={(editor: IStandaloneCodeEditor) => {
                const value = editor.getModel()?.getValue();
                if (value) {
                  dispatch(scriptTextSet(value));
                }
              }}
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
  projections: Map<string, string>
): [string[], any[]] {
  const atoms = instance.atoms();
  const projectAtoms: AlloyAtom[] = [];
  projections.forEach((atomID) => {
    const atom = atoms.find((atom) => atom.id() === atomID);
    if (!atom) throw Error(`Atom ${atomID} not in instance`);
    projectAtoms.push(atom);
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
