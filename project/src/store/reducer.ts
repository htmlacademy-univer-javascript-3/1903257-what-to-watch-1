import { MockFilms } from '../mocks/films';
import { AuthorizationStatus, DEFAULT_GENRE } from '../const';
import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, increaseFilmsCount, loadFilms, requireAuthorization, setDataLoadedStatus, setError, setAvatar } from './action';
import { sortFilmsByGenre } from '../utils/sort-films';
import { Films } from '../types/films';

type InitialState = {
  genre: string,
  filmsList: Films,
  filteredFilmsList: Films,
  filmsCount: number,
  authorizationStatus: string,
  error: string | null,
  isDataLoaded: boolean,
  avatar: string | null
}


const initialState: InitialState = {
  genre: DEFAULT_GENRE,
  filmsList: [],
  filteredFilmsList: [],
  filmsCount: MockFilms.length < 8 ? MockFilms.length : 8,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isDataLoaded: false,
  avatar: null
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
    });

});
