import { useActions } from '../hooks/use-actions';
import './add-box.css';

interface AddBoxProps {
  nextBoxId: string | null;
  forceVisible?: boolean;
}

const AddBox: React.FC<AddBoxProps> = ({ forceVisible, nextBoxId }) => {
  const { insertBoxBefore } = useActions();

  return (
    <div className={`add-box ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() => insertBoxBefore(nextBoxId, 'code')}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>Code</span>
        </button>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() => insertBoxBefore(nextBoxId, 'text')}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>Markdown</span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  )

}

export default AddBox;
