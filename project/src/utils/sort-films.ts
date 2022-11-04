import { Films } from '../types/films';
import { DEFAULT_GENRE } from '../const';
export const sortFilmsByGenre = (films: Films, genre: string) => {
  if (genre === DEFAULT_GENRE) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};
