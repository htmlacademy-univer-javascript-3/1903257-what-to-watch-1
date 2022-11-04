import { createAction } from '@reduxjs/toolkit';

const changeGenre = createAction<{ currentGenre: string }>('main/changeGenre');
const getFilms = createAction('main/getFilms');

export {
  changeGenre,
  getFilms
};
