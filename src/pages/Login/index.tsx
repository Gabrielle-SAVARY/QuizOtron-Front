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
import { validateFormFields } from '../../utils/validateFormField';
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
  const [errorInputMsg, setErrorInputMsg] = useState<IerrorFormLogin>({
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
    setErrorInputMsg({ ...errorInputMsg, [fieldName]: '' });
  };

  //* Envoi du formulaire au backend si aucune erreur
  const handleFormSubmit = (errors: { [key: string]: string }) => {
    // Renvoi un tableau contenant les clés (propriétés) de l'objet errors
    // et on vérifie sa longueur
    // Si vide alors pas d'erreur: faire la requête POST au backend
    if (Object.keys(errors).length === 0) {
      dispatch(login());
    }
  };

  //* Soumission du formulaire de connexion
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Données du state à valider avant envoi au backend
    const dataToValidate = { email, password };
    console.log('dataToValidate LOGIN', dataToValidate);

    // Résultat de la validation des champs du formulaire
    // errors: objet vide ou contient les messages d'erreurs
    const errors = validateFormFields(dataToValidate, validationRulesLogin);

    // Mise à jour du state avec les messages d'erreurs (asynchrone): affichage des erreurs frontend
    setErrorInputMsg((prevState) => ({ ...prevState, ...errors }));

    // Gère la soumission du formulaire
    handleFormSubmit(errors);
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
