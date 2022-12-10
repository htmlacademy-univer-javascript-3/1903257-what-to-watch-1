import FilmTabs from '../film-tabs/film-tabs';
import { FilmTabsEnum } from '../../const';
import { useState } from 'react';
import FilmOverview from '../film-overview/film-overview';
import { Film } from '../../types/film';
import FilmDetails from '../film-details/film-details';
import FilmReviews from '../film-reviews/film-reviews';
import { Comments } from '../../types/comments';


type FilmDescriptionProps = {
    currentFilm: Film | null,
    reviews: Comments
}
export default function FilmDescription({currentFilm, reviews}: FilmDescriptionProps) {
  const [currentTab, setCurrentTab] = useState<string>(FilmTabsEnum.Overview);

  if (!currentFilm) {
    return (
      <div className="film-card__desc">
        NO FILMS
      </div>
    );
  }
  return (
    <div className="container">
      <FilmTabs
        currentTab={currentTab}
        setCurrentTab={(tab : string) => {
          setCurrentTab(tab);
        }}
      />

      {currentTab === FilmTabsEnum.Overview &&
                <FilmOverview
                  currentFilm={currentFilm}
                />}

      {currentTab === FilmTabsEnum.Details &&
                <FilmDetails
                  currentFilm={currentFilm}
                />}

      {currentTab === FilmTabsEnum.Reviews &&
                <FilmReviews
                  reviews={reviews}
                />}
    </div>
  );
}
