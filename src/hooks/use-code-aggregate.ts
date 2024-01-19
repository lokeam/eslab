import { Box } from "../state";
import { useMemo } from "react";

export const useCodeAggregate = (
  boxId: string,
  order: string[],
  data: {
    [key: string]: Box
  },) => {
  return useMemo(() => {
    const orderedBoxes = order.map(id => data[id]);
    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';

      var show = (value) => {
        const rootElement = document.querySelector('#root');
        if (typeof value === 'object') {

          // Show JSX elements
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, rootElement);

            // Show content and complex values
          } else {
            rootElement.innerHTML = JSON.stringify(value);
          }
        } else {
          rootElement.innerHTML = value;
        }
      };
    `;
    const showFuncNoOp = `var show = () => {}`;
    const result = [];

    for (let index = 0; index < orderedBoxes.length; index++) {
      if (orderedBoxes[index].type === 'code') {

        if (orderedBoxes[index].id === boxId) {
          result.push(showFunc);
        } else {
          result.push(showFuncNoOp);
        }
        result.push(orderedBoxes[index].content);
      }
      if (orderedBoxes[index].id === boxId) break;
    }

    return result;
  }, [order, data, boxId]).join('\n');
};