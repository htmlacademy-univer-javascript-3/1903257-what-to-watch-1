import {createSlice} from '@reduxjs/toolkit';
import { NameSpace} from '../../const';
import { FilmData } from '../../types/film-data';
import { fetchCommentsByID, fetchFilmByID, fetchRecommendedByID, changeFilmStatus } from '../api-action';

const initialState: FilmData = {
  film: null,
  similar: [],
  comments: [],
  isFilmLoading: null,
  isFilmFound: null
};

export const filmDataSlice = createSlice({
  name: NameSpace.FilmPage,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmByID.pending, (state) => {
        state.isFilmLoading = true;
      })
      .addCase(fetchFilmByID.fulfilled, (state, action) => {
        state.film = action.payload;

        state.isFilmFound = true;
        state.isFilmLoading = false;
      })
      .addCase(fetchFilmByID.rejected, (state, action) => {
        state.isFilmFound = false;
        state.isFilmLoading = false;
      })
      .addCase(fetchRecommendedByID.fulfilled, (state, action) => {
        state.similar = action.payload;
      })
      .addCase(fetchCommentsByID.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(changeFilmStatus.fulfilled, (state, action) => {
        state.film = action.payload;
      });
  }
});

export default filmDataSlice.reducer;
