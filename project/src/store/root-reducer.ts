import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import mainDataReducer from './main-data/main-data';
import filmDataReducer from './film-data/film-data';
import userProcessReducer from './user-process/user-process';

const rootReducer = combineReducers({
  [NameSpace.MainPage]: mainDataReducer,
  [NameSpace.FilmPage]: filmDataReducer,
  [NameSpace.User]: userProcessReducer,
});

export default rootReducer;
