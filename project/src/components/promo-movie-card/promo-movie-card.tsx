import { useAppSelector, useAppDispatch } from '../../hooks/state';
import LogoButton from '../logo-button/logo-button';
import UserBlock from '../user-block/user-block';
import { getFavoriteFilmsCount, getPromo } from '../../store/main-data/selectors';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import { FilmStatus } from '../../types/film-status';
import { AuthorizationStatus } from '../../const';
import { changePromoStatus, fetchPromoAction } from '../../store/api-action';
import { setFavoriteFilmsCount } from '../../store/main-data/main-data';
import { useEffect } from 'react';

export default function PromoMovieCard(): JSX.Element {
  const dispatch = useAppDispatch();

  const promo = useAppSelector(getPromo);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const favoriteFilmsCount = useAppSelector(getFavoriteFilmsCount);

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch, promo, favoriteFilmsCount]);
  const onAddFavoriteFilmClick = () => {
    const filmStatus: FilmStatus = {
      filmId: promo?.id || NaN,
      status: promo?.isFavorite ? 0 : 1
    };

    dispatch(changePromoStatus(filmStatus));

    if (promo?.isFavorite) {
      dispatch(setFavoriteFilmsCount(favoriteFilmsCount - 1));
    } else {
      dispatch(setFavoriteFilmsCount(favoriteFilmsCount + 1));
    }
  };
  if (!promo) {
    return <section className="film-card"></section>;
  }

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={promo.previewImage} alt={promo.name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <LogoButton isLightVersion={false}/>

        <UserBlock />
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={promo.posterImage} alt={promo.name} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{promo.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promo.genre}</span>
              <span className="film-card__year">{promo.released.toString()}</span>
            </p>

            <div className="film-card__buttons">
              <button className="btn btn--play film-card__button" type="button">
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
                    promo?.isFavorite ? <span>✓</span> :
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                  }
                  <span>My list</span>
                  <span className="film-card__count">{favoriteFilmsCount}</span>
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
