import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthorizationStatus } from "../../const";
import { UserData, UserState } from "../../types/types";
import { fetchCheckAuth, loginAction, logoutAction } from "../actions/card-actions";

const initialState: UserState = {
    authStatus: AuthorizationStatus.Unknown,
    userData: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCheckAuth.fulfilled.type]: (state, action: PayloadAction<UserData>) => {
            state.authStatus = AuthorizationStatus.Auth;
            state.userData = action.payload;
        },
        [fetchCheckAuth.rejected.type]: (state) => {
            state.authStatus = AuthorizationStatus.NoAuth;
            state.userData = null;
        },
        [loginAction.fulfilled.type]: (state, action) => {
            state.authStatus = AuthorizationStatus.Auth;
            state.userData = action.payload;
        },
        [loginAction.rejected.type]: (state) => {
            state.authStatus = AuthorizationStatus.NoAuth;
            state.userData = null;
        },
        [logoutAction.fulfilled.type]: (state) => {
            state.authStatus = AuthorizationStatus.NoAuth;
            state.userData = null;
        }
    }
});

export default userSlice.reducer;