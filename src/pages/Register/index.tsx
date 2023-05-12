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

function Register() {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.user.credentials.email);
  const password = useAppSelector((state) => state.user.credentials.password);
  const pseudo = useAppSelector((state) => state.user.pseudo);
  const firstName = useAppSelector((state) => state.user.firstName);
  const lastName = useAppSelector((state) => state.user.lastName);
  const logged = useAppSelector((state) => state.user.logged);

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
    {/* <div className="login-page">
      {logged && (
        <div className="login-page__logged">
          <p>Vous êtes connecté.</p>
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
              placeholder="Prénom"
              className="form__input"
              value={firstName}
              onChange={handleChangeField}
              name="firstName"
            />
            <input
              type="text"
              placeholder="Nom"
              className="form__input"
              value={lastName}
              onChange={handleChangeField}
              name="lastName"
            />
            <input
              type="text"
              placeholder="Pseudo"
              className="form__input"
              value={pseudo}
              onChange={handleChangeField}
              name="pseudo"
            />
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
            <input
              type="password"
              placeholder="Confirmation mot de passe"
              className="form__input"
              value={password}
              onChange={handleChangeField}
              name="confirm password"
            />

            <button type="submit" className="form__button">
              Inscription
            </button>

            <p className="form__message">
              Déjà un compte?
              <NavLink to="/connexion" className="form__inscription">
                Connexion
              </NavLink>
            </p>
          </form>
        </div>
      )}
    </div> */}
  );
}

export default Register;
