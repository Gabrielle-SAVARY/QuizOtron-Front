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
import { validateFormFields } from '../../utils/validateFormField';
import { validationRulesLogin } from '../../utils/validationsRules';
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
    // Réinitialise le message d'erreur de l'input
    setErrorInputMsg({ ...errorInputMsg, [fieldName]: '' });
  };

  // Soumission du formulaire si aucune erreur
  const handleFormSubmit = (errors: { [key: string]: string }) => {
    // Renvoi un tableau contenant les clés (propriétés) de l'objet errors
    // et on vérifie sa longueur
    // Si vide alors pas d'erreur: faire la requête POST au backend
    if (Object.keys(errors).length === 0) {
      dispatch(login());
    }
  };

  // Soumission du formulaire de connexion
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Typepage de l'event.target
    const form = event.target as HTMLFormElement;

    // Résultat de la validation des champs du formulaire
    // errors: objet vide ou contient les messages d'erreurs
    const errors = validateFormFields(form, validationRulesLogin);

    // Mise à jour du state avec les messages d'erreurs (asynchrone): affichage des erreurs frontend
    setErrorInputMsg((prevState) => ({ ...prevState, ...errors }));

    // Gère la soumission du formulaire
    handleFormSubmit(errors);
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
