import {createSlice} from '@reduxjs/toolkit';
import { NameSpace} from '../../const';
import { FilmData } from '../../types/film-data';
import { fetchCommentsByID, fetchFilmByID, fetchRecommendedByID } from '../api-action';

const initialState: FilmData = {
  film: null,
  similar: [],
  comments: [],
  isFilmLoadingStatus: null,
  isFilmFoundStatus: null
};

export const filmData = createSlice({
  name: NameSpace.FilmPage,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmByID.pending, (state) => {
        state.isFilmLoadingStatus = true;
      })
      .addCase(fetchFilmByID.fulfilled, (state, action) => {
        state.film = action.payload;

        state.isFilmFoundStatus = true;
        state.isFilmLoadingStatus = false;
      })
      .addCase(fetchFilmByID.rejected, (state, action) => {
        state.isFilmFoundStatus = false;
        state.isFilmLoadingStatus = false;
      })
      .addCase(fetchRecommendedByID.fulfilled, (state, action) => {
        state.similar = action.payload;
      })
      .addCase(fetchCommentsByID.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});

export default filmData.reducer;
