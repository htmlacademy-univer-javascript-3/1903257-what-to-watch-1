import { MockFilms } from '../mocks/films';
import { DEFAULT_GENRE } from '../const';
import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, increaseFilmsCount } from './action';
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
    });

});
