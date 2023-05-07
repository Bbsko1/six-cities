import { AuthorizationStatus, SortNames } from "../const";

type Location = {
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
        avatarUrl: string,
        id: number,
        isPro: boolean,
        name: string,
    }
}

export type CityProps = {
    name: string;
    location: Location;
}

export type CardsState = {
    cities: CityProps[] | [];
    activeCity: null | string;
    cards: CardProps[] | [];
    loading: boolean,
    error: null | string,
    sortType: SortNames,
    authStatus: AuthorizationStatus,
    userData: UserData | null,
}

export type AuthData = {
    email: string,
    password: string,
}

export type UserData = {
    id: number,
    email: string,
    name: string,
    avatarUrl: string,
    isPro: boolean,
    token: string,
}