import { ActionType } from "../action-types";

interface MoveBoxAction {
  type: ActionType.MOVE_BOX;
  payload: {
    id: string;
    direction: 'up' | 'down'
  }
}

interface DeleteBoxAction {
  type: ActionType.DELETE_BOX;
  payload: string;
}

interface InsertBoxBeforeAction {
  type: ActionType.INSERT_BOX_BEFORE;
  payload: {
    id: string;
    type: 'code' | 'text';
  }
}

interface UpdateBoxAction {
  type: ActionType.UPDATE_BOX;
  payload: {
    id: string;
    content: string;
  }
}

export type Action = MoveBoxAction | DeleteBoxAction | InsertBoxBeforeAction | UpdateBoxAction;
