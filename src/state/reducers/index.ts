import { combineReducers } from 'redux';
import boxesReducer from './boxesReducer';

const reducers = combineReducers({
  boxes: boxesReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers> | null;
