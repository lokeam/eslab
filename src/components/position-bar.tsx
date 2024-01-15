import './position-bar.css';
import { useActions  } from "../hooks/use-actions";

/*
  Floating bar on top right corner of code panes.
  Changes positions of any coding panes or deletes them entirely
*/

interface PositionBarProps {
  id: string;
}

const PositionBar: React.FC<PositionBarProps> = ({ id }) => {
  const { moveBox, deleteBox } = useActions();

  return (
    <div className="position-bar">
      <button onClick={() => { moveBox(id, 'up')}}>
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button onClick={() => { moveBox(id, 'down')}}>
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button onClick={() => { deleteBox(id)}}>
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
}

export default PositionBar;