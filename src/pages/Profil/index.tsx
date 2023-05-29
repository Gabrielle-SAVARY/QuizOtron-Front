import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './styles.scss';
import { deleteUser, logout } from '../../store/reducers/user';

function Profil() {
  const dispatch = useAppDispatch();
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);

  const handleDeleteUser = () => {
    dispatch(deleteUser());
  };

  // Déconnexion utilisateur
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="profil">

      <h1 className="profil__title">
        {`Bienvenue sur ton profile ${pseudo}`}
      </h1>

      <div className="profil__settings">
        <NavLink to="/profile/parametres" className="profil__update">
          Modifier mon compte
        </NavLink>
        <button type="button" className="profil__button profil__button__logout" onClick={handleLogout}>
          <NavLink to="/connexion">
            Déconnexion
          </NavLink>
        </button>
        <button type="button" className="profil__button profil__button__delete" onClick={handleDeleteUser}>
          Supprimer mon compte
        </button>
        <NavLink to="/profile/quiz" className="profil__quiz">
          Gérer mes quiz
        </NavLink>

      </div>

    </div>

  );
}

export default Profil;
