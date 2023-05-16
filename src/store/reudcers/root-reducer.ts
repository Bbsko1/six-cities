import { combineReducers } from "redux";
import { cardReducer } from "./card-reducer";
import userReducer from "./user-reducer";
import { cityReducer } from "./city-reducer";

export const rootReducer = combineReducers({
    CARDS: cardReducer,
    USER: userReducer,
    CITIES: cityReducer,
});

export type RootState = ReturnType<typeof rootReducer>;