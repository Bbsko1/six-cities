import { Dispatch } from "redux";
import { ActionType, ChangeCardListAction, AddCitiesAction, LocationActions, FetchCardsAction, FetchCardsErrorAction, FetchCardsSuccessAction, ChangeCityAction, ChangeSortingAction } from "../../types/actions";
import { CardProps, CityProps } from "../../types/types";
import axios from "axios";
import { getCities } from "../../utils/get-cities";
import { SortNames } from "../../const";

export const addCities = (cities: CityProps[]): AddCitiesAction => ({
    type: ActionType.AddCities,
    payload: cities,
});

export const changeActiveCity = (city: string): ChangeCityAction => ({
    type: ActionType.ChangeCity,
    payload: city,
});

export const changeCardList = (cards: CardProps[]): ChangeCardListAction => ({
    type: ActionType.ChangeCardList,
    payload: cards,
});

export const fetchCardList = (): FetchCardsAction => ({
    type: ActionType.FetchCards,
});

export const fetchCardListSuccess = (cards: CardProps[]): FetchCardsSuccessAction => ({
    type: ActionType.FetchCardsSuccess,
    payload: cards,
});

export const fetchCardListError = (): FetchCardsErrorAction => ({
    type: ActionType.FetchCardsError,
    payload: 'Произошла ошибка при загрузке, попробуйте позже'
});

export const changeSorting = (sortName: SortNames): ChangeSortingAction  => ({
    type: ActionType.ChangeSorting,
    payload: sortName,
});

export const fetchCards = () => {
    return async (dispatch: Dispatch<LocationActions>) => {
        try {
            dispatch(fetchCardList());
            const response = await axios.get('https://12.react.pages.academy/six-cities/hotels');

            const cities = getCities(response.data);

            if (cities) {
                dispatch(addCities(cities));
                dispatch(changeActiveCity(cities[0].name));
            }
            
            dispatch(fetchCardListSuccess(response.data));
        } catch (e) {
            dispatch(fetchCardListError());
        }
    }
}