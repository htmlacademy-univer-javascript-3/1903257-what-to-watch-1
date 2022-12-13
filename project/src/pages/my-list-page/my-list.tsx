import LogoButton from '../../components/logo-button/logo-button';
import UserBlock from '../../components/user-block/user-block';
import RecommendedFilmCard from '../../components/recommended-film-card/recommended-film-card';
import { useAppSelector, useAppDispatch } from '../../hooks/state';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import { useEffect } from 'react';
import { AuthorizationStatus } from '../../const';
import { fetchFavoriteFilmsAction } from '../../store/api-action';
import { getFavoriteFilms } from '../../store/main-data/selectors';


export default function MyListPage() {
  const dispatch = useAppDispatch();
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const authStatus = useAppSelector(getAuthorizationStatus);
  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [authStatus, dispatch]);
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <LogoButton isLightVersion={false}/>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilms.length}</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {favoriteFilms.map((film) => <RecommendedFilmCard title={film.name} image={film.previewImage} key={film.id} id={film.id}></RecommendedFilmCard>)}
        </div>
      </section>

      <footer className="page-footer">
        <LogoButton isLightVersion/>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>

  );
}
