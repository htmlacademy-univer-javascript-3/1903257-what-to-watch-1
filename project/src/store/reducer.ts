import { MockFilms } from '../mocks/films';
import { AuthorizationStatus, DEFAULT_GENRE } from '../const';
import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, increaseFilmsCount, loadFilms, requireAuthorization, setDataLoadedStatus, setError, setAvatar, resetMainScreen, loadFilm, loadComments, loadRecommended } from './action';
import { sortFilmsByGenre } from '../utils/sort-films';
import { Films } from '../types/films';
import { Comments } from '../types/comments';
import { Recommended } from '../types/recomended';
import { Film } from '../types/film';

type InitialState = {
  genre: string,
  filmsList: Films,
  filteredFilmsList: Films,
  filmsCount: number,
  authorizationStatus: string,
  error: string | null,
  isDataLoaded: boolean,
  avatar: string | null,
  comments: Comments,
  recommended: Recommended,
  film: Film | null
}


const initialState: InitialState = {
  genre: DEFAULT_GENRE,
  filmsList: [],
  filteredFilmsList: [],
  filmsCount: MockFilms.length < 8 ? MockFilms.length : 8,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isDataLoaded: false,
  avatar: null,
  comments: [],
  recommended: [],
  film: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const filteredFilms = sortFilmsByGenre(state.filmsList, action.payload.currentGenre);

      state.genre = action.payload.currentGenre;
      state.filteredFilmsList = filteredFilms;
      state.filmsCount = filteredFilms.length < 8 ?
        filteredFilms.length :
        8;
    })
    .addCase(increaseFilmsCount, (state, action) => {
      state.filmsCount = (state.filmsCount + 8) < state.filteredFilmsList.length ?
        state.filmsCount + 8 :
        state.filteredFilmsList.length;
    })
    .addCase(loadFilms, (state, action) => {
      state.filmsList = action.payload;
      state.filteredFilmsList = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setAvatar, (state, action) => {
      state.avatar = action.payload;
    })
    .addCase(resetMainScreen, (state) => {
      state.genre = DEFAULT_GENRE;
      state.filteredFilmsList = state.filmsList;
      state.filmsCount = state.filmsList.length < 8 ? state.filmsList.length : 8;
    })
    .addCase(loadFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadRecommended, (state, action) => {
      state.recommended = action.payload;
    });
});
