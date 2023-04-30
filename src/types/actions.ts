import { SortNames } from "../const";
import { CardProps, CityProps } from "./types";

export enum ActionType {
    AddCities = 'cities/AddCities',
    ChangeCity = 'cities/ChangeCity',
    ChangeCardList = 'main/changeCardList',
    FetchCards = 'main/fetchCards',
    FetchCardsSuccess = 'main/fetchCardsSuccess',
    FetchCardsError = 'main/fetchCardsError',
    ChangeSorting = 'main/changeSorting',
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

export type LocationActions = AddCitiesAction | ChangeCityAction | ChangeCardListAction | FetchCardsAction | FetchCardsSuccessAction | FetchCardsErrorAction | ChangeSortingAction;