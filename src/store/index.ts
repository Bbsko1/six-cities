import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reudcers/root-reducer';
import { createAPI } from '../services/api';
import { userAuth } from './actions/card-actions';
import { AuthorizationStatus } from '../const';

const api = createAPI(() => store.dispatch(userAuth(AuthorizationStatus.NoAuth)));

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));