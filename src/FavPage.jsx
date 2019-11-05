import React from 'react';
import { Store } from './Store';
const EpisodesList = React.lazy(() => import('./EpisodesList'));
export default function FavPage() {
  const { state, dispatch } = React.useContext(Store);
  const toggleFavAction = episode => {
    const episodeInFavourites = state.favourites.includes(episode);
    let dispatchObj = {
      type: 'ADD_FAV',
      payload: episode
    };
    if (episodeInFavourites) {
      const favouritesWithoutEpisode = state.favourites.filter(
        fav => fav.id !== episode.id
      );
      dispatchObj = {
        type: 'REMOVE_FAV',
        payload: favouritesWithoutEpisode
      };
    }
    return dispatch(dispatchObj);
  };
  const props = {
    episodes: state.favourites,
    toggleFavAction: toggleFavAction,
    favourites: state.favourites
  };
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div className='episode-layout'>
        <EpisodesList {...props} />
      </div>
    </React.Suspense>
  );
}