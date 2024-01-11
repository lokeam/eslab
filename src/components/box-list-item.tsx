import { Box } from '../state';

interface BoxListItemProps {
  box: Box
}

const BoxListItem: React.FC<BoxListItemProps> = ({ box }) => {
  return (
    <div>Code Box List Item - Box ID: {box.id}</div>
  )
};

export default BoxListItem;
