import { NavLink, useNavigate } from 'react-router-dom';
import {
  ChangeEvent, FormEvent, useState, useEffect,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  KeysOfCredentials,
  changeCredentialsField,
  register,
} from '../../store/reducers/user';
import { validateTextFields } from '../../utils/validateFormField';
import { validationRulesSignup } from '../../utils/validationsRules';
import { IerrorFormRegister } from '../../@types/error';
import Logo from '../../components/Logo';
import logoQuizotron from '../../assets/img/logoQuizotron.png';
import './styles.scss';

function Register() {
  const navigate = useNavigate();
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

  // //* Redirection vers la page connexion, si inscription réussie
  useEffect(() => {
    if (isRegistered) {
      navigate('/connexion');
    }
  }, [isRegistered, navigate]);

  //* Met à jour le state avec la valeur des inputs du formulaire
  const handleChangeField = (event: ChangeEvent<HTMLInputElement>): void => {
    // Récupère la valeur et le name de l'input puis on type la donnée
    const newValue = event.target.value;
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

  //* Soumission du formulaire
  const handleFormSubmit = () => {
    dispatch(register());
  };

  //* Vérification et autorisation de soumission du formulaire
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Données du state à valider avant envoi au backend
    const dataToValidate = {
      firstname, lastname, email, pseudo, password, passwordConfirm,
    };
    // Résultat de la validation des champs du formulaire
    const registerForm = validateTextFields(dataToValidate, validationRulesSignup);
    const errors :IerrorFormRegister = {
      firstname: registerForm.errors.firstname,
      lastname: registerForm.errors.lastname,
      email: registerForm.errors.email,
      pseudo: registerForm.errors.pseudo,
      password: registerForm.errors.password,
      passwordConfirm: registerForm.errors.passwordConfirm,
    };
    // Mise à jour du state avec les messages d'erreurs
    setErrorsRegister(errors);
    // Vérification que le nouveau mot de passe et sa confirmation sont identiques
    if (password !== passwordConfirm) {
      setErrorsRegister((prevState) => ({
        ...prevState,
        password: 'Le nouveau mot de passe et sa confirmation ne sont pas identiques',
        passwordConfirm: 'Le nouveau mot de passe et sa confirmation ne sont pas identiques',
      }));
      registerForm.hasError = true;
    }
    // Autorisation de soumission du formulaire
    const isAllowToSubmit = !registerForm.hasError;
    if (isAllowToSubmit) {
      handleFormSubmit();
    }
  };

  return (
    <div className="register-page">
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

    </div>
  );
}

export default Register;
