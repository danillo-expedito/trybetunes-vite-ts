import { useState } from 'react';
import CheckboxWithImage from '../checkbox';

function MusicCard(
  { trackName, previewUrl, trackId }:
  { trackName: string, previewUrl: string, trackId: number },
): JSX.Element {
  const [isChecked, setIsChecked] = useState(false);

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
        onChange={ () => setIsChecked(!isChecked) }
        trackId={ trackId }
      />
    </div>
  );
}

export default MusicCard;
