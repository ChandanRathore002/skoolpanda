import { createStore as _createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './index';

function createStore (history, data) {
  const middleware = [thunk];

  let finalCreateStore;

  finalCreateStore = applyMiddleware(...middleware)(_createStore);

  const store = finalCreateStore(reducer, data);

  return store;
}

export default createStore;
