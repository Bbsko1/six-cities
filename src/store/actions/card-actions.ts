import { Dispatch } from "redux";
import { ActionType, ChangeCardListAction, AddCitiesAction, FetchCardsAction, FetchCardsErrorAction, FetchCardsSuccessAction, ChangeCityAction, ChangeSortingAction, UserAuthAction, ThunkActionResult, ChangeUserDataAction, ChangeNearbyCardsAction, GetHotelCommentsAction } from "../../types/card-actions";
import { AuthData, CardProps, CityProps, CommentsGet, UserData } from "../../types/types";
import { getCities } from "../../utils/get-cities";
import { APIRoute, AuthorizationStatus, SortNames } from "../../const";
import { Token, removeToken, saveToken } from "../../services/token";

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

export const userAuth = (authType: AuthorizationStatus): UserAuthAction => ({
    type: ActionType.RequireAuth,
    payload: authType,
});

export const changeUser = (useObj: UserData | null): ChangeUserDataAction => ({
    type: ActionType.ChangeUserData,
    payload: useObj,
});

export const changeNearby = (nearbyData: CardProps[] | []): ChangeNearbyCardsAction => ({
    type: ActionType.ChangeNearbyCards,
    payload: nearbyData,
});

export const getHotelComments = (comments: CommentsGet[] | []): GetHotelCommentsAction => ({
    type: ActionType.GetHotelComments,
    payload: comments,
});

export const fetchCards = (): ThunkActionResult => {
    return async (dispatch, _getState, api) => {
        try {
            dispatch(fetchCardList());

            const {data} = await api.get<CardProps[]>(APIRoute.Hotels);
            
            const cities = getCities(data);

            if (cities) {
                dispatch(addCities(cities));
                dispatch(changeActiveCity(cities[0].name));
            }
            
            dispatch(fetchCardListSuccess(data));
        } catch (e) {
            dispatch(fetchCardListError());
        }
    }
}

export const checkAuth = (): ThunkActionResult => {
    return async (dispatch, _getState, api) => {
        try {
            await api.get(APIRoute.Login).then((resolve) => {                
                dispatch(userAuth(AuthorizationStatus.Auth));

                const userObj: UserData = resolve.data;
                
                dispatch(changeUser(userObj));
            });
        } catch (e) {
            
        }
    }
};

export const loginAction = ({email, password}: AuthData): ThunkActionResult => {
    return async (dispatch, _getState, api) => {
        const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
        
        if (data.token) {
            saveToken(data.token);
        }
        
        dispatch(userAuth(AuthorizationStatus.Auth));
        dispatch(changeUser(data));
    }
}

export const logoutAction = (): ThunkActionResult => {
    return async (dispatch, _getState, api) => {
        api.delete(APIRoute.Logout);
        removeToken();
        dispatch(userAuth(AuthorizationStatus.NoAuth));
        dispatch(changeUser(null));
    }
}

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