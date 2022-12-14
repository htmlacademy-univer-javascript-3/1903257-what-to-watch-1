import { Link, useNavigate, useParams } from 'react-router-dom';

import FilmDescription from '../../components/film-description/film-description';
import UserBlock from '../../components/user-block/user-block';
import LogoButton from '../../components/logo-button/logo-button';
import RecommendedList from '../../components/recommended-list/recommended-list';
import { useAppSelector, useAppDispatch } from '../../hooks/state';
import { useEffect } from 'react';
import { fetchFilmByID, fetchCommentsByID, fetchRecommendedByID, changeFilmStatus, fetchFavoriteFilmsAction } from '../../store/api-action';
import { AuthorizationStatus } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import { getFilm, getSimilar, getIsFilmFound, getIsFilmLoading } from '../../store/film-data/selectors';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import { FilmStatus } from '../../types/film-status';
import { getFavoriteFilmsCount } from '../../store/main-data/selectors';

export default function FilmPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = Number(useParams().id);
  const currentFilm = useAppSelector(getFilm);
  const recommended = useAppSelector(getSimilar);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isFilmFoundStatus = useAppSelector(getIsFilmFound);
  const isFilmLoadedStatus = useAppSelector(getIsFilmLoading);
  const favoriteFilmsCount = useAppSelector(getFavoriteFilmsCount);

  const onAddFavoriteFilmClick = () => {
    const status: FilmStatus = {
      filmId: currentFilm?.id || NaN,
      status: currentFilm?.isFavorite ? 0 : 1
    };
    dispatch(changeFilmStatus(status));

  };

  useEffect(() => {
    dispatch(fetchFilmByID(id.toString()));
    dispatch(fetchCommentsByID(id.toString()));
    dispatch(fetchRecommendedByID(id.toString()));

    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [id, dispatch, authStatus]);

  const onPlayClick = () => {
    navigate(`/player/${id}`);
  };

  if (isFilmLoadedStatus) {
    return(<LoadingScreen />);
  }

  if (!isFilmFoundStatus) {
    return (
      <div>?????????? ???? ????????????</div>
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
            <LogoButton isLightVersion={false} />

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
                <button className="btn btn--play film-card__button" type="button" onClick={onPlayClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {
                  authStatus === AuthorizationStatus.Auth &&
                  <button
                    className="btn btn--list film-card__button"
                    type="button"
                    onClick={onAddFavoriteFilmClick}
                  >
                    {
                      currentFilm?.isFavorite ? <span>???</span> :
                        <svg viewBox="0 0 19 20" width="19" height="20">
                          <use xlinkHref="#add"></use>
                        </svg>
                    }
                    <span>My list</span>
                    <span className="film-card__count">{favoriteFilmsCount}</span>
                  </button>
                }
                {
                  authStatus === AuthorizationStatus.Auth &&
                  <Link
                    to={`/films/${id}/review`}
                    className="btn film-card__button"
                  >
                    Add review
                  </Link>
                }
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
              <FilmDescription />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">

        <RecommendedList recommended={recommended}/>

        <footer className="page-footer">
          <LogoButton isLightVersion />

          <div className="copyright">
            <p>?? 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
