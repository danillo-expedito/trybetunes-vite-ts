import checkedHeart from '../../images/checked_heart.png';
import emptyHeart from '../../images/empty_heart.png';

function CheckboxWithImage(
  { checked, onChange, trackId }:
  { checked: boolean, onChange: () => void, trackId: number },
): JSX.Element {
  return (
    <label
      htmlFor={ (trackId).toString() }
      data-testid={ `checkbox-music-${trackId}` }
    >
      <img src={ checked ? checkedHeart : emptyHeart } alt="favorite" />
      <input
        type="checkbox"
        id={ (trackId).toString() }
        checked={ checked }
        onChange={ onChange }
        // style={ { display: 'none' } }
      />
    </label>
  );
}

export default CheckboxWithImage;
