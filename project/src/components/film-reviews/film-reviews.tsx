import { Comments } from '../../types/comments';
import FilmComment from '../film-comment/film-comment';
type FilmReviewsProps = {
    reviews: Comments
}
export default function FilmReviews({ reviews }: FilmReviewsProps) {


  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.filter((a,i) => i % 2 === 0).map((review) => (
          <FilmComment
            key={review.id}
            comment={review.comment}
            date={review.date}
            rating={review.rating}
            user={review.user}
          />))}
      </div>
      <div className="film-card__reviews-col">
        {reviews.filter((a,i) => i % 2 === 1).map((review) => (
          <FilmComment
            key={review.id}
            comment={review.comment}
            date={review.date}
            rating={review.rating}
            user={review.user}
          />))}
      </div>
    </div>
  );
}
