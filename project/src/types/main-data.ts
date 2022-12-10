import { Films } from './films';
import Promo from './promo';

export type MainData = {
    films: Films,
    promo: Promo | null,
    isDataLoaded: boolean,
    currentGenre: string,
    filteredFilms: Films,
    cardCount: number,
  }
