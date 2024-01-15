import { ActionType } from '../action-types';
import {
  Action,
  UpdateBoxAction,
  DeleteBoxAction,
  MoveBoxAction,
  InsertBoxBeforeAction,
  Direction
} from '../actions';
import { BoxTypes } from '../box';

export const updateBox = (id: string, content: string): UpdateBoxAction => {
  return {
    type: ActionType.UPDATE_BOX,
    payload: {
      id,
      content
    },
  };
};

export const deleteBox = (id: string): DeleteBoxAction => {
  return {
    type: ActionType.DELETE_BOX,
    payload: id
  };
};

export const moveBox = (id: string, direction: Direction): MoveBoxAction => {
  return {
    type: ActionType.MOVE_BOX,
    payload: {
      id,
      direction
    },
  };
};

export const insertBoxBefore = (
    id: string | null,
    boxType: BoxTypes
  ): InsertBoxBeforeAction => {
  return {
    type: ActionType.INSERT_BOX_BEFORE,
    payload: {
      id,
      type: boxType
    },
  };
};