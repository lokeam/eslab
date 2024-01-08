import './resizable.css';
import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}
const Resizable:React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const listener = () => {
      // Todo: Resolve ResizeObserver loop completed with undelivered notifications issue.
      //       Pixels (int) being converted into floats
      // setInnerHeight(window.innerHeight);
      // setInnerWidth(window.innerWidth);
      console.log(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', listener);
    // clean up
    return () => {
      window.removeEventListener('resize', listener);
    }
  }, []);

  // horizontal
  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      resizeHandles: ['e'],
      width: window.innerWidth * 0.75,

    };
  // vertical
  } else {
    resizableProps = {
      height: 300,
      minConstraints: [Infinity, 100],
      maxConstraints: [Infinity, window.innerHeight * 0.8],
      resizeHandles: ['s'],
      width: Infinity,
    };
  }

  return (
    <ResizableBox {...resizableProps}>{children}</ResizableBox>
  );
}

export default Resizable;
