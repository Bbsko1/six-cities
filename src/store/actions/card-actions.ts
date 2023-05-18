import { AuthData, CardProps, CommentFormData, CommentsGet, UserData } from '../../types/types';
import { getCities } from '../../utils/get-cities';
import { APIRoute } from '../../const';
import { removeToken, saveToken } from '../../services/token';
import { toast } from 'react-toastify';
import axios, { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../reudcers/root-reducer';
import { AppDispatch } from '..';
import { cityReducer } from '../reudcers/city-reducer';

export const fetchCards = createAsyncThunk<CardProps[], undefined, { extra: AxiosInstance; state: RootState; dispatch: AppDispatch }>(
    'cards/fetchCards',
    async (_args, { dispatch, extra: api }) => {
        const { data } = await api.get<CardProps[]>(APIRoute.Hotels);
        const { addCities, changeActiveCity } = cityReducer.actions;
        const cities = getCities(data);

        if (cities) {
            dispatch(addCities(cities));
            dispatch(changeActiveCity(cities[0].name));
        }

        return data;
    },
);

export const fetchCheckAuth = createAsyncThunk<UserData, undefined, { extra: AxiosInstance }>(
    'user/checkAuth',
    async (_args, { extra: api }) => {
        const { data } = await api.get<UserData>(APIRoute.Login);

        return data;
    }
);

export const loginAction = createAsyncThunk<UserData, AuthData, { extra: AxiosInstance }>(
    'user/changeUserData',
    async ({ email, password }, { extra: api }) => {
        const { data } = await api.post<UserData>(APIRoute.Login, { email, password });

        if (data.token) {
            saveToken(data.token);
        }

        return data;
    }
);

export const logoutAction = createAsyncThunk<
    void,
    undefined,
    { extra: AxiosInstance; dispatch: AppDispatch }
>(
    'user/logout',
    async (_args, { getState, dispatch, extra: api }) => {
        await api.delete(APIRoute.Logout);
        removeToken();

        dispatch(fetchCards());
    }
);

export const getNearbyAction = createAsyncThunk<CardProps[], string, { extra: AxiosInstance }>(
    'cards/nearby',
    async (link, { extra: api }) => {
        const nearbyData = (await api.get<CardProps[]>(link)).data;

        return nearbyData;
    }
);

export const getCommentsAction = createAsyncThunk<CommentsGet[] | [], string, { extra: AxiosInstance }>(
    'cards/getComments',
    async (link, { extra: api }) => {
        const commentsData = (await api.get<CommentsGet[]>(link)).data;

        return commentsData;
    }
);

export const postCommentsAction = createAsyncThunk<CommentsGet[], [string, CommentFormData], { dispatch: AppDispatch; extra: AxiosInstance }>(
    'cards/postComments',
    async ([link, formData], {extra: api}) => {
        const {data} = await api.post<CommentsGet[]>(link, formData);

        return data;
    }
);

export const fetchFavorites = createAsyncThunk<CardProps[] | [], undefined, { extra: AxiosInstance }>(
    'cards/favorites',
    async (_args, { extra: api }) => {
        const favoriteItems = (await api.get<CardProps[]>(APIRoute.Favorite)).data;

        return favoriteItems;
    }
);

export const fetchToggleFavorite = createAsyncThunk<CardProps | void, string, { extra: AxiosInstance }>(
    'cards/toggleFavorite',
    async (link, { extra: api }) => {
        try {
            const { data } = await api.post<CardProps>(link);

            return data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response?.status === 401) {
                toast.info('You need to log in to use bookmarks');
            } else {
                toast.info('Something went wrong fetchToggleFavorite');
            }
        }
    }
);
