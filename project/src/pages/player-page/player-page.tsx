import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { getFilm, getIsFilmFound, getIsFilmLoading } from '../../store/film-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { fetchFilmByID } from '../../store/api-action';
import UnknownPage from '../unknown-page/unknown-page';
import { resetMainScreen } from '../../store/main-data/main-data';
import { getFilmTimeLeft } from '../../utils/get-film-time';
import { FullScreenButton } from '../../components/fullscreen-button/fullscreen-button';

export default function PlayerPage(): JSX.Element {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();

  const [filmTiming, setFilmTiming] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);

  const navigate = useNavigate();
  const playerRef = useRef() as MutableRefObject<HTMLVideoElement>;
  const film = useAppSelector(getFilm);
  const isFilmFound = useAppSelector(getIsFilmFound);
  const isFilmLoading = useAppSelector(getIsFilmLoading);

  const [isFilmPlaying, setFilmPlaying] = useState(false);

  useEffect(() => {
    dispatch(fetchFilmByID(id.toString()));
  }, [id, dispatch]);

  if(playerRef.current) {
    playerRef.current.ontimeupdate = () => {
      setVideoCurrentTime(playerRef.current?.currentTime);
      setVideoProgress((playerRef.current?.currentTime / filmTiming) * 100);
    };
  }

  useEffect(() => {
    if(playerRef.current) {
      setFilmTiming(playerRef.current.duration);
    }
  }, [isFilmPlaying]);

  if (isFilmLoading) {
    return <LoadingScreen />;
  }

  if (!isFilmFound) {
    return <UnknownPage />;
  }

  return (
    <div className="player">
      <video ref={playerRef} autoPlay src={film?.videoLink} id="video" className="player__video" poster={film?.backgroundImage} onPlay={() => setFilmPlaying(true)}></video>

      <button type="button" className="player__exit" onClick={() => {
        dispatch(resetMainScreen());
        navigate(-1);}}
      >Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={videoProgress} max="100"></progress>
            <div className="player__toggler" style={{left: `${videoProgress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">-{filmTiming && videoCurrentTime ? getFilmTimeLeft(filmTiming, videoCurrentTime) : '0:00:00'}</div>
        </div>

        <div className="player__controls-row">
          {isFilmPlaying ? (
            <button type="button" className="player__play" onClick={() => {
              playerRef.current.pause();
              setFilmPlaying(false);
            }}
            >
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>
              <span>Pause</span>
            </button>
          ) : (
            <button type="button" className="player__play" onClick={() => {
              playerRef.current.play();
              setFilmPlaying(true);
            }}
            >
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
          )}

          <div className="player__name">{film?.name}</div>

          <FullScreenButton />
        </div>
      </div>
    </div>
  );
}
