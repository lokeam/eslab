import { useTypedSelector } from "../hooks/use-typed-selector";
import BoxListItem from "./box-list-item";

const BoxList: React.FC = () => {
  const { data, order } = useTypedSelector((state) => state.boxes);
  const boxes = order.map((id) => data[id]);

  const renderedBoxes = boxes.map((box) => (
    <BoxListItem box={box} key={box.id} />
  ));

  return (
    <div>{renderedBoxes}</div>
  )
};

export default BoxList;
