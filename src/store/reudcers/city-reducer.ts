import { createReducer } from "@reduxjs/toolkit";
import { ActionType, LocationActions } from "../../types/card-actions";
import { CityState } from "../../types/types";
import { addCities, changeActiveCity } from "../actions/card-actions";

const initialState: CityState = {
    cities: [],
    activeCity: null,
}

export const cityReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addCities, (state, action) => {
            state.cities = action.payload;
        })
        .addCase(changeActiveCity, (state, action) => {
            state.activeCity = action.payload;
        })
});