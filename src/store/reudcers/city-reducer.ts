import { ActionType, LocationActions } from "../../types/card-actions";
import { CityState } from "../../types/types";

const initialState: CityState = {
    cities: [],
    activeCity: null,
}

export const cityReducer = (state: CityState = initialState, action: LocationActions): CityState => {
    switch (action.type) {
        case ActionType.AddCities:
            return {...state, cities: action.payload};
        case ActionType.ChangeCity:
            return {...state, activeCity: action.payload};
        default:
            return state;
    }
}