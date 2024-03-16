import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../loading';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';

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
      <div>
        <NavLink to="/search" data-testid="link-to-search">Pesquisa</NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">Favoritas</NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
      </div>
      {isLoading
        ? <Loading />
        : (
          <div data-testid="header-user-name">
            { user.name }
          </div>
        )}
    </header>
  );
}

export default Header;
