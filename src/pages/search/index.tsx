import { useEffect, useState } from 'react';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import Loading from '../../components/loading';
import './styles.css';
import AlbumCard from '../../components/album-card';

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
    <div className="main-search">
      <div className="searchtab">
        <input
          type="text"
          data-testid="search-artist-input"
          value={ searchInput }
          placeholder="Type the artist or band name here..."
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
      <div className="result-div">
        {isLoading ? <Loading /> : (
          <div className="albums-main-div">
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
                <div className="albums-div">
                  {albums.map((album) => (
                    <AlbumCard
                      key={ album.collectionId }
                      collectionId={ album.collectionId }
                      collectionName={ album.collectionName }
                      artworkUrl100={ album.artworkUrl100 }
                      artistName={ album.artistName }
                      artistId={ album.artistId }
                      releaseDate={ album.releaseDate }
                      trackCount={ album.trackCount }
                      collectionPrice={ album.collectionPrice }
                    />
                  ))}
                </div>
              ) : <p>Nenhum álbum foi encontrado</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
