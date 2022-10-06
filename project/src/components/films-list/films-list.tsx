import { useState } from 'react';
import { Films } from '../../types/films';
import FilmCard from '../film-card/film-card';

type FilmsListProps = {
    films: Films;
}

export default function FilmsList({ films }: FilmsListProps) {

  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="container">
      {activeCard}
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <ul className="catalog__genres-list">
          <li className="catalog__genres-item catalog__genres-item--active">
            <a href="/" className="catalog__genres-link">All genres</a>
          </li>
          <li className="catalog__genres-item">
            <a href="/" className="catalog__genres-link">Comedies</a>
          </li>
          <li className="catalog__genres-item">
            <a href="/" className="catalog__genres-link">Crime</a>
          </li>
          <li className="catalog__genres-item">
            <a href="/" className="catalog__genres-link">Documentary</a>
          </li>
          <li className="catalog__genres-item">
            <a href="/" className="catalog__genres-link">Dramas</a>
          </li>
          <li className="catalog__genres-item">
            <a href="/" className="catalog__genres-link">Horror</a>
          </li>
          <li className="catalog__genres-item">
            <a href="/" className="catalog__genres-link">Kids & Family</a>
          </li>
          <li className="catalog__genres-item">
            <a href="/" className="catalog__genres-link">Romance</a>
          </li>
          <li className="catalog__genres-item">
            <a href="/" className="catalog__genres-link">Sci-Fi</a>
          </li>
          <li className="catalog__genres-item">
            <a href="/" className="catalog__genres-link">Thrillers</a>
          </li>
        </ul>

        <div className="catalog__films-list">
          {films.map((film) => (
            <FilmCard
              title={film.name}
              src={film.previewImage}
              id={film.id}
              key={film.id}
              mouseOverHandler={(evt: React.MouseEvent<HTMLDivElement>) => {
                evt.preventDefault();
                setActiveCard(film.id);
              }}
            />
          ))}
        </div>

        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
      </section>
    </div>
  );
}
