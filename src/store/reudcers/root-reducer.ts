import { combineReducers } from '@reduxjs/toolkit';
import { cardReducer } from './card-reducer';
import { userReducer } from './user-reducer';
import { cityReducer } from './city-reducer';

export const rootReducer = combineReducers({
    CARDS: cardReducer.reducer,
    USER: userReducer.reducer,
    CITIES: cityReducer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
