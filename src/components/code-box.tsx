import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Box } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-box.css';

interface CodeBoxProps {
  box: Box
}

const CodeBox: React.FC<CodeBoxProps> = ({ box }) => {
  const { updateBox, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[box.id]);

  useEffect(() => {
    if (!bundle) {
      createBundle(box.id, box.content);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(box.id, box.content)
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // Todo: Find better way to do remove output window flash without
    // including bundle pointer into dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box.id, box.content, createBundle]);

  return (
    <Resizable direction="vertical">
      <div style={{height: "calc(100% - 10px)", display: "flex", flexDirection: "row"}}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={box.content}
            onChange={(value) => updateBox(box.id, value)}
          />
        </Resizable>
        <div className="progress-cover-wrapper">
          {!bundle || bundle.processing ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">Loading</progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  )
};

export default CodeBox;
