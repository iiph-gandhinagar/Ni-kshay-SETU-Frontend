import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, legacy_createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducer';
import rootSaga from './saga';
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function initStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = legacy_createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware]), //routerMiddleware
  );

  console.log('CREATING STORE------------------');
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}

export default initStore();
