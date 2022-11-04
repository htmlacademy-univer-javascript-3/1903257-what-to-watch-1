import { DEFAULT_GENRE } from '../const';
import { Films } from '../types/films';
export const getAllGenres = (films: Films) => [...new Set([DEFAULT_GENRE, ...films.map((film) => film.genre)])];
