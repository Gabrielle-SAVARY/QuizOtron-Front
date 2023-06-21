import { NavLink } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';
import logo from '../../assets/img/logo.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  KeysOfCredentials,
  changeCredentialsField,
  login,
  logout,
} from '../../store/reducers/user';
import './styles.scss';

function Login() {
  const dispatch = useAppDispatch();
  //* STATE
  // Récupère les infos de l'utilisateur stocké dans les states du reducer user
  const email = useAppSelector((state) => state.user.credentials.email);
  const password = useAppSelector((state) => state.user.credentials.password);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);

  // Met à jour le state avec la valeur des inputs du formulaire
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

  // Soumission du formulaire de connexion
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login());
  };

  // TODO typer event onClick
  // Déconnexion utilisateur
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="login-page">
      {isLogged && (
        <div className="login-page__isLogged">
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
      {!isLogged && (
        <div className="login-page__wrapper">
          <form
            action="submit"
            className="form form-login"
            onSubmit={handleSubmit}
          >
            {/* <div className="form__logo">Quiz&apos;O&apos;tron</div> */}
            <img src={logo} alt="logo quizotron" className="form__logo" />
            <label htmlFor="email" className="form__label">Email</label>
            <input
              type="text"
              placeholder="Email"
              className="form__input"
              value={email}
              onChange={handleChangeField}
              name="email"
            />
            <label htmlFor="password" className="form__label">Mot de passe</label>
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
