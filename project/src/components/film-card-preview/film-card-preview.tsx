import { useEffect, useRef} from 'react';
import { FILM_CARD_PREVIEW_DELAY } from '../../const';

type FilmCardPreviewProps = {
    poster: string,
    previewVideo: string
}
export default function FilmCardPreview({poster, previewVideo} : FilmCardPreviewProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const previewDelay : NodeJS.Timeout = setTimeout(() => {
      videoRef.current?.play();
    }, FILM_CARD_PREVIEW_DELAY);

    return () => clearTimeout(previewDelay);
  });

  return (
    <video
      width="280"
      height="175"
      loop
      muted
      ref={videoRef}
      poster={poster}
    >
      <source src={previewVideo} type="video/mp4"></source>
    </video>
  );
}
