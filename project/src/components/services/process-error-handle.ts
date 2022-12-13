import { store } from '../../store';
import { clearErrorAction } from '../../store/api-action';
import { setError } from '../../store/app-data/app-data';
export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
