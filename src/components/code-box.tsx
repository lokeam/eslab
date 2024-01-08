import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';

const CodeBox = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  const codeEditorInitialValue="let editMe = true;"

  return (
    <div>
      <CodeEditor
        initialValue={codeEditorInitialValue}
        onChange={(value) => setInput(value)}
      />
      <textarea 
        onChange={(event) => setInput(event.target.value)}
        value={input}
      >
      </textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  )
};

export default CodeBox;
