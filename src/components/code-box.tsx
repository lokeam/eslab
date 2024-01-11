import { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';
import { Box } from '../state';
import { useActions } from '../hooks/use-actions';

interface CodeBoxProps {
  box: Box
}

const CodeBox: React.FC<CodeBoxProps> = ({ box }) => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const { updateBox } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(box.content);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [box.content]);

  const codeEditorInitialValue="let editMe = true;"

  return (
    <Resizable direction='vertical'>
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={box.content}
            onChange={(value) => updateBox(box.id, value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
    </div>
    </Resizable>
  )
};

export default CodeBox;
