import { FilmTabsEnum } from '../../const';
type FilmTabsProps = {
    currentTab: string,
    setCurrentTab : (tab : string) => void
}

export default function FilmTabs({ currentTab, setCurrentTab }: FilmTabsProps) {

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <li className={`film-nav__item ${currentTab === FilmTabsEnum.Overview && 'film-nav__item--active'}`}>
          <a
            href="/"
            className="film-nav__link"
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab(FilmTabsEnum.Overview);
            }}
          >Overview
          </a>
        </li>
        <li className={`film-nav__item ${currentTab === FilmTabsEnum.Details && 'film-nav__item--active'}`}>
          <a
            href="/"
            className="film-nav__link"
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab(FilmTabsEnum.Details);
            }}
          >Details
          </a>
        </li>
        <li className={`film-nav__item ${currentTab === FilmTabsEnum.Reviews && 'film-nav__item--active'}`}>
          <a
            href="/"
            className="film-nav__link"
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab(FilmTabsEnum.Reviews);
            }}
          >Reviews
          </a>
        </li>
      </ul>
    </nav>
  );
}
