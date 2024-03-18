import { useEffect, useState } from 'react';
import CheckboxWithImage from '../checkbox';
import { SongType } from '../../types';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

function MusicCard(
  { trackName, previewUrl, trackId, songData, favoriteSongs }:
  { trackName: string,
    previewUrl: string,
    trackId: number,
    songData: SongType,
    favoriteSongs: SongType[]
  },
): JSX.Element {
  const [isChecked, setIsChecked] = useState(false);

  const handleFavorite = (): void => {
    if (isChecked) {
      removeSong(songData);
    } else {
      addSong(songData);
    }

    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setIsChecked(favoriteSongs.some((song) => song.trackId === trackId));
  }, [favoriteSongs, trackId]);

  return (
    <div>
      <h3>{trackName}</h3>
      <audio controls data-testid="audio-component">
        <source src={ previewUrl } type="audio/mpeg" />
        <track kind="captions" />
        Your browser does not support the audio element.
      </audio>
      <CheckboxWithImage
        checked={ isChecked }
        onChange={ handleFavorite }
        trackId={ trackId }
      />
    </div>
  );
}

export default MusicCard;
