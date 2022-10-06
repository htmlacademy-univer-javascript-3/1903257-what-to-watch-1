import { Link } from 'react-router-dom';

type FilmCardProps = {
  title: string,
  src: string,
  id: number,
  mouseOverHandler?: (evt: React.MouseEvent<HTMLDivElement>) => void;
}

export default function FilmCard({title, src, id, mouseOverHandler} : FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={src} alt={ title } width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{ title }</Link>
      </h3>
    </article>
  );
}
