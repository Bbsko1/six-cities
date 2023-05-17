import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CityProps, CityState } from '../../types/types';

const initialState: CityState = {
    cities: [],
    activeCity: null,
};

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
});
