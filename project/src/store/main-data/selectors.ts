import { NameSpace } from '../../const';
import { Films } from '../../types/films';
import Promo from '../../types/promo';
import { State } from '../../types/store';

export const getFilms = (state: State): Films => state[NameSpace.MainPage].films;
export const getPromo = (state: State): Promo | null => state[NameSpace.MainPage].promo;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.MainPage].isDataLoaded;
export const getCurrentGenre = (state: State): string => state[NameSpace.MainPage].currentGenre;
export const getFilteredFilms = (state: State): Films => state[NameSpace.MainPage].filteredFilms;
export const getCardCount = (state: State): number => state[NameSpace.MainPage].cardCount;
