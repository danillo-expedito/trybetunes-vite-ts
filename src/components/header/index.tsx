import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../loading';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import logo from '../../images/punkytunesblack.png';
import userImage from '../../images/user.png';
import searchIcon from '../../images/search.png';
import favoritesIcon from '../../images/skullfavorite.png';
import profileIcon from '../../images/punkginger.png';
import './styles.css';

function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({} as UserType);

  useEffect(() => {
    async function fetchUser() {
      const response = await getUser();
      setUser(response);
      setIsLoading(false);
    }

    fetchUser();
  });

  return (
    <header data-testid="header-component">
      <div className="main">
        <img src={ logo } alt="logo" className="logo" />
        <div className="navbar">
          <NavLink to="/search" data-testid="link-to-search" className="navlink">
            <img src={ searchIcon } alt="search" />
            <span>Search</span>
          </NavLink>
          <NavLink to="/favorites" data-testid="link-to-favorites" className="navlink">
            <img src={ favoritesIcon } alt="favorites" />
            <span>Favorites</span>
          </NavLink>
          <NavLink to="/profile" data-testid="link-to-profile" className="navlink">
            <img src={ profileIcon } alt="profile" />
            <span>Profile</span>
          </NavLink>
        </div>
        {isLoading
          ? <Loading />
          : (
            <div className="user-div">
              <img src={ user.image || userImage } alt="" />
              <div data-testid="header-user-name">
                { user.name }
              </div>
            </div>
          )}
      </div>
    </header>
  );
}

export default Header;
