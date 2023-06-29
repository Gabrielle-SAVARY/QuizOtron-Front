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
  const [errorInputMsg, setErrorInputMsg] = useState<IerrorFormRegister>({
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
    setErrorInputMsg({ ...errorInputMsg, [fieldName]: '' });
  };

  // Soumission du formulaire si aucune erreur
  const handleFormSubmit = (errors: { [key: string]: string }) => {
    // Renvoi un tableau contenant les clés (propriétés) de l'objet errors
    // et on vérifie sa longueur
    // Si vide alors pas d'erreur: faire la requête POST au backend
    if (Object.keys(errors).length === 0) {
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
    console.log('dataToValidate REGISTER', dataToValidate);

    // Résultat de la validation des champs du formulaire
    // errors: objet vide ou contient les messages d'erreurs
    const errors = validateTextFields(dataToValidate, validationRulesSignup);

    // Mise à jour du state avec les messages d'erreurs (asynchrone): affichage des erreurs frontend
    setErrorInputMsg((prevState) => ({ ...prevState, ...errors }));
    // Gère la soumission du formulaire
    handleFormSubmit(errors);
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
            className={`form__input ${errorInputMsg.firstname !== '' ? 'error-input' : ''}`}
            value={firstname}
            onChange={handleChangeField}
            name="firstname"
          />
          {errorInputMsg.firstname !== ''
            && (
            <div className="error-msg">
              {errorInputMsg.firstname}
            </div>
            )}
          <label htmlFor="Nom" className="form__label">Nom</label>
          <input
            type="text"
            placeholder="Nom"
            className={`form__input ${errorInputMsg.lastname !== '' ? 'error-input' : ''}`}
            value={lastname}
            onChange={handleChangeField}
            name="lastname"
          />
          {errorInputMsg.lastname !== ''
            && (
            <div className="error-msg">
              {errorInputMsg.lastname}
            </div>
            )}
          <label htmlFor="Pseudo" className="form__label">Pseudo</label>
          <input
            type="text"
            placeholder="Pseudo"
            className={`form__input ${errorInputMsg.pseudo !== '' ? 'error-input' : ''}`}
            value={pseudo}
            onChange={handleChangeField}
            name="pseudo"
          />
          {errorInputMsg.pseudo !== ''
            && (
            <div className="error-msg">
              {errorInputMsg.pseudo}
            </div>
            )}
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
          <label htmlFor="password" className="form__label">Confirmation du mot de passe</label>
          <input
            type="password"
            placeholder="Confirmation mot de passe"
            className={`form__input ${errorInputMsg.passwordConfirm !== '' ? 'error-input' : ''}`}
            value={passwordConfirm}
            onChange={handleChangeField}
            name="passwordConfirm"
          />
          {errorInputMsg.passwordConfirm !== ''
            && (
            <div className="error-msg">
              {errorInputMsg.passwordConfirm}
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
