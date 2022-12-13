import { State } from '../../types/store';
import { Recommended } from '../../types/recomended';
import { Comments } from '../../types/comments';
import { Film } from '../../types/film';
import { NameSpace } from '../../const';

export const getFilm = (state: State): Film | null => state[NameSpace.FilmPage].film;
export const getSimilar = (state: State): Recommended => state[NameSpace.FilmPage].similar;
export const getComments = (state: State): Comments => state[NameSpace.FilmPage].comments;
export const getIsFilmLoading = (state: State): boolean | null => state[NameSpace.FilmPage].isFilmLoading;
export const getIsFilmFound = (state: State): boolean | null => state[NameSpace.FilmPage].isFilmFound;
