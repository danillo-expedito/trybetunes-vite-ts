import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../../components/loading';
import './styles.css';

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

  if (isLoading) return <Loading />;

  return (
    <div className="main-profile">
      { isLoading
        ? <Loading />
        : (
          <div className="profile-page-container">
            <div className="profile-picture">
              <img src={ user.image } alt="user" data-testid="profile-image" />
            </div>
            <div className="profile-info-container">
              <div className="username-container">
                <h3>Nome</h3>
                <p>{user.name}</p>
              </div>
              <div className="email-container">
                <h3>Email</h3>
                <p>{user.email}</p>
              </div>
              <div className="description-container">
                <h3>Descrição</h3>
                <p>{user.description}</p>
              </div>
              <div className="edit-profile-button">
                <button>
                  <a href="/profile/edit">
                    Editar perfil
                  </a>
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Profile;
