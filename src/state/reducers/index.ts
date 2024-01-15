import { combineReducers } from 'redux';
import boxesReducer from './boxesReducer';
import bundlesReducer from './bundlesReducer';

const reducers = combineReducers({
  boxes: boxesReducer,
  bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
