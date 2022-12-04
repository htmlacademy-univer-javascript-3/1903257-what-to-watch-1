import { Link, useParams } from 'react-router-dom';
import AddReview from '../../components/add-review/add-review';
import LogoButton from '../../components/logo-button/logo-button';
import UserBlock from '../../components/user-block/user-block';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setDataLoadedStatus } from '../../store/action';
import { fetchFilmByID } from '../../store/api-action';
import { useEffect } from 'react';
import LoadingScreen from '../loading-screen/loading-screen';

export default function AddReviewPage() {
  const id = Number(useParams().id);

  const film = useAppSelector((state) => state.film);
  const loadStatus = useAppSelector((state) => state.isDataLoaded);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDataLoadedStatus(true));
    dispatch(fetchFilmByID(id.toString()));
    dispatch(setDataLoadedStatus(false));
  }, [id, dispatch]);


  if (loadStatus) {
    return(<LoadingScreen />);
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.backgroundImage} alt={film?.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <LogoButton isLightVersion={ false } />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{film?.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={`/film/${id}/review`}>
                  Add review
                </Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327"/>
        </div>
      </div>

      <AddReview></AddReview>

    </section>
  );
}
