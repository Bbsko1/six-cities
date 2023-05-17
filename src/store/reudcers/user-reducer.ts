import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserState } from '../../types/types';
import { fetchCheckAuth, loginAction, logoutAction } from '../actions/card-actions';

const initialState: UserState = {
    authStatus: AuthorizationStatus.Unknown,
    userData: null,
};

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCheckAuth.fulfilled, (state, action) => {
                state.authStatus = AuthorizationStatus.Auth;
                state.userData = action.payload;
            })
            .addCase(fetchCheckAuth.rejected, (state) => {
                state.authStatus = AuthorizationStatus.NoAuth;
                state.userData = null;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.authStatus = AuthorizationStatus.Auth;
                state.userData = action.payload;
            })
            .addCase(loginAction.rejected, (state) => {
                state.authStatus = AuthorizationStatus.NoAuth;
                state.userData = null;
            })
            .addCase(logoutAction.fulfilled, (state) => {
                state.authStatus = AuthorizationStatus.NoAuth;
                state.userData = null;
            });
    },
});
