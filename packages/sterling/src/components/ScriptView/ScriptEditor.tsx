import { editor } from 'monaco-editor';
import { useCallback, useEffect, useState } from 'react';
import MonacoEditor, { monaco } from 'react-monaco-editor';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

interface ScriptEditorProps {
  initialText: string;
  editorRef: (editor: IStandaloneCodeEditor) => void;
  stageRef: SVGSVGElement | HTMLCanvasElement | HTMLDivElement | null;
  beforeUnmount: (text: string) => void;
  onExecute: () => void;
}

const ScriptEditor = (props: ScriptEditorProps) => {
  const { initialText, editorRef, stageRef, beforeUnmount, onExecute } = props;

  const [editor, setEditor] = useState<IStandaloneCodeEditor>();

  const editorDidMount = useCallback((editor: IStandaloneCodeEditor) => {
    editorRef(editor);
    setEditor(editor);
  }, []);

  useEffect(() => {
    if (editor) {
      editor.addCommand(monaco.KeyMod.WinCtrl | monaco.KeyCode.Enter, () => {
        onExecute();
      });
    }
  }, [editor, onExecute, stageRef]);

  return (
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
      editorDidMount={editorDidMount}
      editorWillUnmount={(editor) => {
        const value = editor.getValue();
        beforeUnmount(value);
      }}
    />
  );
};

export { ScriptEditor };
