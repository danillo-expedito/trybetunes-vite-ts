import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/loading';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsSubmitDisabled(username.length <= 2);
  }, [username]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  async function handleSubmit() {
    setIsLoading(true);
    await createUser({ name: username });
    setIsLoading(false);
    navigate('/search');
  }

  if (isLoading) return <Loading />;

  return (
    <form>
      <label htmlFor="">
        Username
        <input
          type="text"
          data-testid="login-name-input"
          value={ username }
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="login-submit-button"
        type="submit"
        disabled={ isSubmitDisabled }
        onClick={ handleSubmit }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
