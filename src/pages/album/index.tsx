import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import Loading from '../../components/loading';
import MusicCard from '../../components/music-card';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import './styles.css';

function Album() {
  const location = useLocation();
  const [musicData, setMusicData] = useState<[AlbumType, ...SongType[]] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const albumId = location.pathname.split('/')[2];
    async function fetchMusics() {
      const response = await getMusics(albumId);
      const favoritesData = await getFavoriteSongs();
      setMusicData(response);
      setFavoriteSongs(favoritesData);
      setIsLoading(false);
    }
    fetchMusics();
  }, [location.pathname]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    musicData && (
      <div className="main-songs">
        <div className="album-artist-container">
          <img
            data-testid="album-image"
            src={ musicData[0].artworkUrl100 }
            alt={ musicData[0].collectionName }
          />
          <div>
            <h1 data-testid="album-name">{musicData[0].collectionName}</h1>
            <h2 data-testid="artist-name">{musicData[0].artistName}</h2>
          </div>
        </div>
        <div className="songs-container">
          <div className="audio-players">
            {musicData.slice(1).map((music) => (
              <>
                <MusicCard
                  key={ (music as SongType).trackId }
                  songData={ music as SongType }
                  isFavorite={
                    favoriteSongs.some((s) => s.trackId === (music as SongType).trackId)
                  }
                  refetchFavorites={ () => {} }
                />
                <hr />
              </>
            ))}
          </div>

        </div>
      </div>
    )
  );
}

export default Album;
