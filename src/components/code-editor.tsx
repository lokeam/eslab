import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {

  const onEditorDidMOunt = (
    getValue: () => string,
    monacoEditor: any) => {
      monacoEditor.onDidChangeModelContent(() => {
        onChange(getValue());
      });
  };
  
  return (
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
  />)
}

export default CodeEditor;
