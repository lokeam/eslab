import { Box } from '../state';
import CodeBox from './code-box';
import MarkdownEditor from './markdown-editor';
import PositionBar from './position-bar';

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
    <div>
      <PositionBar id={box.id} />
      {child}
    </div>
  )
};

export default BoxListItem;
