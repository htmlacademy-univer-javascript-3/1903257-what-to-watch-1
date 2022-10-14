import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import { MockFilms } from './mocks/films';
import { MockFavouriteFilms } from './mocks/favourites';
import { MockRecommended } from './mocks/recomended';
import { MockComments } from './mocks/comments';

const movie = {
  title: 'Grand Budapest',
  genre: 'Drama',
  releaseDate: 2014
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      MainMovie={movie}
      Films={MockFilms}
      FavoriteFilms={MockFavouriteFilms}
      RecommendedFilms={MockRecommended}
      Reviews={MockComments}
    />
  </React.StrictMode>,
);
