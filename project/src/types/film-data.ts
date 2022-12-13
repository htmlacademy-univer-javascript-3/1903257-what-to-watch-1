
import { Comments } from './comments';
import { Film } from './film';
import { Recommended } from './recomended';

export type FilmData = {
    film: Film | null,
    similar: Recommended,
    comments: Comments,
    isFilmFoundStatus: boolean | null,
    isFilmLoadingStatus: boolean | null
  }
