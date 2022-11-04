import { useState } from 'react';
import FilmCard from '../film-card/film-card';
import GenresList from '../genres-list/genres-list';
import { useAppSelector } from '../../hooks/state';

export default function FilmsList() {
  const films = useAppSelector((state) => state.filteredFilmsList);
  const [activeCard, setActiveCard] = useState(NaN);
  return (
    <div className="container">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenresList />

        <div className="catalog__films-list">
          {films.map((film) => (
            <FilmCard
              previewVideo={film.previewVideoLink}
              title={film.name}
              src={film.previewImage}
              id={film.id}
              key={film.id}
              isActive={activeCard === film.id}
              changeParentState={(activeCardId: number) => {
                setActiveCard(activeCardId);
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
