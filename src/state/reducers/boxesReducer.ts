import { produce } from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Box } from '../box';

interface BoxesState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Box
  };
}

const initialState: BoxesState = {
  loading: false,
  error: null,
  order: [],
  data: {}
};

const reducer = produce((state: BoxesState = initialState, action) => {
    switch (action.type) {
      case ActionType.UPDATE_BOX:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return;

      case ActionType.DELETE_BOX:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return state;

      case ActionType.MOVE_BOX:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1: index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;

      case ActionType.INSERT_BOX_AFTER:
        const box: Box = {
          content: '',
          type: action.payload.type,
          id: generateRandomId()
        };

        state.data[box.id] = box;
        const foundIndex = state.order.findIndex(id => id === action.payload.id);

        if (foundIndex < 0) {
          state.order.unshift(box.id);
        } else {
          state.order.splice(foundIndex + 1, 0, box.id);
        }
        return state;

        default:
        return state;
    }
}, initialState);

const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default reducer;
