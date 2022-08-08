import {createStore, combineReducers} from 'redux';
import myFirstReducer from './reducers/myFirstReducer';
import {applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({myFirstReducer});
const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(mySaga);
  return store;
};
export default configureStore;
