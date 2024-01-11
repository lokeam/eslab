import { ActionType } from "../action-types";
import { BoxTypes } from "../box";

export type Direction = 'up' | 'down';

export interface MoveBoxAction {
  type: ActionType.MOVE_BOX;
  payload: {
    id: string;
    direction: Direction
  }
}

export interface DeleteBoxAction {
  type: ActionType.DELETE_BOX;
  payload: string;
}

export interface InsertBoxBeforeAction {
  type: ActionType.INSERT_BOX_BEFORE;
  payload: {
    id: string | null;
    type: BoxTypes;
  }
}

export interface UpdateBoxAction {
  type: ActionType.UPDATE_BOX;
  payload: {
    id: string;
    content: string;
  }
}

export type Action = MoveBoxAction | DeleteBoxAction | InsertBoxBeforeAction | UpdateBoxAction;
