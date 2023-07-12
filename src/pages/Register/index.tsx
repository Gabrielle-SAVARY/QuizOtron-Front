import { NavLink } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  KeysOfCredentials,
  changeCredentialsField,
  register,
} from '../../store/reducers/user';
import Logo from '../../components/Logo';
import logoQuizotron from '../../assets/img/logoQuizotron.png';
import { IerrorFormRegister } from '../../@types/error';
import './styles.scss';
import { validateTextFields } from '../../utils/validateFormField';
import { validationRulesSignup } from '../../utils/validationsRules';

function Register() {
  const dispatch = useAppDispatch();
  //* STATE
  // Récupère les infos de l'utilisateur stocké dans les states du reducer user
  const email = useAppSelector((state) => state.user.credentials.email);
  const password = useAppSelector((state) => state.user.credentials.password);
  const passwordConfirm = useAppSelector((state) => state.user.credentials.passwordConfirm);
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  const firstname = useAppSelector((state) => state.user.credentials.firstname);
  const lastname = useAppSelector((state) => state.user.credentials.lastname);
  const isRegistered = useAppSelector((state) => state.user.isRegistered);
  // Récupère les messages d'erreur suite requête au backend
  const errorMessages = useAppSelector((state) => state.user.errorMessages);
  // Stocke les messages d'erreur des inputs du formulaire suite aux vérifications frontend
  const [errorsRegister, setErrorsRegister] = useState<IerrorFormRegister>({
    firstname: '',
    lastname: '',
    pseudo: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
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
    // Réinitialise le message d'erreur de l'input
    setErrorsRegister({ ...errorsRegister, [fieldName]: '' });
  };

  // Soumission du formulaire si aucune erreur
  const handleFormSubmit = (isAllowed:boolean) => {
    // Renvoi un tableau contenant les clés (propriétés) de l'objet errors
    // et on vérifie sa longueur
    // Si vide alors pas d'erreur: faire la requête POST au backend
    if (isAllowed) {
      dispatch(register());
    }
  };

  // Soumission du formulaire d'inscription
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Données du state à valider avant envoi au backend
    const dataToValidate = {
      firstname, lastname, email, pseudo, password, passwordConfirm,
    };

    // Résultat de la validation des champs du formulaire
    // errors: objet vide ou contient les messages d'erreurs
    const errors = validateTextFields(dataToValidate, validationRulesSignup);

    // Mise à jour du state avec les messages d'erreurs (asynchrone): affichage des erreurs frontend
    setErrorsRegister((prevState) => ({ ...prevState, ...errors.errors }));
    const isAllowToSubmit = !errors.hasError;
    // Gère la soumission du formulaire
    handleFormSubmit(isAllowToSubmit);
  };

  return (
    <div className="register-page">
      {isRegistered && (
      <div className="register-page__isLogged">
        <p>Vous êtes inscrit, veuillez vous connecter.</p>
        <p className="form__message">
          Déjà un compte?
          <NavLink to="/connexion" className="form__inscription">
            Connexion
          </NavLink>
        </p>
      </div>
      )}
      {!isRegistered && (
      <div className="register-page__wrapper">
        <form
          action="submit"
          className="form form-register"
          onSubmit={handleSubmit}
        >
          <Logo logoContainerClassName="form__container-logo" logoName={logoQuizotron} logoClassName="form__logo-img" />
          <label htmlFor="Prénom" className="form__label">Prénom</label>
          <input
            type="text"
            placeholder="Prénom"
            className={`form__input ${errorsRegister.firstname !== '' ? 'error-input' : ''}`}
            value={firstname}
            onChange={handleChangeField}
            name="firstname"
          />
          {errorsRegister.firstname !== ''
            && (
            <div className="error-msg">
              {errorsRegister.firstname}
            </div>
            )}
          <label htmlFor="Nom" className="form__label">Nom</label>
          <input
            type="text"
            placeholder="Nom"
            className={`form__input ${errorsRegister.lastname !== '' ? 'error-input' : ''}`}
            value={lastname}
            onChange={handleChangeField}
            name="lastname"
          />
          {errorsRegister.lastname !== ''
            && (
            <div className="error-msg">
              {errorsRegister.lastname}
            </div>
            )}
          <label htmlFor="Pseudo" className="form__label">Pseudo</label>
          <input
            type="text"
            placeholder="Pseudo"
            className={`form__input ${errorsRegister.pseudo !== '' ? 'error-input' : ''}`}
            value={pseudo}
            onChange={handleChangeField}
            name="pseudo"
          />
          {errorsRegister.pseudo !== ''
            && (
            <div className="error-msg">
              {errorsRegister.pseudo}
            </div>
            )}
          <label htmlFor="email" className="form__label">Email</label>
          <input
            type="email"
            placeholder="Email"
            className={`form__input ${errorsRegister.email !== '' ? 'error-input' : ''}`}
            value={email}
            onChange={handleChangeField}
            name="email"
          />
          {errorsRegister.email !== ''
            && (
            <div className="error-msg">
              {errorsRegister.email}
            </div>
            )}
          <label htmlFor="password" className="form__label">Mot de passe</label>
          <input
            type="password"
            placeholder="Mot de passe"
            className={`form__input ${errorsRegister.password !== '' ? 'error-input' : ''}`}
            value={password}
            onChange={handleChangeField}
            name="password"
          />
          {errorsRegister.password !== ''
            && (
            <div className="error-msg">
              {errorsRegister.password}
            </div>
            )}
          <label htmlFor="password" className="form__label">Confirmation du mot de passe</label>
          <input
            type="password"
            placeholder="Confirmation mot de passe"
            className={`form__input ${errorsRegister.passwordConfirm !== '' ? 'error-input' : ''}`}
            value={passwordConfirm}
            onChange={handleChangeField}
            name="passwordConfirm"
          />
          {errorsRegister.passwordConfirm !== ''
            && (
            <div className="error-msg">
              {errorsRegister.passwordConfirm}
            </div>
            )}

          {errorMessages !== '' && <div className="error-message">{errorMessages}</div>}
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
