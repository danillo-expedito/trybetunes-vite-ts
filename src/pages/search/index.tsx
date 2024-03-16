import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import Loading from '../../components/loading';

function Search() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [artistName, setArtistName] = useState('');
  const [isResponseEmpty, setIsResponseEmpty] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(searchInput.length <= 1);
  }, [searchInput]);

  async function handleSearch(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setArtistName(searchInput);
    setIsLoading(true);
    const response: AlbumType[] = await searchAlbumsAPI(searchInput);
    setSearchInput('');
    if (response.length === 0) {
      setIsResponseEmpty(true);
    } else {
      setIsResponseEmpty(false);
      setAlbums(response);
    }

    setIsLoading(false);
  }

  return (
    <>
      <div>
        <input
          type="text"
          data-testid="search-artist-input"
          value={ searchInput }
          onChange={ (e) => setSearchInput(e.target.value) }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ isButtonDisabled }
          onClick={ handleSearch }
        >
          Procurar
        </button>
      </div>

      {isLoading ? <Loading /> : (
        <>
          <div className="result-title">
            {albums.length > 0 && (
              <h2>
                {`Resultado de álbuns de: ${
                  artistName.charAt(0).toUpperCase() + artistName.slice(1)}`}
              </h2>
            )}
          </div>

          <div>
            {!isResponseEmpty ? (
              <div>
                {albums.map((album) => (
                  <div key={ album.collectionId }>
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                      <p>{ album.collectionName }</p>
                      <p>{ album.artistName }</p>
                      <p>{ album.releaseDate }</p>
                      <p>{ album.trackCount }</p>
                      <p>
                        { album.collectionPrice?.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        }) }
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            ) : <p>Nenhum álbum foi encontrado</p>}
          </div>
        </>
      )}
    </>
  );
}

export default Search;
