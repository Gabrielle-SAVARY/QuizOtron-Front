import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  KeysOfCredentials,
  changeCredentialsField,
  update,
} from '../../store/reducers/user';
import './styles.scss';

function ProfilSettings() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.user.credentials.email);
  const password = useAppSelector((state) => state.user.credentials.password);
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);

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
  const handleUpdate = () => {
    dispatch(update());
  };

  // Soumission du formulaire
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpdate();
  };
  return (
    <div>
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
        onSubmit={handleSubmit}
      >
        <button type="button" className="profil__update-user" onClick={toggleVisibility}>
          Changer de mot de passe
        </button>
        {isVisible && (
        <div>
          <input
            type="password"
            placeholder="Ancien mot de passe"
            className="form__password"
            value={password}
            onChange={handleChangeField}
            name="password"
          />
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            className="form__password"
            name="password"
          />
          <input
            type="password"
            placeholder="Confirmation nouveau mot de passe"
            className="form__password"
            name="passwordConfirm"
          />
        </div>
        )}

        <button type="submit" className="profil__update-user">
          Modifier mon mot de passe
        </button>
      </form>
    </div>
  );
}

export default ProfilSettings;
