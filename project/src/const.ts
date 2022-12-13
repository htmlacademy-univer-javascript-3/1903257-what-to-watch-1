export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN'
}

export const FILM_CARD_PREVIEW_DELAY = 1000;

export enum FilmTabsEnum {
    Overview = 'Overview',
    Details = 'Details',
    Reviews = 'Reviews'
}

export const DEFAULT_GENRE = 'All genres';

export enum APIRoute {
    Films = '/films',
    Login = '/login',
    Logout = '/logout',
    Similar = '/similar',
    Comments = '/comments',
    Promo = '/promo',
    Favorite = '/favorite'
}

export const TIMEOUT_SHOW_ERROR = 5000;

export enum NameSpace {
    User = 'user-data',
    MainPage = 'main-data',
    FilmPage = 'film-data',
    App = 'app-data'
}
