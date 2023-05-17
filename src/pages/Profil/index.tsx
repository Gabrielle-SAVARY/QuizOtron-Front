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
      <p>
        {`Bienvenue sur ton profile  ${pseudo}`}
      </p>
      <NavLink to="/profile/parametres">
        <button type="submit" className="profil__update">
          Modifier mon compte
        </button>
      </NavLink>
      <NavLink to="/connexion">
        <button type="button" className="login-page__button" onClick={handleLogout}>
          Déconnexion
        </button>
      </NavLink>
      <button type="submit" className="profil__delete" onClick={handleDeleteUser}>
        Supprimer mon compte
      </button>
    </div>

  );
}

export default Profil;
