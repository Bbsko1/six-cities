import { combineReducers } from "redux";
import { cardReducer } from "./card-reducer";

export const rootReducer = combineReducers({
    CARDS: cardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;