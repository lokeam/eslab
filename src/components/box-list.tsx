import { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import BoxListItem from "./box-list-item";
import AddBox from "./add-box";

const BoxList: React.FC = () => {
  const { data, order } = useTypedSelector((state) => state.boxes);
  const boxes = order.map((id) => data[id]);

  const renderedBoxes = boxes.map((box) => (
    <Fragment key={box.id}>
      <BoxListItem box={box} />
      <AddBox prevBoxId={box.id} />
    </Fragment>
  ));

  return (
    <div>
      <AddBox forceVisible={boxes.length === 0} prevBoxId={null} />
      {renderedBoxes}
    </div>
  )
};

export default BoxList;
