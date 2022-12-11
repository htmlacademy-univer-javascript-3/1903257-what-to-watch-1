import { MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks/state';
import { increaseCardCount } from '../../store/main-data/main-data';

type ShowMoreButtonProps = {
    isAllFilmsLoaded : boolean
}

export default function ShowMoreButton({ isAllFilmsLoaded }: ShowMoreButtonProps) {
  const dispatch = useAppDispatch();
  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    dispatch(increaseCardCount());

  };
  return (
    <div className="catalog__more">
      {
        isAllFilmsLoaded &&
                <button
                  className="catalog__button"
                  type="button"
                  onClick={(e) => handleClick(e)}
                >Show more
                </button>

      }

    </div>
  );
}
