import { Link } from 'react-router-dom';
import FilmCardPreview from '../film-card-preview/film-card-preview';
import { resetMainScreen } from '../../store/action';
import { useAppDispatch } from '../../hooks/state';

type FilmCardProps = {
  title: string,
  src: string,
  id: number,
  isActive: boolean,
  previewVideo: string,
  changeParentState: (activeCardId : number) => void
}

export default function FilmCard({ title, src, id, isActive, previewVideo, changeParentState }: FilmCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <article className="small-film-card catalog__films-card"
      onMouseEnter={() => changeParentState(id)}
      onMouseLeave={() => changeParentState(NaN)}
    >
      <div className="small-film-card__image">
        {isActive ?
          <FilmCardPreview poster={src} previewVideo={previewVideo} />
          : <img src={src} alt={ title } width="280" height="175"/>}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`} onClick={() => (dispatch(resetMainScreen()))}>{ title }</Link>
      </h3>
    </article>
  );
}
