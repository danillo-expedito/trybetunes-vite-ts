import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading';
import { UserType } from '../../types';
import { getUser, updateUser } from '../../services/userAPI';

function ProfileEdit() {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [isLoading, setIsLoading] = useState(true);
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();

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

  if (isLoading) return <Loading />;

  return (
    <form>
      <label htmlFor="username">
        <input
          type="text"
          name=""
          id="username"
          data-testid="edit-input-name"
          value={ user.name }
          onChange={ (e) => setUser({ ...user, name: e.target.value }) }
        />
      </label>
      <label htmlFor="user-email">
        <input
          type="email"
          name=""
          id="user-email"
          data-testid="edit-input-email"
          value={ user.email }
          onChange={ (e) => setUser({ ...user, email: e.target.value }) }
        />
      </label>
      <label htmlFor="description">
        <input
          type="textarea"
          name=""
          id="description"
          data-testid="edit-input-description"
          value={ user.description }
          onChange={ (e) => setUser({ ...user, description: e.target.value }) }
        />
      </label>
      <label htmlFor="user-image">
        <input
          type="image"
          src={ previewImage || user.image }
          alt="user"
          data-testid="edit-input-image"
          value={ user.image }
        />
      </label>
      <label htmlFor="picture-file">
        <input
          type="file"
          name=""
          id="picture-file"
          onChange={ handleFileChange }
        />
      </label>
      <button
        type="submit"
        data-testid="edit-button-save"
        disabled={ submitIsDisabled }
        onClick={ handleSubmit }
      >
        Editar perfil
      </button>
    </form>
  );
}

export default ProfileEdit;
