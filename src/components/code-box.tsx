import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeBox = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  const codeEditorInitialValue="let editMe = true;"

  return (
    <Resizable direction='vertical'>
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <CodeEditor
          initialValue={codeEditorInitialValue}
          onChange={(value) => setInput(value)}
        />
        <Preview code={code} />
    </div>
    </Resizable>
  )
};

export default CodeBox;
