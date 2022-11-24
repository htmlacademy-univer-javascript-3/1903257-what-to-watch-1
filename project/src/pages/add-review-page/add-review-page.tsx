import { Films } from '../../types/films';
import { useParams } from 'react-router-dom';
import AddReview from '../../components/add-review/add-review';
import UserBlock from '../../components/user-block/user-block';
type AddReviewPageProps = {
  films : Films
}
export default function AddReviewPage({ films }: AddReviewPageProps) {
  const { id } = useParams();
  const currentFilm = films.find((film) => film.id === Number(id));
  return (
    <div className="container">

      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={currentFilm?.backgroundImage} alt={currentFilm?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="film-page.html" className="breadcrumbs__link">{ currentFilm?.name }</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="film-page.html">Add review</a>
                </li>
              </ul>
            </nav>

            <UserBlock />
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={currentFilm?.posterImage} alt={currentFilm?.name} width="218" height="327" />
          </div>
        </div>

        <AddReview></AddReview>

      </section>
    </div>
  );
}
