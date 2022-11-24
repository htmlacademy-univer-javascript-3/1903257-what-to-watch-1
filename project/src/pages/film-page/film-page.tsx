import { useParams } from 'react-router-dom';
import { Films } from '../../types/films';
import { Recommended } from '../../types/recomended';
import FilmCard from '../../components/film-card/film-card';
import { useState } from 'react';
import FilmDescription from '../../components/film-description/film-description';
import { Film } from '../../types/film';
import { Comments } from '../../types/comments';
import UserBlock from '../../components/user-block/user-block';

type FilmPageProps = {
  films: Films,
  recommended: Recommended,
  reviews: Comments
}

export default function FilmPage({ films, recommended, reviews } : FilmPageProps) {
  const { id } = useParams();
  const currentFilm = films.find((film : Film) => film.id === Number(id));
  const [activeCard, setActiveCard] = useState(NaN);

  if (!currentFilm) {
    return (
      <div>Фильм не найден</div>
    );
  }
  return (
    <div className="container">
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilm?.backgroundImage} alt={currentFilm?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{ currentFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm?.genre}</span>
                <span className="film-card__year">{ currentFilm?.released }</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <a href="add-review.html" className="btn film-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={currentFilm?.posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <FilmDescription
                currentFilm={currentFilm}
                reviews={reviews}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">

        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {recommended.map((film) => (
              <FilmCard
                title={film.name}
                src={film.previewImage}
                id={film.id}
                key={film.id}
                isActive={activeCard === film.id}
                previewVideo={film.previewVideoLink}
                changeParentState={(activeCardId: number) => {
                  setActiveCard(activeCardId);
                }}
              />
            ))}
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
