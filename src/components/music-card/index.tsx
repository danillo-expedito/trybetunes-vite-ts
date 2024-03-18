import { useEffect, useState } from 'react';
import CheckboxWithImage from '../checkbox';
import { SongType } from '../../types';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

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
    <>
      <h3>{songData.trackName}</h3>
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
    </>
  );
}

export default MusicCard;
