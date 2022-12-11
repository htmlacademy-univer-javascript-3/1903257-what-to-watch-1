import MainPage from '../../pages/main-page/main-page';
import { Route, Routes } from 'react-router-dom';
import UnknownPage from '../../pages/unknown-page/unknown-page';
import LoginPage from '../../pages/login-page/login-page';
import MyListPage from '../../pages/my-list-page/my-list';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks/state';
import { isCheckedAuth } from '../../utils/check-auth';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getAuthorizationStatus } from '../../store/user-data/selectors';


function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);


  if (isCheckedAuth(authorizationStatus)) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <>
      {/*{isDataLoaded || <LoadingScreen /> }*/}
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path="/"
            element={<MainPage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/mylist"
            element={
              <PrivateRoute isAuth={authorizationStatus}>
                <MyListPage />
              </PrivateRoute>
            }
          />
          <Route path="/player/:id">
            <Route
              path={':id'}
              element={<PlayerPage />}
            />
          </Route>
          <Route path="/films/">
            <Route
              path={':id'}
              element={<FilmPage />}
            >
            </Route>
            <Route
              path='/films/:id/review'
              element={
                <PrivateRoute isAuth={authorizationStatus}>
                  <AddReviewPage />
                </PrivateRoute>
              }
            >
            </Route>
          </Route>
          <Route
            path={'*'}
            element={<UnknownPage />}
          />
        </Routes>
      </HistoryRouter>
    </>
  );
}

export default App;
