import { getAllGenres } from '../../utils/get-all-genres';
import { useAppSelector, useAppDispatch } from '../../hooks/state';
import { useState, MouseEvent } from 'react';
import { DEFAULT_GENRE } from '../../const';
import { changeGenre } from '../../store/action';
export default function GenresList() {
  const [currentGenre, setCurrentGenre] = useState(DEFAULT_GENRE);
  const disptach = useAppDispatch();
  const filmsList = useAppSelector((state) => state.filmsList);
  const genres = getAllGenres(filmsList);
  const handleClick = (e: MouseEvent<HTMLAnchorElement>, genre: string) => {
    e.preventDefault();
    disptach(changeGenre({ currentGenre: genre }));
    setCurrentGenre(genre);
  };


  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li className={`catalog__genres-item ${currentGenre === genre && 'catalog__genres-item--active'}`} key={genre}>
          <a href="/"
            className="catalog__genres-link"
            onClick={(e) => handleClick(e, genre)}
          >{genre}
          </a>
        </li>
      ))}
    </ul>
  );
}
