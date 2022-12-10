import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { MockFavouriteFilms } from './mocks/favourites';
import { Provider } from 'react-redux';
import { store } from './store';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction, fetchFilmsAction, fetchPromoAction } from './store/api-action';
import { setDataLoadedStatus } from './store/action';

store.dispatch(setDataLoadedStatus(true));
store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoAction());
store.dispatch(checkAuthAction());
store.dispatch(setDataLoadedStatus(false));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        FavoriteFilms={MockFavouriteFilms}
      />
    </Provider>
  </React.StrictMode>,
);
