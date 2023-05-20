import { NavLink } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  KeysOfCredentials,
  changeCredentialsField,
  register,
} from '../../store/reducers/user';
import './styles.scss';

function Register() {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.user.credentials.email);
  const password = useAppSelector((state) => state.user.credentials.password);
  const passwordConfirm = useAppSelector((state) => state.user.credentials.passwordConfirm);
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  const firstname = useAppSelector((state) => state.user.credentials.firstname);
  const lastname = useAppSelector((state) => state.user.credentials.lastname);
  const registered = useAppSelector((state) => state.user.registered);

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
  const handleRegister = () => {
    dispatch(register());
  };

  // Soumission du formulaire
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleRegister();
  };

  return (
    <div className="login-page">
      {registered && (
      <div className="login-page__isLogged">
        <p>Vous êtes inscrit, veuillez vous connecter.</p>
        <p className="form__message">
          Déjà un compte?
          <NavLink to="/connexion" className="form__inscription">
            Connexion
          </NavLink>
        </p>
      </div>
      )}
      {!registered && (
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
            value={firstname}
            onChange={handleChangeField}
            name="firstname"
          />
          <input
            type="text"
            placeholder="Nom"
            className="form__input"
            value={lastname}
            onChange={handleChangeField}
            name="lastname"
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
            value={passwordConfirm}
            onChange={handleChangeField}
            name="passwordConfirm"
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
    </div>
  );
}

export default Register;
