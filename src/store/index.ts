import { rootReducer } from './reudcers/root-reducer';
import { createAPI } from '../services/api';
import { configureStore } from '@reduxjs/toolkit';

const api = createAPI(() => store.dispatch(() => {}));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: api,
            }
        }),
});

export type AppDispatch = typeof store.dispatch;