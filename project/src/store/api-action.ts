import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/store';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { Films } from '../types/films';
import { loadFilms, requireAuthorization, setError, setDataLoadedStatus, redirectToRoute, setAvatar, loadFilm, loadComments, loadRecommended } from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { saveToken, dropToken } from '../components/services/token';
import { store } from '.';
import { Recommended } from '../types/recomended';
import { Comments } from '../types/comments';
import { Film } from '../types/film';
import { Comment } from '../types/comment';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchFilms',
    async (_arg, {dispatch, extra: api}) => {
      const { data } = await api.get<Films>(APIRoute.Films);
      dispatch(setDataLoadedStatus(true));
      dispatch(loadFilms(data));
      dispatch(setDataLoadedStatus(false));
    },
  );

export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'user/checkAuth',
    async (_arg, {dispatch, extra: api}) => {
      try {
        await api.get(APIRoute.Login);
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      } catch {
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      }
    },
  );

export const loginAction = createAsyncThunk<void, AuthData, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'user/login',
    async ({email, password}, {dispatch, extra: api}) => {
      const {data: {token, avatarUrl}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(setAvatar(avatarUrl));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute('/'));
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
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setAvatar(null));
      dispatch(redirectToRoute('/'));
    },
  );

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchFilmByID = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilmById',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    dispatch(loadFilm(data));
  },
);

export const fetchCommentsByID = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCommentsById',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Comments>(`${APIRoute.Comments}/${filmId}`);
    dispatch(loadComments(data));
  },
);

export const fetchRecommendedByID = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarById',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Recommended>(`${APIRoute.Films}/${filmId}${APIRoute.Similar}`);
    dispatch(loadRecommended(data));
  },
);
export const postComment = createAsyncThunk<void, Comment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postCommentById',
  async ({filmId, rating, comment}, {dispatch, extra: api}) => {
    dispatch(setDataLoadedStatus(true));
    await api.post<Comment>(`${APIRoute.Comments}/${filmId}`, {comment, rating});
    dispatch(redirectToRoute(`${APIRoute.Films}/${filmId}`));
    dispatch(setDataLoadedStatus(false));
  },
);
