import MainPage from '../../pages/main-page/main-page';
import { Route, Routes } from 'react-router-dom';
import UnknownPage from '../../pages/unknown-page/unknown-page';
import LoginPage from '../../pages/login-page/login-page';
import MyListPage from '../../pages/my-list-page/my-list';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import PrivateRoute from '../private-route/private-route';
import { FavoriteFilms } from '../../types/favourite-film';
import { useAppSelector } from '../../hooks/state';
import { isCheckedAuth } from '../../utils/check-auth';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

type AppProps = {
  FavoriteFilms: FavoriteFilms,
}


function App(MainMovieProps: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isDataLoaded = useAppSelector((state) => state.isDataLoaded);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/mylist' element={<PrivateRoute isAuth={authorizationStatus}><MyListPage favoriteFilms={MainMovieProps.FavoriteFilms}/></PrivateRoute>}></Route>
        <Route path='/films/:id' element={<FilmPage></FilmPage>}></Route>
        <Route path='/films/:id/review' element={<AddReviewPage></AddReviewPage>}></Route>
        <Route path='/player/:id' element={<PlayerPage></PlayerPage>}></Route>
        <Route path='*' element={<UnknownPage></UnknownPage>}></Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
