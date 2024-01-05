import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
import './code-editor.css';
import './syntax.css';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const codeEditorRef = useRef<any>();

  const onEditorDidMOunt: EditorDidMount = (
    getValue,
    monacoEditor) => {
      codeEditorRef.current = monacoEditor;
      monacoEditor.onDidChangeModelContent(() => {
        onChange(getValue());
      });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2});

    const highlighter = new Highlighter(
      // Todo: workaround for global window object Monaco bug
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    // Do not attempt to console.log out any errors that may occur during syntax highlighting
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };
  
  const onFormatClick = () => {
    const unformatted = codeEditorRef.current.getModel().getValue();

    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    }).replace(/\n$/, '');

    codeEditorRef.current.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}
      >Format</button>
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
