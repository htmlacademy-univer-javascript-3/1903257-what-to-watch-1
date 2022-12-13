import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/state';
import { resetMainScreen } from '../../store/main-data/main-data';

type FilmCardProps = {
    id: number,
    title: string,
    image: string
  }

export default function RecommendedFilmCard({id, title, image}: FilmCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={image} alt={title} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={`/films/${id}`}
          onClick={() => {
            dispatch(resetMainScreen());
          }}
        >
          {title}
        </Link>
      </h3>
    </article>
  );
}
