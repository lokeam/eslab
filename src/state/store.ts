import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import reducers from './reducers';
import { ActionType } from './action-types';

export const store = createStore(reducers, {}, applyMiddleware(thunk));


// manual testing of store
store.dispatch({
  type: ActionType.INSERT_BOX_AFTER,
  payload: {
    id: null,
    type: 'code'
  }
});

store.dispatch({
  type: ActionType.INSERT_BOX_AFTER,
  payload: {
    id: null,
    type: 'text'
  }
});


console.log(store.getState());