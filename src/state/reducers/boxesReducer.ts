import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Box } from '../box';

interface BoxesState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Box
  }
}

const initialState: BoxesState = {
  loading: false,
  error: null,
  order: [],
  data: {}
};

const reducer = (
  state: BoxesState = initialState,
  action: Action
  ): BoxesState => {
    switch (action.type) {
      case ActionType.UPDATE_BOX:
        return state;
      case ActionType.DELETE_BOX:
        return state;
      case ActionType.MOVE_BOX:
        return state;
      case ActionType.INSERT_BOX_BEFORE:
        return state;
      default:
        return state;
    }
};

export default reducer;
