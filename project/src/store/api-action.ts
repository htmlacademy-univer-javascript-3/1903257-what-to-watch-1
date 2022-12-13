import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { dropAvatarURL } from '../components/services/avatar';
import { dropToken } from '../components/services/token';
import { APIRoute} from '../const';
import { AuthData } from '../types/auth-data';
import { Comments } from '../types/comments';
import { FavoriteFilms } from '../types/favourite-film';
import { Film } from '../types/film';
import { Films } from '../types/films';
import Promo from '../types/promo';
import { Recommended } from '../types/recomended';
import { AppDispatch, State } from '../types/store';
import { UserComment } from '../types/user-comment';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './action';
import { FilmStatus } from '../types/film-status';


export const fetchFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);

    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Promo>(APIRoute.Promo);

    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<{token: string, avatarUrl: string, userId: number}, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token, avatarUrl, id}} = await api.post<UserData>(APIRoute.Login, {email, password});

    return {token: token, avatarUrl: avatarUrl, userId: id};
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dropAvatarURL();
    dispatch(redirectToRoute('/'));
  },
);

export const fetchFilmByID = createAsyncThunk<Film | null, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilmById',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${filmId}`);

    return data;
  },
);

export const fetchCommentsByID = createAsyncThunk<Comments, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCommentsById',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Comments>(`${APIRoute.Comments}/${filmId}`);

    return data;
  },
);

export const fetchRecommendedByID = createAsyncThunk<Recommended, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchRecommendedById',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Recommended>(`${APIRoute.Films}/${filmId}${APIRoute.Similar}`);

    return data;
  },
);

export const postComment = createAsyncThunk<void, UserComment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postCommentById',
  async ({comment, rating, filmId}, {dispatch, extra: api}) => {
    await api.post<UserComment>(`${APIRoute.Comments}/${filmId}`, {comment, rating});
    dispatch(redirectToRoute(`${APIRoute.Films}/${filmId}`));
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk<FavoriteFilms, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteFilmsAction',
  async (_arg, { dispatch, extra: api}) => {
    const {data} = await api.get<FavoriteFilms>(APIRoute.Favorite);

    return data;
  },
);
export const changeFilmStatus = createAsyncThunk<Film, FilmStatus, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/changeFilmStatus',
  async ({filmId: id, status: isFavorite}, { dispatch, extra: api}) => {
    const {data} = await api.post<Film>(`${APIRoute.Favorite}/${id}/${isFavorite}`);

    return data;
  },
);
export const changePromoStatus = createAsyncThunk<Film, FilmStatus, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/changePromoStatus',
  async ({filmId: id, status: isFavorite}, { dispatch, extra: api}) => {
    const {data} = await api.post<Film>(`${APIRoute.Favorite}/${id}/${isFavorite}`);

    return data;
  },
);
