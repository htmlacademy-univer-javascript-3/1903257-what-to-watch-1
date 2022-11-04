import { MockFilms } from '../mocks/films';
import { DEFAULT_GENRE } from '../const';
import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getFilms } from './action';
import { sortFilmsByGenre } from '../utils/sort-films';
const initialState = {
  genre: DEFAULT_GENRE,
  filmsList: MockFilms,
  filteredFilmsList: MockFilms,
  filmsCount: MockFilms.length < 8 ? MockFilms.length : 8,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload.currentGenre;
    })
    .addCase(getFilms, (state, action) => {
      state.filteredFilmsList = sortFilmsByGenre(state.filmsList, state.genre);
    });
});
