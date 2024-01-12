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
    <div>
      <button onClick={() => { moveBox(id, 'up')}}>Up</button>
      <button onClick={() => { moveBox(id, 'down')}}>Down</button>
      <button onClick={() => { deleteBox(id)}}>Delete</button>
    </div>
  );
}

export default PositionBar;