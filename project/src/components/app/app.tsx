import MainPage from '../../pages/main-page/main-page';
import { Route, Routes } from 'react-router-dom';
import UnknownPage from '../../pages/unknown-page/unknown-page';
import LoginPage from '../../pages/login-page/login-page';
import MyListPage from '../../pages/my-list-page/my-list';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import PrivateRoute from '../private-route/private-route';
import { Films } from '../../types/films';
import { FavoriteFilms } from '../../types/favourite-film';
import { Recommended } from '../../types/recomended';
import { Comments } from '../../types/comments';
import { useAppSelector } from '../../hooks/state';
import { isCheckedAuth } from '../../utils/check-auth';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

type AppProps = {
  MainMovie: {
    title: string,
    genre: string,
    releaseDate: number
  },
  Films: Films,
  FavoriteFilms: FavoriteFilms,
  RecommendedFilms: Recommended,
  Reviews : Comments
}


function App(MainMovieProps: AppProps): JSX.Element {
  const { authorizationStatus, isDataLoaded } = useAppSelector((state) => state);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path='/' element={<MainPage movie={MainMovieProps.MainMovie}/>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/mylist' element={<PrivateRoute isAuth={authorizationStatus}><MyListPage favoriteFilms={MainMovieProps.FavoriteFilms}/></PrivateRoute>}></Route>
        <Route path='/films/:id' element={<FilmPage films={MainMovieProps.Films} recommended={MainMovieProps.RecommendedFilms} reviews={MainMovieProps.Reviews}></FilmPage>}></Route>
        <Route path='/films/:id/review' element={<AddReviewPage films={MainMovieProps.Films}></AddReviewPage>}></Route>
        <Route path='/player/:id' element={<PlayerPage films={MainMovieProps.Films}></PlayerPage>}></Route>
        <Route path='*' element={<UnknownPage></UnknownPage>}></Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
