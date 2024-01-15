import { Box } from '../state';
import CodeBox from './code-box';
import MarkdownEditor from './markdown-editor';
import PositionBar from './position-bar';
import './box-list-item.css';

interface BoxListItemProps {
  box: Box
}

const BoxListItem: React.FC<BoxListItemProps> = ({ box }) => {
  let child: JSX.Element;

  if (box.type === 'code') {
    child = (
      <>
        <div className='position-bar-wrapper'>
          <PositionBar id={box.id} />
        </div>
        <CodeBox box={box}/>
      </>
    )
  } else {
    child = (
      <>
        <MarkdownEditor box={box} />
        <PositionBar id={box.id} />
      </>
    )
  }

  return (
    <div className='box-list-item'>
      {child}
    </div>
  )
};

export default BoxListItem;
