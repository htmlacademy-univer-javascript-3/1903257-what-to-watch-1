import { useEffect } from 'react';
import FilmsList from '../../components/films-list/films-list';
import LogoButton from '../../components/logo-button/logo-button';
import PromoMovieCard from '../../components/promo-movie-card/promo-movie-card';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { fetchFavoriteFilmsAction } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/user-data/selectors';


export default function MainPage() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [authStatus, dispatch]);
  return (
    <div className="container">

      <PromoMovieCard />

      <div className="page-content">

        <FilmsList/>

        <footer className="page-footer">
          <LogoButton isLightVersion />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>);
}
