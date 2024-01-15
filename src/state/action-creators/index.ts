import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import {
  Action,
  UpdateBoxAction,
  DeleteBoxAction,
  MoveBoxAction,
  InsertBoxAfterAction,
  Direction,
  BundleStartAction,
  BundleCompleteAction,
} from '../actions';
import { BoxTypes } from '../box';
import bundle from '../../bundler';

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

export const insertBoxAfter = (
    id: string | null,
    boxType: BoxTypes
  ): InsertBoxAfterAction => {
  return {
    type: ActionType.INSERT_BOX_AFTER,
    payload: {
      id,
      type: boxType
    },
  };
};

export const createBundle = (boxId: string, input: string) => {
  return async (dispatch:Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        boxId,
      }
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        boxId,
        bundle: result,
      }
    })
  }
}
