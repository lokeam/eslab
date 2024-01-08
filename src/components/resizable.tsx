import './resizable.css';
import { ResizableBox } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}
const Resizable:React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      height={300}
      minConstraints={[Infinity, 100]}
      maxConstraints={[Infinity, window.innerHeight * 0.8]}
      width={Infinity}
      resizeHandles={['s']}
    >{children}</ResizableBox>
  );
}

export default Resizable;
