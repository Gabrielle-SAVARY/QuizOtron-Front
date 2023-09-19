import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  KeysOfUpdateCredentials,
  updateProfilField,
  update,
  updatePassword,
} from '../../store/reducers/user';
import BtnExit from '../../components/BtnExit';
import { validateTextFields } from '../../utils/validateFormField';
import { validationRulesPasswordUpdate, validationRulesUserUpdate } from '../../utils/validationsRules';
import { IerrorFormUserUpdate } from '../../@types/error';
import './styles.scss';

function ProfileSettings() {
  const dispatch = useAppDispatch();
  //* STATE
  const emailUpdate = useAppSelector((state) => state.user.updateCredentials.emailUpdate);
  const pseudoUpdate = useAppSelector((state) => state.user.updateCredentials.pseudoUpdate);
  const password = useAppSelector((state) => state.user.updateCredentials.password);
  const oldPassword = useAppSelector((state) => state.user.updateCredentials.oldPassword);
  const passwordConfirm = useAppSelector((state) => state.user.updateCredentials.passwordConfirm);
  // Récupère les messages d'erreur suite requête au backend
  const errorMessages = useAppSelector((state) => state.user.errorMessages);
  // Récupère le message de succès de la requête backend
  const successMessage = useAppSelector((state) => state.user.successMessage);
  // Toggle: pour afficher le formulaire pour changer de mot de passe
  const [isVisible, setIsVisible] = useState(false);

  // Stocke les messages d'erreur des inputs des formulaires suite aux vérifications frontend
  const [errorsUserUpdate, setErrorsUserUpdate] = useState<IerrorFormUserUpdate>({
    emailUpdate: '',
    pseudoUpdate: '',
    oldPassword: '',
    password: '',
    passwordConfirm: '',
  });

  //* Met à jour le state avec la valeur des inputs pour les 2 formulaires
  const handleChangeField = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    // récupère name de l'input et le type de la donnée
    const fieldName = event.target.name as KeysOfUpdateCredentials;
    dispatch(
      updateProfilField({
        propertyUpdate: fieldName,
        value: newValue,
      }),
    );
    // Réinitialise le message d'erreur de l'input
    if (errorsUserUpdate[fieldName] !== '') {
      setErrorsUserUpdate({ ...errorsUserUpdate, [fieldName]: '' });
    }
  };

  //* Soumission du formulaire mise à jour des infos utilisateur: email et pseudo
  const handleUpdate = () => {
    dispatch(update());
  };
  //* Vérification et autorisation de soumission du formulaire
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Données du state à valider avant envoi au backend
    const dataToValidate = { emailUpdate, pseudoUpdate };
    console.log('dataToValidate', dataToValidate);
    // Résultat de la validation des champs du formulaire
    const errors = validateTextFields(dataToValidate, validationRulesUserUpdate);
    console.log('errors', errors.errors);
    // Mise à jour du state avec les messages d'erreurs (asynchrone): affichage des erreurs frontend
    setErrorsUserUpdate((prevState) => ({
      ...prevState,
      emailUpdate: errors.errors.emailUpdate,
      pseudoUpdate: errors.errors.pseudoUpdate,
    }));
    // Autorisation de soumission du formulaire
    const isAllowToSubmit = !errors.hasError;
    console.log('isAllowToSubmit', isAllowToSubmit);
    if (isAllowToSubmit) {
      handleUpdate();
    }
  };

  //* Affiche le formulaire pour changer de mot de passe
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
    //* Soumission du formulaire: mise à jour du mot de passe
  const handleUpdatePassword = () => {
    dispatch(updatePassword());
  };
  //* Vérification et autorisation de soumission du formulaire
  const handleSubmitPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Données du state à valider avant envoi au backend
    const passwordsToValidate = { oldPassword, password, passwordConfirm };
    // Résultat de la validation des champs du formulaire
    const errors = validateTextFields(passwordsToValidate, validationRulesPasswordUpdate);
    // Mise à jour du state avec les messages d'erreurs
    setErrorsUserUpdate((prevState) => ({
      ...prevState,
      oldPassword: errors.errors.oldPassword,
      password: errors.errors.password,
      passwordConfirm: errors.errors.passwordConfirm,
    }));
    // Vérification que le nouveau mot de passe et sa confirmation sont identiques
    if (password !== passwordConfirm) {
      setErrorsUserUpdate((prevState) => ({
        ...prevState,
        password: 'Le nouveau mot de passe et sa confirmation ne sont pas identiques',
        passwordConfirm: 'Le nouveau mot de passe et sa confirmation ne sont pas identiques',
      }));
      errors.hasError = true;
    }
    // Autorisation de soumission du formulaire
    const isAllowToSubmit = !errors.hasError;
    if (isAllowToSubmit) {
      handleUpdatePassword();
    }
  };

  return (
    <div className="profil-settings">
      <div className="profil-settings__header">
        <BtnExit redirectionLink="/profil" />
        <h2 className="profil-settings__header-title profile-page-title">Mise à jour du profil</h2>
      </div>
      {successMessage !== ''
        && (
        <div className="success-message">
          {successMessage}
        </div>
        )}
      <form
        action="submit"
        className="profil-settings__form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="" className="profil-settings__form-label">Email</label>
        <input
          type="email"
          placeholder="Email"
          className={`profil-settings__form-input ${errorsUserUpdate.emailUpdate !== '' ? 'error-input' : ''}`}
          value={emailUpdate}
          onChange={handleChangeField}
          name="emailUpdate"
        />
        {errorsUserUpdate.emailUpdate !== ''
            && (
            <div className="error-msg">
              {errorsUserUpdate.emailUpdate}
            </div>
            )}
        <label htmlFor="" className="profil-settings__form-label">Pseudo</label>
        <input
          type="text"
          placeholder="Pseudo"
          className={`profil-settings__form-input ${errorsUserUpdate.pseudoUpdate !== '' ? 'error-input' : ''}`}
          value={pseudoUpdate}
          onChange={handleChangeField}
          name="pseudoUpdate"
        />
        {errorsUserUpdate.pseudoUpdate !== ''
         && (
         <div className="error-msg">
           {errorsUserUpdate.pseudoUpdate}
         </div>
         )}
        <button type="submit" className="profil-settings__form__btn-submit">
          Modifier mes informations
        </button>
      </form>

      <button type="button" className="profil-settings__toggle" onClick={toggleVisibility}>
        Changer votre de mot de passe ?
      </button>
      <form
        action="submit"
        className="profil-settings__form"
        onSubmit={handleSubmitPassword}
      >
        {isVisible && (
          <div>
            <label htmlFor="" className="profil-settings__form-label">Ancien mot de passe</label>
            <input
              type="password"
              placeholder="Ancien mot de passe"
              className={`profil-settings__form-input ${errorsUserUpdate.oldPassword !== '' ? 'error-input' : ''}`}
              value={oldPassword}
              onChange={handleChangeField}
              name="oldPassword"
            />
            {errorsUserUpdate.oldPassword !== ''
              && (
              <div className="error-msg">
                {errorsUserUpdate.oldPassword}
              </div>
              )}
            <label htmlFor="" className="profil-settings__form-label">Nouveau mot de passe</label>
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              className={`profil-settings__form-input ${errorsUserUpdate.password !== '' ? 'error-input' : ''}`}
              value={password}
              onChange={handleChangeField}
              name="password"
            />
            {errorsUserUpdate.password !== ''
              && (
                <div className="error-msg">
                  {errorsUserUpdate.password}
                </div>
              )}
            <label htmlFor="" className="profil-settings__form-label">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              placeholder="Confirmer le nouveau mot de passe"
              className={`profil-settings__form-input ${errorsUserUpdate.passwordConfirm !== '' ? 'error-input' : ''}`}
              value={passwordConfirm}
              onChange={handleChangeField}
              name="passwordConfirm"
            />
            {errorsUserUpdate.passwordConfirm !== ''
              && (
                <div className="error-msg">
                  {errorsUserUpdate.passwordConfirm}
                </div>
              )}
            <button type="submit" className="profil-settings__form__btn-submit">
              Modifier mon mot de passe
            </button>
          </div>
        )}
      </form>
      {errorMessages !== ''
       && (
       <div className="error-message">
         {errorMessages}
       </div>
       )}
    </div>
  );
}

export default ProfileSettings;
