import { rootReducer } from './reudcers/root-reducer';
import { createAPI } from '../services/api';
import { userAuth } from './actions/card-actions';
import { AuthorizationStatus } from '../const';
import { configureStore } from '@reduxjs/toolkit';

const api = createAPI(() => store.dispatch(userAuth(AuthorizationStatus.NoAuth)));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: api,
            }
        }),
});