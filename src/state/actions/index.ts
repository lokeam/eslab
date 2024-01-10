import { ActionType } from "../action-types";
import { BoxTypes } from "../box";

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
    type: BoxTypes;
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
