import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AuthorizationStatus, SortNames } from "../const";
import { CardProps, CardsState, CityProps, UserData } from "./types";
import { AxiosInstance } from "axios";

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

export type LocationActions = AddCitiesAction | ChangeCityAction | ChangeCardListAction | FetchCardsAction | FetchCardsSuccessAction | FetchCardsErrorAction | ChangeSortingAction | UserAuthAction | ChangeUserDataAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, CardsState, AxiosInstance, LocationActions>;
export type ThunkAppDispatch = ThunkDispatch<CardsState, AxiosInstance, LocationActions>;