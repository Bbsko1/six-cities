import { AuthorizationStatus } from "../../const";
import { ActionType, LocationActions } from "../../types/card-actions";
import { UserState } from "../../types/types";

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