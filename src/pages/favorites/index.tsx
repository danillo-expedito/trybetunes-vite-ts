import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import Loading from '../../components/loading';
import MusicCard from '../../components/music-card';
import rockAndRoll from '../../images/rock-and-roll.png';
import './styles.css';

function Favorites() {
  const [favorites, setFavorites] = useState<SongType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavorites = async () => {
    setIsLoading(true);
    const response = await getFavoriteSongs();
    setFavorites(response);
    setIsLoading(false);
  };

  const refetchFavorites = async () => {
    const response = await getFavoriteSongs();
    setFavorites(response);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="favorite-songs-container">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik+Distressed&display=swap" rel="stylesheet" />
      </head>
      { isLoading
        ? <Loading />
        : (
          <div className="title-and-favorites">
            <div className="favorite-title-container">
              <h2>Favorite Songs</h2>
            </div>
            <img src={ rockAndRoll } alt="rock-and-roll" className="rock-icon" />
            <div className="songs-container">
              <div className="audio-players">
                {favorites.map((song) => (
                  <MusicCard
                    key={ (song as SongType).trackId }
                    songData={ song as SongType }
                    isFavorite
                    refetchFavorites={ refetchFavorites }
                  />
                )) }
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Favorites;
