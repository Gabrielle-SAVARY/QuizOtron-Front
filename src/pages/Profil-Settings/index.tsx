import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  KeysOfCredentials,
  changeCredentialsField,
  update,
  updatePassword,
} from '../../store/reducers/user';
import './styles.scss';

function ProfilSettings() {
  const dispatch = useAppDispatch();
  //* STATE
  // Récupère les données de l'utilisateur connecté
  const email = useAppSelector((state) => state.user.credentials.email);
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  const password = useAppSelector((state) => state.user.credentials.password);
  // Récupère les valeurs des inputs convernés dans le formulaire
  const oldPassword = useAppSelector((state) => state.user.credentials.oldPassword);
  const passwordConfirm = useAppSelector((state) => state.user.credentials.passwordConfirm);
  // Toggle: pour afficher le formulaire pour changer de mot de passe
  const [isVisible, setIsVisible] = useState(false);

  //* Met à jour le state avec la valeur des inputs pour les 2 formulaires
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

  //* Action mise à jour des infos utilisateur: email et pseudo
  const handleUpdate = () => {
    dispatch(update());
  };
  //* Soumission du formulaire: mise à jour email et pseudo
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpdate();
  };

  //* Affiche le formulaire pour changer de mot de passe
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
    //* Action mise à jour du mot de passe
  const handleUpdatePassword = () => {
    dispatch(updatePassword());
  };
  //* Soumission du formulaire: mise à jour du passe
  const handleSubmitPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpdatePassword();
  };

  return (
    <div className="profil-settings">
      <p className="profil-settings__update">Mise à jour de votre profil</p>

      <form
        action="submit"
        className="form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Email"
          className="form__input"
          value={email}
          onChange={handleChangeField}
          name="email"
        />
        <input
          type="text"
          placeholder="Pseudo"
          className="form__input"
          value={pseudo}
          onChange={handleChangeField}
          name="pseudo"
        />
        <button type="submit" className="profil__update-user">
          Modifier mon profil
        </button>
      </form>
      <form
        action="submit"
        className="form"
        onSubmit={handleSubmitPassword}
      >
        <button type="button" className="profil__update-user-mdp" onClick={toggleVisibility}>
          Changer votre de mot de passe ?
        </button>
        {isVisible && (
          <div>
            <input
              type="password"
              placeholder="Ancien mot de passe"
              className="form__password"
              value={oldPassword}
              onChange={handleChangeField}
              name="oldPassword"
            />
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              className="form__password"
              value={password}
              onChange={handleChangeField}
              name="password"
            />
            <input
              type="password"
              placeholder="Confirmer le nouveau mot de passe"
              className="form__password"
              value={passwordConfirm}
              onChange={handleChangeField}
              name="passwordConfirm"
            />
            <button type="submit" className="profil__update-user">
              Modifier mon mot de passe
            </button>
          </div>
        )}

      </form>
    </div>
  );
}

export default ProfilSettings;
