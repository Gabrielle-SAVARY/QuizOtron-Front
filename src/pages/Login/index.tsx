import { NavLink } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { KeysOfCredentials, changeCredentialsField, login } from '../../store/reducers/user';
import './styles.scss';

function Login() {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.user.credentials.email);
  const password = useAppSelector((state) => state.user.credentials.password);
  const logged = useAppSelector((state) => state.user.logged);

  const handleChangeField = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    // récupère name de l'input et le type la donnée
    const fieldName = event.target.name as KeysOfCredentials;

    dispatch(changeCredentialsField({
      propertyKey: fieldName,
      value: newValue,
    }));
  };

  const handleLogin = () => {
    dispatch(login());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  return (

    <div className="login-page">
      {logged && (
        <div className="login-page__logged">
          <p>Vous êtes connecté.</p>
          <button type="button">Déconnexion</button>
        </div>
      )}
      {!logged && (
      <div className="login-page__wrapper">

        <form action="submit" className="form form-login" onSubmit={handleSubmit}>
          <div className="form__logo">Quiz&apos;O&apos;tron</div>

          <input type="text" placeholder="Email" className="form__input" value={email} onChange={handleChangeField} name="email" />
          <input type="password" placeholder="Mot de passe" className="form__input" value={password} onChange={handleChangeField} name="password" />

          <button type="submit" className="form__button">Connexion</button>

          <p className="form__message">
            Pas encore de compte?
            <NavLink to="/inscription" className="form__inscription">Inscription</NavLink>
          </p>
        </form>
      </div>
      )}
    </div>

  );
}

export default Login;
