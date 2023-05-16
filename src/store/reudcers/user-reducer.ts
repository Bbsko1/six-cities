import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthorizationStatus } from "../../const";
import { ActionType, LocationActions } from "../../types/card-actions";
import { UserData, UserState } from "../../types/types";
import { fetchCheckAuth, loginAction, logoutAction } from "../actions/card-actions";

const initialState: UserState = {
    authStatus: AuthorizationStatus.Unknown,
    userData: null,
}

export const userReducer = (state: UserState = initialState, action: LocationActions): UserState => {
    switch (action.type) {
        case ActionType.RequireAuth:
            return {...state, authStatus: action.payload};
        case ActionType.ChangeUserData:
            return {...state, userData: action.payload};
        default:
            return state;
    }
}

export const userSlice = createSlice({
    name: 'name',
    initialState,
    reducers: {
        requireAuth(state, action: PayloadAction<AuthorizationStatus>) {
            state.authStatus = action.payload;
        },
        changeUserData(state, action: PayloadAction<UserData | null>) {
            state.userData = action.payload;
        }
    },
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