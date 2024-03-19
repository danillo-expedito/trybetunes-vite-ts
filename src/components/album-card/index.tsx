import { Link } from 'react-router-dom';
import { AlbumType } from '../../types';

function AlbumCard(
  { collectionId, collectionName, artistName, artworkUrl100,
    releaseDate, trackCount, collectionPrice }: AlbumType,
) {
  return (
    <div key={ collectionId } className="album">
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <img src={ artworkUrl100 } alt={ collectionName } />
        <p className="collection-name">{ collectionName }</p>
        <p className="artist">{ artistName }</p>
        <p className="release-date">{ releaseDate }</p>
        <p className="track-count">{ trackCount }</p>
        <p className="album-price">
          { collectionPrice?.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          }) }
        </p>
      </Link>
    </div>
  );
}

export default AlbumCard;
