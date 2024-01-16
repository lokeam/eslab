import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Box } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeBoxProps {
  box: Box
}

const CodeBox: React.FC<CodeBoxProps> = ({ box }) => {
  const { updateBox, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[box.id]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(box.id, box.content)
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [box.id, box.content, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={box.content}
            onChange={(value) => updateBox(box.id, value)}
          />
        </Resizable>
        {bundle && <Preview code={bundle.code} err={bundle.err} /> }
    </div>
    </Resizable>
  )
};

export default CodeBox;
