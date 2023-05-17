export enum AppRoutes {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '*'
}

export enum APIRoute {
  Hotels = '/hotels',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export enum SortNames {
  Popular = 'POPULAR',
  PriceAsc = 'PRICE_ASC',
  PriceDesc = 'PRICE_DESC',
  Rating = 'RATING',
}

export const sortingList = [
    {
        name: 'popular',
        value: SortNames.Popular,
    },
    {
        name: 'Price: low to high',
        value: SortNames.PriceAsc,
    },
    {
        name: 'Price: high to low',
        value: SortNames.PriceDesc
    },
    {
        name: 'Top rated first',
        value: SortNames.Rating,
    }
];
