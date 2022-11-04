import { MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks/state';
import { increaseFilmsCount } from '../../store/action';

type ShowMoreButtonProps = {
    isAllFilmsLoaded : boolean
}

export default function ShowMoreButton({ isAllFilmsLoaded }: ShowMoreButtonProps) {
  const dispatch = useAppDispatch();
  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    dispatch(increaseFilmsCount());

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
