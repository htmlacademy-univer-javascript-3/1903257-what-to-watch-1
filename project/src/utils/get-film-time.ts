export const getFilmTimeLeft = (fullTime: number, currentTime: number) => {
  const timeLeft = fullTime - currentTime;
  return `${Math.floor(timeLeft / 60)}:${(`0${Math.floor(timeLeft % 60)}`).slice(-2)}`;
};
