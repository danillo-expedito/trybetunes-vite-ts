import React from 'react';
import { Link } from 'react-router-dom';
import { AlbumType } from '../../types';
import './styles.css';

function AlbumCard({
  collectionId,
  collectionName,
  artistName,
  artworkUrl100,
  releaseDate,
  trackCount,
  collectionPrice,
}: AlbumType) {
  function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    const year = date.getFullYear();

    return `${year}`;
  }
  return (
    <div key={ collectionId } className="album">
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <div className="album-image-container">
          <img src={ artworkUrl100 } alt={ collectionName } className="album-image" />
        </div>
        <div className="album-info">
          <p className="collection-name">{collectionName}</p>
          <p className="artist">{artistName}</p>
          <p className="release-date">{formatDate(releaseDate)}</p>
          <p className="track-count">{trackCount}</p>
          <p className="album-price">
            {collectionPrice?.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default AlbumCard;
