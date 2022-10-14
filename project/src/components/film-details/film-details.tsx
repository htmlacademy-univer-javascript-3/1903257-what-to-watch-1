import { Film } from '../../types/film';

type FilmDetailsProps = {
    currentFilm : Film
}
export default function FilmDetails({ currentFilm }: FilmDetailsProps) {

  const convertRunTime = (minutes : number) => {
    const hours = Math.trunc(minutes / 60);
    const resMinutes = minutes % 60;
    return `${hours }h ${ resMinutes }m`;
  };
  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{ currentFilm.director }</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {currentFilm.starring.map((el) => <>{el}<br/></> )}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{ convertRunTime(currentFilm.runTime) }</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{ currentFilm.genre }</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{ currentFilm.released }</span>
        </p>
      </div>
    </div>
  );
}
