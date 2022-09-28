import MainPage from '../../pages/main-page/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UnknownPage from '../../pages/unknown-page/unknown-page';
import LoginPage from '../../pages/login-page/login-page';
import MyListPage from '../../pages/my-list-page/my-list';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import PrivateRoute from '../private-route/private-route';
import { AuthInformation } from '../../const';

type MainMovie = {
  title: string,
  genre: string,
  releaseDate: number
}


function App(MainMovieProps: MainMovie): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage movie={MainMovieProps} />}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/mylist' element={<PrivateRoute isAuth={AuthInformation.NoAuth}><MyListPage /></PrivateRoute>}></Route>
        <Route path='/films/:id' element={<FilmPage></FilmPage>}></Route>
        <Route path='/films/:id/review' element={<AddReviewPage></AddReviewPage>}></Route>
        <Route path='/player/:id' element={<PlayerPage></PlayerPage>}></Route>
        <Route path='*' element={<UnknownPage></UnknownPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
