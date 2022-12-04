import RecommendedFilmCard from '../recommended-film-card/recommended-film-card';
import { Recommended } from '../../types/recomended';

type RecommendedListProps = {
    recommended: Recommended
}

export default function RecommendedList({recommended} : RecommendedListProps) {
  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <div className="catalog__films-list">
        {recommended.map((film) => (
          <RecommendedFilmCard
            key={film.id} image={film.previewImage} title={film.name} id={film.id}
          />
        ))}
      </div>
    </section>
  );
}
