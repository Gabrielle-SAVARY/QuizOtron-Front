import { NavLink } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  KeysOfCredentials,
  changeCredentialsField,
  login,
  logout,
} from '../../store/reducers/user';
import './styles.scss';
import { getUserDataFromLocalStorage } from '../../utils/user';

function Login() {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.user.credentials.email);
  const password = useAppSelector((state) => state.user.credentials.password);
  const logged = useAppSelector((state) => state.user.logged);
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);

  // Met à jour le state avec la valur des inputs du formulaire
  const handleChangeField = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    // récupère name de l'input et le type la donnée
    const fieldName = event.target.name as KeysOfCredentials;

    dispatch(
      changeCredentialsField({
        propertyKey: fieldName,
        value: newValue,
      }),
    );
  };

  // Appel API pour demande de connexion utilisateur
  const handleLogin = () => {
    dispatch(login());
  };

  // Soumission du formulaire
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  // Déconnexion utilisateur
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="login-page">
      {logged && (
        <div className="login-page__logged">
          <p>
            {`Vous êtes connecté ${pseudo}`}
          </p>
          <NavLink to="/connexion">
            <button type="button" className="login-page__button" onClick={handleLogout}>
              Déconnexion
            </button>
          </NavLink>
        </div>
      )}
      {!logged && (
        <div className="login-page__wrapper">
          <form
            action="submit"
            className="form form-login"
            onSubmit={handleSubmit}
          >
            <div className="form__logo">Quiz&apos;O&apos;tron</div>

            <input
              type="text"
              placeholder="Email"
              className="form__input"
              value={email}
              onChange={handleChangeField}
              name="email"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="form__input"
              value={password}
              onChange={handleChangeField}
              name="password"
            />

            <button type="submit" className="form__button">
              Connexion
            </button>

            <p className="form__message">
              Pas encore de compte?
              <NavLink to="/inscription" className="form__inscription">
                Inscription
              </NavLink>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
