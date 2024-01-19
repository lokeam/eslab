import { useCallback, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Box } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-box.css';
import { code } from '@uiw/react-md-editor/lib/cjs/commands';

interface CodeBoxProps {
  box: Box
}

const CodeBox: React.FC<CodeBoxProps> = ({ box }) => {
  const { updateBox, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[box.id]);
  const { data, order } = useTypedSelector((state) => state.boxes);

  const codeAggregate = useCallback(() => {
    const orderedBoxes = order.map(id => data[id]);
    const result = [];

    let showFn = `
      const show = (value) => {
        const rootElement = document.querySelector('#root');
        if (typeof value === 'object') {

          // Show JSX elements
          if (value.$$typeof && value.props) {
            ReactDOM.render(value, rootElement);

            // Show content and complex values
          } else {
            rootElement.innerHTML = JSON.stringify(value);
          }
        } else {
          rootElement.innerHTML = value;
        }
      };
    `;
    result.push(showFn);

    for (let index = 0; index < orderedBoxes.length; index++) {
      if (orderedBoxes[index].type === 'code') {
        result.push(orderedBoxes[index].content);
      }
      if (orderedBoxes[index].id === box.id) break;
    }

    return result;
  }, [order, data, box.id]);

  useEffect(() => {
    if (!bundle) {
      createBundle(box.id, codeAggregate().join('\n'));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(box.id, codeAggregate().join('\n'))
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // Todo: Find better way to do remove output window flash without
    // including bundle pointer into dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box.id, codeAggregate().join('\n'), createBundle]);

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
