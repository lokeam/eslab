import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { useState } from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import bundle from './bundler';

const App = () => {
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

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
