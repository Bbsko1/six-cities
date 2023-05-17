import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AuthorizationStatus, SortNames } from "../const";
import { CardProps, CityProps, CommentsGet, UserData } from "./types";
import { AxiosInstance } from "axios";
import { RootState } from "../store/reudcers/root-reducer";

export enum ActionType {
    AddCities = 'cities/AddCities',
    ChangeCity = 'cities/ChangeCity',
    ChangeCardList = 'main/changeCardList',
    FetchCards = 'main/fetchCards',
    FetchCardsSuccess = 'main/fetchCardsSuccess',
    FetchCardsError = 'main/fetchCardsError',
    ChangeSorting = 'main/changeSorting',
    RequireAuth = 'user/requireAuth',
    ChangeUserData = 'user/changeUserData',
    ChangeNearbyCards = 'detail/nearbyCards',
    GetHotelComments = 'detail/comments',
    GetFavorites = 'favorites/getFavorites',
}

export type AddCitiesAction = {
    type: ActionType.AddCities;
    payload: CityProps[];
}

export type ChangeCityAction = {
    type: ActionType.ChangeCity;
    payload: string;
}

export type ChangeCardListAction = {
    type: ActionType.ChangeCardList;
    payload: CardProps[];
}

export type FetchCardsAction =  {
    type: ActionType.FetchCards;
}

export type FetchCardsSuccessAction =  {
    type: ActionType.FetchCardsSuccess;
    payload: CardProps[];
}

export type FetchCardsErrorAction =  {
    type: ActionType.FetchCardsError;
    payload: string;
}

export type ChangeSortingAction = {
    type: ActionType.ChangeSorting,
    payload: SortNames,
}

export type UserAuthAction = {
    type: ActionType.RequireAuth,
    payload: AuthorizationStatus,
}

export type ChangeUserDataAction = {
    type: ActionType.ChangeUserData,
    payload: UserData | null,
}

export type ChangeNearbyCardsAction = {
    type: ActionType.ChangeNearbyCards,
    payload: CardProps[] | [],
}

export type GetHotelCommentsAction = {
    type: ActionType.GetHotelComments,
    payload: CommentsGet[] | [],
}

export type GetFavoritesAction = {
    type: ActionType.GetFavorites,
    payload: CardProps[] | [],
}

/* export type LocationActions = AddCitiesAction | ChangeCityAction | ChangeCardListAction | FetchCardsAction | FetchCardsSuccessAction | FetchCardsErrorAction | ChangeSortingAction | UserAuthAction | ChangeUserDataAction | ChangeNearbyCardsAction | GetHotelCommentsAction | GetFavoritesAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, RootState, AxiosInstance, LocationActions>;
export type ThunkAppDispatch = ThunkDispatch<RootState, AxiosInstance, LocationActions>; */