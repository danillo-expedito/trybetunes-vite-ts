import { useEffect, useState } from 'react';
import CheckboxWithImage from '../checkbox';
import { SongType } from '../../types';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import './styles.css';

function MusicCard(
  { songData, isFavorite, refetchFavorites }:
  { songData: SongType,
    isFavorite: boolean,
    refetchFavorites: () => void,
  },
): JSX.Element {
  const [isChecked, setIsChecked] = useState(false);

  const handleFavorite = (): void => {
    if (isChecked) {
      removeSong(songData).then(() => {
        setIsChecked(false);
        refetchFavorites();
      });
    } else {
      addSong(songData).then(() => {
        setIsChecked(true);
      });
    }

    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setIsChecked(isFavorite);
  }, [isFavorite]);

  return (
    <div className="song-player">
      <div className="music-name">
        <h3>{songData.trackName}</h3>
      </div>
      <div className="player">
        <audio controls data-testid="audio-component">
          <source src={ songData.previewUrl } type="audio/mpeg" />
          <track kind="captions" />
          Your browser does not support the audio element.
        </audio>
        <CheckboxWithImage
          checked={ isChecked }
          onChange={ handleFavorite }
          trackId={ songData.trackId }
        />
      </div>
    </div>
  );
}

export default MusicCard;
