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
import { Films } from '../../types/films';
import { FavoriteFilms } from '../../types/favourite-film';
import { Recommended } from '../../types/recomended';

type AppProps = {
  MainMovie: {
    title: string,
    genre: string,
    releaseDate: number
  },
  Films: Films,
  FavoriteFilms: FavoriteFilms,
  RecommendedFilms : Recommended
}


function App(MainMovieProps: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage movie={MainMovieProps.MainMovie} films={MainMovieProps.Films} />}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/mylist' element={<PrivateRoute isAuth={AuthInformation.Auth}><MyListPage favoriteFilms={MainMovieProps.FavoriteFilms}/></PrivateRoute>}></Route>
        <Route path='/films/:id' element={<FilmPage films={MainMovieProps.Films} recommended={MainMovieProps.RecommendedFilms}></FilmPage>}></Route>
        <Route path='/films/:id/review' element={<AddReviewPage films={MainMovieProps.Films}></AddReviewPage>}></Route>
        <Route path='/player/:id' element={<PlayerPage films={MainMovieProps.Films}></PlayerPage>}></Route>
        <Route path='*' element={<UnknownPage></UnknownPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
