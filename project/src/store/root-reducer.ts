import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import mainDataReducer from './main-data/main-data';
import filmDataReducer from './film-data/film-data';
import userProcessReducer from './user-data/user-data';
import appDataSlice from './app-data/app-data';

const rootReducer = combineReducers({
  [NameSpace.MainPage]: mainDataReducer,
  [NameSpace.FilmPage]: filmDataReducer,
  [NameSpace.User]: userProcessReducer,
  [NameSpace.App]: appDataSlice
});

export default rootReducer;
