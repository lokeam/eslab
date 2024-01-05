import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {

  const onEditorDidMOunt: EditorDidMount = (
    getValue,
    monacoEditor) => {
      monacoEditor.onDidChangeModelContent(() => {
        onChange(getValue());
      });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2});
  };
  
  const onFormatClick = () => {
    /*
    1. get current val
    2. format
    3. set formatted value in editor
    */
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        language="javascript"
        editorDidMount={onEditorDidMOunt}
        height="300px"
        options={{
          wordWrap: 'on',
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 18,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
        theme="dark"
        value={initialValue}
      />
    </div>
    )
}

export default CodeEditor;
