import { ActionType, LocationActions } from "../../types/card-actions";
import { CardsState } from "../../types/types";
import { AuthorizationStatus, SortNames } from "../../const";

const initialState: CardsState = {
    cities: [],
    activeCity: null,
    cards: [],
    loading: true,
    error: null,
    sortType: SortNames.Popular,
    authStatus: AuthorizationStatus.Unknown,
    userData: null,
}

export const cardReducer = (state: CardsState = initialState, action: LocationActions): CardsState => {
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
        case ActionType.RequireAuth:
            return {...state, authStatus: action.payload};
        case ActionType.ChangeUserData:
            return {...state, userData: action.payload}
        default:
            return state;
    }
}