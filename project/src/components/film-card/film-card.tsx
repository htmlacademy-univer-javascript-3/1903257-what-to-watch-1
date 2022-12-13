import { Link } from 'react-router-dom';
import FilmCardPreview from '../film-card-preview/film-card-preview';
import { useAppDispatch } from '../../hooks/state';
import { useState } from 'react';
import { resetMainScreen } from '../../store/main-data/main-data';

type FilmCardProps = {
  title: string,
  src: string,
  id: number,
  previewVideo: string,
}

export default function FilmCard({ title, src, id, previewVideo }: FilmCardProps): JSX.Element {
  const [isPointedFilm, setIsPointedFilm] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <article className="small-film-card catalog__films-card"
      onMouseEnter={() => setIsPointedFilm(true)}
      onMouseLeave={() => setIsPointedFilm(false)}
    >
      <div className="small-film-card__image">
        {isPointedFilm ?
          <FilmCardPreview poster={src} previewVideo={previewVideo} />
          : <img src={src} alt={ title } width="280" height="175"/>}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`} onClick={() => (dispatch(resetMainScreen()))}>{ title }</Link>
      </h3>
    </article>
  );
}
