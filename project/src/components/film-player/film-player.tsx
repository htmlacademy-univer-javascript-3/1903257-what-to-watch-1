import { useEffect, useRef } from 'react';

type FilmPlayerProps = {
    posterImage: string;
    src: string;
    isMuted: boolean;
    isPlaying: boolean;
  }

export default function FilmPlayer({posterImage, src, isMuted, isPlaying}: FilmPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current !== null) {
      isMuted ? videoRef.current.muted = true : videoRef.current.muted = false;
    }

    if (videoRef.current !== null) {
      isPlaying ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [isMuted, isPlaying]);


  return(

    <video src={src} className="player__video" poster={posterImage} ref={videoRef}></video>

  );
}
