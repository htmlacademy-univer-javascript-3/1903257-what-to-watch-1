
import MainPage from '../../pages/main-page/main-page';

type MainMovie = {
  title: string,
  genre: string,
  releaseDate: number
}

function App(MainMovieProps: MainMovie): JSX.Element {
  return <MainPage movie = {MainMovieProps} />;
}

export default App;
