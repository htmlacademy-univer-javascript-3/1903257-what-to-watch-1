import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

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
      title={movie.title}
      genre={movie.genre}
      releaseDate={movie.releaseDate}
    />
  </React.StrictMode>,
);
