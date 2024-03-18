import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import Loading from '../../components/loading';
import MusicCard from '../../components/music-card';

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {favorites.map((song) => (
        <MusicCard
          key={ (song as SongType).trackId }
          songData={ song as SongType }
          isFavorite
          refetchFavorites={ refetchFavorites }
        />
      )) }
    </div>
  );
}

export default Favorites;
