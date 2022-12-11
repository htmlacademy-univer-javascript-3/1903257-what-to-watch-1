import FilmCard from '../film-card/film-card';
import GenresList from '../genres-list/genres-list';
import { useAppSelector } from '../../hooks/state';
import ShowMoreButton from '../show-more-button/show-more-button';
import { getFilteredFilms, getCardCount } from '../../store/main-data/selectors';

export default function FilmsList() {
  const films = useAppSelector(getFilteredFilms);
  const filmsCount = useAppSelector(getCardCount);
  return (
    <div className="container">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenresList />

        <div className="catalog__films-list">
          {films.slice(0, filmsCount).map((film) => (
            <FilmCard
              previewVideo={film.previewVideoLink}
              title={film.name}
              src={film.previewImage}
              id={film.id}
              key={film.id}
            />
          ))}
        </div>

        <ShowMoreButton isAllFilmsLoaded={ filmsCount !== films.length} />
      </section>
    </div>
  );
}
