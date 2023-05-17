import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CityProps, CityState } from "../../types/types";
import { stat } from "fs";

const initialState: CityState = {
    cities: [],
    activeCity: null,
}

/* export const cityReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addCities, (state, action) => {
            state.cities = action.payload;
        })
        .addCase(changeActiveCity, (state, action) => {
            state.activeCity = action.payload;
        })
});
 */
export const cityReducer = createSlice({
    name: 'city',
    initialState,
    reducers: {
        changeActiveCity(state, action: PayloadAction<string>) {
            state.activeCity = action.payload;
        },
        addCities(state, action: PayloadAction<CityProps[]>) {
            state.cities = action.payload;
        }
    },
    extraReducers: {

    }
});