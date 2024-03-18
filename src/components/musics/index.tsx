import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import Loading from '../loading';
import MusicCard from '../music-card';

function Musics() {
  const location = useLocation();
  const [musicData, setMusicData] = useState<[AlbumType, ...SongType[]] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const albumId = location.pathname.split('/')[2];
    async function fetchMusics() {
      const response = await getMusics(albumId);
      setMusicData(response);
      setIsLoading(false);
    }
    fetchMusics();
  }, [location.pathname]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    musicData && (
      <div>
        <div>
          <h1 data-testid="artist-name">{musicData[0].artistName}</h1>
          <h2 data-testid="album-name">{musicData[0].collectionName}</h2>
        </div>
        <div>
          {musicData.slice(1).map((music) => (
            <MusicCard
              key={ (music as SongType).trackId }
              trackName={ (music as SongType).trackName }
              previewUrl={ (music as SongType).previewUrl }
              trackId={ (music as SongType).trackId }
            />
          ))}
        </div>
      </div>
    )
  );
}

export default Musics;
