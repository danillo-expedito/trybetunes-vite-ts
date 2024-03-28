import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../../components/loading';
import userTemporaryImage from '../../images/user512.png';
import './styles.css';

function Profile() {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [isLoading, setIsLoading] = useState(true);
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const editMode = location.pathname === '/profile/edit';

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const response = await getUser();
      setUser(response);
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (user.name && user.email && user.description) {
      setSubmitIsDisabled(false);
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setUser({ ...user, image: reader.result as string });
      };
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(user.image);
    await updateUser({
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
    });
    setIsLoading(false);
    navigate('/profile');
  };

  return (
    <div className="main-profile">
      { isLoading
        ? <Loading />
        : (
          <div className="profile-page-container">
            <div className="profile-picture">
              <img
                src={ user.image || userTemporaryImage }
                alt="user"
                data-testid="profile-image"
              />
            </div>
            { editMode && (
              <div className="file-uploader">
                <label htmlFor="file-upload" className="custom-file-input">
                  <span>Upload image</span>
                  <input
                    type="file"
                    name=""
                    id="file-upload"
                    onChange={ handleFileChange }
                  />
                </label>
              </div>
            )}
            <div className="profile-info-container">
              <div className="username-container">
                <h3>Name</h3>
                { editMode
                  ? (
                    <input
                      type="text"
                      name=""
                      id="username"
                      data-testid="edit-input-name"
                      className="username-edit-input"
                      value={ user.name }
                      onChange={ (e) => setUser({ ...user, name: e.target.value }) }
                    />)
                  : (<p>{user.name}</p>)}

              </div>
              <div className="email-container">
                <h3>Email</h3>
                { editMode
                  ? (
                    <input
                      type="email"
                      name=""
                      id="user-email"
                      data-testid="edit-input-email"
                      className="email-input"
                      value={ user.email }
                      onChange={ (e) => setUser({ ...user, email: e.target.value }) }
                    />
                  )
                  : (<p>{user.email}</p>)}
              </div>
              <div className="description-container">
                <h3>Description</h3>
                { editMode
                  ? (
                    <textarea
                      name=""
                      id="description"
                      data-testid="edit-input-description"
                      className="description-edit-input"
                      maxLength={ 300 }
                      value={ user.description }
                      onChange={ (e) => {
                        setUser({ ...user, description: e.target.value });
                      } }
                    />
                  )
                  : (<p>{user.description}</p>)}
              </div>
              <div className="edit-profile-button">
                {editMode ? (
                  <button
                    type="submit"
                    data-testid="edit-button-save"
                    disabled={ submitIsDisabled }
                    onClick={ handleSubmit }
                  >
                    Save changes
                  </button>
                )
                  : (
                    <button
                      onClick={ () => navigate('/profile/edit') }
                    >
                      Edit profile
                    </button>)}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Profile;
