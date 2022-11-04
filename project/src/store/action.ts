import { createAction } from '@reduxjs/toolkit';

const changeGenre = createAction<{ currentGenre: string }>('main/changeGenre');
const increaseFilmsCount = createAction('main/increaseFilmsCount');

export {
  changeGenre,
  increaseFilmsCount
};
