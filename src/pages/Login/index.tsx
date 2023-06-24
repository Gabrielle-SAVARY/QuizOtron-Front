import { NavLink } from 'react-router-dom';
import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  KeysOfCredentials,
  changeCredentialsField,
  clearInputsAndErrors,
  login,
  logout,
} from '../../store/reducers/user';
import { IerrorFormLogin } from '../../@types/error';
import Logo from '../../components/Logo';
import logoQuizotron from '../../assets/img/logoQuizotron.png';
import './styles.scss';

function Login() {
  const dispatch = useAppDispatch();
  //* STATE
  // Récupère les infos de l'utilisateur stocké dans les states du reducer user
  const email = useAppSelector((state) => state.user.credentials.email);
  const password = useAppSelector((state) => state.user.credentials.password);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  // Récupère les messages d'erreur suite requête au backend
  const errorMessages = useAppSelector((state) => state.user.errorMessages);
  // Stocke les messages d'erreur des inputs du formulaire suite aux vérifications frontend
  const [errorInputMsg, setErrorInputMsg] = useState<IerrorFormLogin>({
    email: '',
    password: '',
  });

  // Au chargement de la page, si l'utilisateur n'est pas connecté
  // on vide les champs du formulaire et les messages d'erreur
  useEffect(() => {
    const handleClearInputsandErrors = () => {
      if (!isLogged) {
        dispatch(clearInputsAndErrors());
      }
    };
    handleClearInputsandErrors();
  }, [dispatch, isLogged]);

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
    setErrorInputMsg({ ...errorInputMsg, [fieldName]: '' });
  };

  // Validation des champs du formulaire et mise à jour du state des erreurs
  const validateEmail = (emailSubmit: string) => {
    // Effectuez les validations et mettez à jour le state en conséquence
    if (emailSubmit.trim() === '') {
      setErrorInputMsg((prevState) => ({
        ...prevState,
        email: "L'e-mail ne peut pas être vide.",
      }));
    }
  };
  const validatePassword = (passwordSubmit: string) => {
    if (passwordSubmit.trim() === '') {
      setErrorInputMsg((prevState) => ({
        ...prevState,
        password: 'Le mot de passe ne peut pas être vide.',
      }));
    } else if (passwordSubmit.length < 6 || passwordSubmit.length > 30) {
      setErrorInputMsg((prevState) => ({
        ...prevState,
        password: 'Le mot de passe doit comporter entre 6 et 30 caractères.',
      }));
    }
  };

  // Soumission du formulaire de connexion
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Typepage de l'event.target
    const form = event.target as HTMLFormElement;
    // Récupération des valeurs des champs du formulaire
    const emailSubmit = form.email.value;
    const passwordSubmit = form.password.value;
    // Vérification et validation des champs du formulaire
    validateEmail(emailSubmit);
    validatePassword(passwordSubmit);
    // Si pas d'erreur et que tous les champs ne sont pas vides faire requête POST au backend
    if (
      errorInputMsg.email === ''
    && errorInputMsg.password === ''
    && emailSubmit !== ''
    && passwordSubmit !== ''
    && emailSubmit.trim() !== ''
    && passwordSubmit.trim() !== ''
    && !(passwordSubmit.length < 6 || passwordSubmit.length > 30)
    ) {
      dispatch(login());
    }
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
            <Logo logoContainerClassName="form__container-logo" logoName={logoQuizotron} logoClassName="form__logo-img" />
            <label htmlFor="email" className="form__label">Email</label>
            <input
              type="email"
              placeholder="Email"
              className={`form__input ${errorInputMsg.email !== '' ? 'error-input' : ''}`}
              value={email}
              onChange={handleChangeField}
              name="email"
            />
            {errorInputMsg.email !== ''
            && (
            <div className="error-msg">
              {errorInputMsg.email}
            </div>
            )}
            <label htmlFor="password" className="form__label">Mot de passe</label>
            <input
              type="password"
              placeholder="Mot de passe"
              className={`form__input ${errorInputMsg.password !== '' ? 'error-input' : ''}`}
              value={password}
              onChange={handleChangeField}
              name="password"
            />
            {errorInputMsg.password !== ''
            && (
            <div className="error-msg">
              {errorInputMsg.password}
            </div>
            )}
            {errorMessages !== '' && <div className="error-message">{errorMessages}</div>}
            <button type="submit" className="form-login__button">
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
