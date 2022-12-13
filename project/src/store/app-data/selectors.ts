import { NameSpace } from '../../const';
import { State } from '../../types/store';
export const getError = (state: State): string | null => state[NameSpace.App].error;
