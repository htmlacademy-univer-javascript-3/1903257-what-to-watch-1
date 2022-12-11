import {createSlice} from '@reduxjs/toolkit';
import { DEFAULT_GENRE, NameSpace} from '../../const';
import { MainData } from '../../types/main-data';
import { sortFilmsByGenre } from '../../utils/sort-films';
import { fetchFavoriteFilmsAction, fetchFilmsAction, fetchPromoAction } from '../api-action';


const initialState: MainData = {
  films: [],
  promo: null,
  isDataLoaded: false,
  currentGenre: DEFAULT_GENRE,
  filteredFilms: [],
  cardCount: 0,
  favoriteFilms: []
};

export const mainData = createSlice({
  name: NameSpace.MainPage,
  initialState,
  reducers: {
    resetMainScreen: (state) => {
      state.currentGenre = DEFAULT_GENRE;
      state.filteredFilms = state.films;
      state.cardCount = state.films.length < 8 ? state.films.length : 8;
    },
    changeGenre: (state, action) => {
      const filteredFilms = sortFilmsByGenre(state.films, action.payload.currentGenre);

      state.currentGenre = action.payload.currentGenre;
      state.filteredFilms = filteredFilms;
      state.cardCount = filteredFilms.length < 8 ?
        filteredFilms.length :
        8;
    },

    increaseCardCount: (state) => {
      state.cardCount = (state.cardCount + 8) < state.filteredFilms.length ?
        state.cardCount + 8 :
        state.filteredFilms.length;
    },

    resetCardCount: (state) => {
      state.cardCount = state.filteredFilms.length < 8 ?
        state.filteredFilms.length :
        8;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        const films = action.payload;

        state.films = films;
        state.filteredFilms = films;
        state.cardCount = films.length < 8 ? films.length : 8;
        state.isDataLoaded = false;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.isDataLoaded = false;
      });
  }
});

export const {
  resetMainScreen,
  changeGenre,
  increaseCardCount,
  resetCardCount
} = mainData.actions;

export default mainData.reducer;
