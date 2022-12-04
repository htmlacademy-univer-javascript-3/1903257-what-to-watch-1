// import { Comment } from '../../types/comment';
// type FilmCommentProps = {
//     review : Comment
// }
// export default function FilmComment({ review }: FilmCommentProps) {
//   const convertDate = (date: string) => {
//     const dateFormat = new Date(date);

//     return (
//       `${dateFormat.toLocaleString(
//         'eng',
//         { month: 'long' })} ${dateFormat.getDate()}, ${dateFormat.getFullYear()}`
//     );
//   };
//   return (
//     <div className="review">
//       <blockquote className="review__quote">
//         <p className="review__text">{review.comment }</p>

//         <footer className="review__details">
//           <cite className="review__author">{ review.user.name }</cite>
//           <time className="review__date" dateTime="2016-12-24">{ convertDate(review.date) }</time>
//         </footer>
//       </blockquote>

//       <div className="review__rating">{review.rating}</div>
//     </div>
//   );
// }
type ReviewCardProps = {
  comment: string,
  date: string,
  rating: number,
  user: {
    id: number,
    name: string
  }
}

function ReviewCard(props: ReviewCardProps) {

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

export default ReviewCard;
