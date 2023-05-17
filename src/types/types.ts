import { AuthorizationStatus, SortNames } from '../const';

export type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
}

export type CardProps = {
    id: number;
    title: string;
    previewImage: string;
    type: string;
    price: number;
    rating: number;
    active?: boolean; /* Не приходит */
    isPremium: boolean;
    isFavorite: boolean;
    location: Location;
    city: CityProps;
    description: string;
    goods: string[];
    images: string[];
    maxAdults: number;
    bedrooms: number;
    host: {
        avatarUrl: string;
        id: number;
        isPro: boolean;
        name: string;
    };
}

export type FavoriteProps = {
    cityName: string;
    id: number;
    cards: CardProps[];
}

export type CityProps = {
    name: string;
    location: Location;
}

export type CardsState = {
    cards: CardProps[] | [];
    loading: boolean;
    error: null | string;
    sortType: SortNames;
    nearby: CardProps[] | [];
    hotelComments: CommentsGet[] | [];
    favorites: CardProps[] | [];
}

export type UserState = {
    userData: UserData | null;
    authStatus: AuthorizationStatus;
}

export type CityState = {
    cities: CityProps[] | [];
    activeCity: null | string;
}

export type AuthData = {
    email: string;
    password: string;
}

export type UserData = {
    id: number;
    email: string;
    name: string;
    avatarUrl: string;
    isPro: boolean;
    token?: string;
}

export type CommentsGet = {
    comment: string;
    date: string;
    id: number;
    rating: number;
    user: UserData;
}
