import { useState } from 'react';
export default function AddReview() {
  const [formData, setFormData] = useState({
    rating: 8,
    text: '',
  });

  const fieldChangeHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, text: e.target.value });
  };

  const ratingChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rating: parseInt(e.target.value, 10) });

  };
  return (
    <div className="container">
      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {
                [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((number) => (
                  <>
                    <input
                      className="rating__input"
                      id={`star-${number}`}
                      key={number}
                      type="radio"
                      name="rating"
                      value={number}
                      onChange={ratingChangeHandle}
                      checked={formData.rating === number}
                    />
                    <label className="rating__label" htmlFor={`star-${number}`}>Rating {number}</label>
                  </>
                ))
              }
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text" id="review-text"
              placeholder="Review text"
              value={formData.text}
              onChange={fieldChangeHandle}
            >
            </textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
