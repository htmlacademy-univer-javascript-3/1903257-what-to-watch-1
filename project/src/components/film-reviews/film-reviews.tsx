import { Comments } from '../../types/comments';
import FilmComment from '../film-comment/film-comment';
type FilmReviewsProps = {
    reviews: Comments
}
export default function FilmReviews({ reviews }: FilmReviewsProps) {


  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review) => <FilmComment review={review} key={ review.id } />) }
      </div>
    </div>
  );
}
