type ReviewCardProps = {
  comment: string,
  date: string,
  rating: number,
  user: {
    id: number,
    name: string
  }
}

export default function ReviewCard(props: ReviewCardProps) {

  const { comment, date, rating, user } = props;
  const convertDate = (dateTime: string) => {
    const dateFormat = new Date(dateTime);

    return (
      `${dateFormat.toLocaleString(
        'eng',
        { month: 'long' })} ${dateFormat.getDate()}, ${dateFormat.getFullYear()}`
    );
  };
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time
            className="review__date"
          >
            { convertDate(date) }
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

