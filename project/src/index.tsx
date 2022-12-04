import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { MockFavouriteFilms } from './mocks/favourites';
import { Provider } from 'react-redux';
import { store } from './store';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction, fetchFilmsAction } from './store/api-action';

const movie = {
  title: 'Grand Budapest',
  genre: 'Drama',
  releaseDate: 2014
};

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        MainMovie={movie}
        FavoriteFilms={MockFavouriteFilms}
      />
    </Provider>
  </React.StrictMode>,
);
