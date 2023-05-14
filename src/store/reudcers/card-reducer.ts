import { ActionType, LocationActions } from "../../types/card-actions";
import { CardsState } from "../../types/types";
import { SortNames } from "../../const";

const initialState: CardsState = {
    cards: [],
    loading: true,
    error: null,
    sortType: SortNames.Popular,
    nearby: [],
    hotelComments: [],
    favorites: [],
}

export const cardReducer = (state: CardsState = initialState, action: LocationActions): CardsState => {
    switch (action.type) {
        case ActionType.FetchCards:
            return {...state, loading: true};
        case ActionType.FetchCardsSuccess:
            return {...state, cards: action.payload, loading: false};
        case ActionType.FetchCardsError:
            return {...state, error: action.payload, loading: false};
        case ActionType.ChangeCardList:
            return {...state, cards: action.payload};
        case ActionType.ChangeSorting:
            return {...state, sortType: action.payload};
        case ActionType.ChangeNearbyCards:
            return {...state, nearby: action.payload};
        case ActionType.GetHotelComments:
            return {...state, hotelComments: action.payload};
        case ActionType.GetFavorites:
            return {...state, favorites: action.payload, loading: false};
        default:
            return state;
    }
}