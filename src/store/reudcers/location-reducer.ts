import { combineReducers } from "redux";
import { ActionType, LocationActions } from "../../types/actions";
import { CardsState } from "../../types/types";
import { SortNames } from "../../const";

const initialState: CardsState = {
    cities: [],
    activeCity: null,
    cards: [],
    loading: true,
    error: null,
    sortType: SortNames.Popular,
}

const locationReducer = (state: CardsState = initialState, action: LocationActions): CardsState => {
    switch (action.type) {
        case ActionType.FetchCards:
            return {...state, loading: true};
        case ActionType.FetchCardsSuccess:
            return {...state, cards: action.payload, loading: false};
        case ActionType.FetchCardsError:
            return {...state, error: action.payload, loading: false}
        case ActionType.AddCities:
            return {...state, cities: action.payload};
        case ActionType.ChangeCity:
            return {...state, activeCity: action.payload}
        case ActionType.ChangeCardList:
            return {...state, cards: action.payload};
        case ActionType.ChangeSorting:
            return {...state, sortType: action.payload};
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    CARDS: locationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;