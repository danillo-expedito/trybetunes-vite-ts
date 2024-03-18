import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../../components/loading';

function Profile() {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const response = await getUser();
      setUser(response);
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <img src={ user.image } alt="" data-testid="profile-image" />
      </div>
      <div>
        <div>
          <h3>Nome</h3>
          <p>{user.name}</p>
        </div>
        <div>
          <h3>Email</h3>
          <p>{user.email}</p>
        </div>
        <div>
          <h3>Descrição</h3>
          <p>{user.description}</p>
        </div>
        <a href="/profile/edit">
          Editar perfil
        </a>

      </div>
    </div>
  );
}

export default Profile;
