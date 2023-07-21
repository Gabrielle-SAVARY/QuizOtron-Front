import { NavLink, useNavigate } from 'react-router-dom';
import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  KeysOfCredentials,
  changeCredentialsField,
  clearInputsAndErrors,
  login,
} from '../../store/reducers/user';
import { validateTextFields } from '../../utils/validateFormField';
import { validationRulesLogin } from '../../utils/validationsRules';
import { IerrorFormLogin } from '../../@types/error';
import Logo from '../../components/Logo';
import logoQuizotron from '../../assets/img/logoQuizotron.png';
import './styles.scss';

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //* STATE
  // Récupère les infos de l'utilisateur stocké dans les states du reducer user
  const email = useAppSelector((state) => state.user.credentials.email);
  const password = useAppSelector((state) => state.user.credentials.password);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  // Récupère les messages d'erreur suite requête POST du backend
  const errorMessages = useAppSelector((state) => state.user.errorMessages);
  // Stocke les messages d'erreur des inputs du formulaire suite aux vérifications frontend
  const [errorsLogin, setErrorsLogin] = useState<IerrorFormLogin>({
    email: '',
    password: '',
  });

  //* Vide les champs du formulaire et les messages d'erreur
  // Au chargement de la page, si l'utilisateur n'est pas connecté
  useEffect(() => {
    const handleClearInputsandErrors = () => {
      if (!isLogged) {
        dispatch(clearInputsAndErrors());
      }
    };
    handleClearInputsandErrors();
  }, [dispatch, isLogged]);

  //* Redirection vers la page profil, si l'utilisateur est connecté
  useEffect(() => {
    if (isLogged) {
      navigate('/profile');
    }
  }, [isLogged, navigate]);

  //* Met à jour le state avec la valeur des inputs du formulaire
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
    setErrorsLogin({ ...errorsLogin, [fieldName]: '' });
  };

  //* Envoi du formulaire au backend si aucune erreur
  const handleFormSubmit = () => {
    dispatch(login());
  };

  //* Vérification et autorisation de soumission du formulaire
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Données du state à valider avant envoi au backend
    const dataToValidate = { email, password };
    // Résultat de la validation des champs du formulaire
    const errors = validateTextFields(dataToValidate, validationRulesLogin);
    console.log('errors', errors);
    //TODO vérifer errors et le prevState copié dans le nouveau state?
      // Mise à jour du state avec les messages d'erreurs 
    setErrorsLogin((prevState) => ({ ...prevState, ...errors.errors }));
    // Autorisation de soumission du formulaire
    const isAllowToSubmit = !errors.hasError;
    if (isAllowToSubmit) {
      handleFormSubmit();
    }
  };

  return (
    <div className="login-page">
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
              className={`form__input ${errorsLogin.email !== '' ? 'error-input' : ''}`}
              value={email}
              onChange={handleChangeField}
              name="email"
            />
            {errorsLogin.email !== ''
            && (
            <div className="error-msg">
              {errorsLogin.email}
            </div>
            )}
            <label htmlFor="password" className="form__label">Mot de passe</label>
            <input
              type="password"
              placeholder="Mot de passe"
              className={`form__input ${errorsLogin.password !== '' ? 'error-input' : ''}`}
              value={password}
              onChange={handleChangeField}
              name="password"
            />
            {errorsLogin.password !== ''
            && (
            <div className="error-msg">
              {errorsLogin.password}
            </div>
            )}
            <button type="submit" className="form-login__button">
              Connexion
            </button>
            {errorMessages !== '' && <div className="error-message">{errorMessages}</div>}

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
