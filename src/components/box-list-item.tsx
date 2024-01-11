import { Box } from '../state';
import CodeBox from './code-box';
import MarkdownEditor from './markdown-editor';

interface BoxListItemProps {
  box: Box
}

const BoxListItem: React.FC<BoxListItemProps> = ({ box }) => {
  let child: JSX.Element;

  if (box.type === 'code') {
    child = <CodeBox box={box}/>
  } else {
    child = <MarkdownEditor box={box} />
  }

  return (
    <div>{child}</div>
  )
};

export default BoxListItem;