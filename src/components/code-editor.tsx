import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  return (
  <MonacoEditor
    language="javascript"
    height="300px"
    theme="dark"
    options={{
      wordWrap: 'on',
      showUnused: false,
      folding: false,
      lineNumbersMinChars: 3,
      fontSize: 18,
      scrollBeyondLastLine: false,
      automaticLayout: true
    }}
    value={initialValue}
  />)
}

export default CodeEditor;
