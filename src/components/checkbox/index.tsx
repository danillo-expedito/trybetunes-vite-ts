import starFavorite from '../../images/star-favorite.png';
import emptyStar from '../../images/star.png';
import './styles.css';

function CheckboxWithImage(
  { checked, onChange, trackId }:
  { checked: boolean, onChange: () => void, trackId: number },
): JSX.Element {
  return (
    <label
      htmlFor={ (trackId).toString() }
      data-testid={ `checkbox-music-${trackId}` }
      className="checkbox-with-image"
    >
      <img src={ checked ? starFavorite : emptyStar } alt="favorite" />
      <input
        type="checkbox"
        id={ (trackId).toString() }
        checked={ checked }
        onChange={ onChange }
        style={ { display: 'none' } }
      />
    </label>
  );
}

export default CheckboxWithImage;
