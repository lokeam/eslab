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

export interface InsertBoxAfterAction {
  type: ActionType.INSERT_BOX_AFTER;
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

export interface BundleStartAction {
  type: ActionType.BUNDLE_START,
  payload: {
    boxId: string;
  }
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE,
  payload: {
    boxId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export type Action =
  MoveBoxAction |
  DeleteBoxAction |
  InsertBoxAfterAction |
  UpdateBoxAction |
  BundleStartAction |
  BundleCompleteAction;
