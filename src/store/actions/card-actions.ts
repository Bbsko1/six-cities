import { ActionType, ThunkActionResult } from "../../types/card-actions";
import { AuthData, CardProps, CityProps, CommentsGet, UserData } from "../../types/types";
import { getCities } from "../../utils/get-cities";
import { APIRoute, AuthorizationStatus, SortNames } from "../../const";
import { removeToken, saveToken } from "../../services/token";
import { toast } from "react-toastify";
import axios, { AxiosInstance } from "axios";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const addCities = createAction(
    ActionType.AddCities,
    (cities: CityProps[]) => ({
        payload: cities,
    }),
);

export const changeActiveCity = createAction(
    ActionType.ChangeCity,
    (city: string) => ({
        payload: city,
    }),
);

export const changeCardList = createAction(
    ActionType.ChangeCardList,
    (cards: CardProps[]) => ({
        payload: cards,
    }),
);

export const fetchCardList = createAction(
    ActionType.FetchCards,
);

export const fetchCardListSuccess = createAction(
    ActionType.FetchCardsSuccess,
    (cards: CardProps[]) => ({
        payload: cards,
    }),
);

export const fetchCardListError = createAction(
    ActionType.FetchCardsError,
    () => ({
        payload: 'Произошла ошибка при загрузке, попробуйте позже',
    }),
);

export const changeSorting = createAction(
    ActionType.ChangeSorting,
    (sortName: SortNames) => ({
        payload: sortName,
    }),
);

export const userAuth = createAction(
    ActionType.RequireAuth,
    (authType: AuthorizationStatus) => ({
        payload: authType,
    }),
);

export const changeUser = createAction(
    ActionType.ChangeUserData,
    (useObj: UserData | null) => ({
        payload: useObj,
    }),
);

export const changeNearby = createAction(
    ActionType.ChangeNearbyCards,
    (nearbyData: CardProps[] | []) => ({
        payload: nearbyData,
    }),
);

export const getHotelComments = createAction(
    ActionType.GetHotelComments,
    (comments: CommentsGet[] | []) => ({
        payload: comments,
    }),
);

export const getFavorites = createAction(
    ActionType.GetFavorites,
    (favorites: CardProps[] | []) => ({
        payload: favorites,
    }),
);

export const fetchCards = (): ThunkActionResult => {
    return async (dispatch, _getState, api) => {
        try {
            dispatch(fetchCardList());

            const { data } = await api.get<CardProps[]>(APIRoute.Hotels);

            const cities = getCities(data);

            if (cities) {
                dispatch(addCities(cities));
                dispatch(changeActiveCity(cities[0].name));
            }

            dispatch(fetchCardListSuccess(data));
        } catch (e) {
            dispatch(fetchCardListError());
            toast.info('Something went wrong fetchCards');
        }
    }
}

export const fetchCheckAuth = createAsyncThunk<UserData, undefined, {extra: AxiosInstance}>(
    'user/checkAuth',
    async (_args, {extra: api}) => {
        const {data} = await api.get<UserData>(APIRoute.Login);

        return data;
    }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {extra: AxiosInstance}>(
    'user/changeUserData',
    async ({email, password}, {extra: api}) => {
        const { data } = await api.post<UserData>(APIRoute.Login, { email, password });

        if (data.token) {
            saveToken(data.token);
        }

        return data;
    }
);

/* export const logoutAction = (): ThunkActionResult => {
    return async (dispatch, _getState, api) => {
        api.delete(APIRoute.Logout);
        removeToken();
        dispatch(userAuth(AuthorizationStatus.NoAuth));
        dispatch(changeUser(null));
        dispatch(fetchCards());
    }
} */

export const logoutAction = createAsyncThunk<void, undefined, {extra: AxiosInstance}>(
    'user/logout',
    async (_args, {extra: api}) => {
        api.delete(APIRoute.Logout);
        removeToken();
        /* TODO dispatch fetchCards */
    }
);

export const getNearbyAction = (link: string): ThunkActionResult => {
    return async (dispatch, _getState, api) => {
        try {
            const nearbyData = (await api.get<CardProps[]>(link)).data;

            if (nearbyData.length) {
                dispatch(changeNearby(nearbyData));
            } else {
                dispatch(changeNearby([]));
            }
        } catch (e) {
            dispatch(changeNearby([]));
        }
    }
}

export const getCommentsAction = (link: string): ThunkActionResult => {
    return async (dispatch, _getState, api) => {
        try {
            const commentsData = (await api.get<CommentsGet[]>(link)).data;

            if (commentsData.length) {
                dispatch(getHotelComments(commentsData));
            } else {
                dispatch(getHotelComments([]));
            }
        } catch (e) {
            dispatch(getHotelComments([]));
        }
    }
}

export const fetchFavorites = (): ThunkActionResult => {
    return async (dispatch, _getState, api) => {
        try {
            const favoriteItems = (await api.get<CardProps[]>(APIRoute.Favorite)).data;

            if (favoriteItems.length) {
                dispatch(getFavorites(favoriteItems));
            } else {
                dispatch(getFavorites([]));
            }
        } catch (e) {
            dispatch(getFavorites([]));
            toast.info('Something went wrong fetchFavorites');
        }
    }
}

export const fetchToggleFavorite = (link: string): ThunkActionResult => {
    return async (dispatch, getState, api) => {
        try {
            const { data } = await api.post<CardProps>(link);
            const { cards } = getState().CARDS

            const indexCard = cards.findIndex(card => card.id === data.id);

            if (indexCard !== -1) {
                cards.splice(indexCard, 1, data);
                dispatch(fetchCardListSuccess(cards));
            }
        } catch (e) {
            if (axios.isAxiosError(e) && e.response?.status === 401) {
                toast.info('You need to log in to use bookmarks');
            } else {
                toast.info('Something went wrong fetchToggleFavorite');
                console.log('e', e);

            }
        }
    }
}