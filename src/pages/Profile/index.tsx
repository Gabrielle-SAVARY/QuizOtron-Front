import { useState } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteUser, logout } from '../../store/reducers/user';
import './styles.scss';

interface ProfileProps {
  userAverageScore: number | null;
}

function Profile({ userAverageScore }: ProfileProps) {
  const dispatch = useAppDispatch();
  //* STATE
  // Récupère le pseudo de l'utilisateur connecté
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  // Ouvre et ferme la modale pour la confirmation de suppression d'un compte utilisateur
  const [showModalAccount, setShowModalAccount] = useState<boolean>(false);
  const navigate = useNavigate();

  //* Ouvre la modale de confirmation pour la suppression d'un compte utilisateur
  const handleOpenModalAccount = () => {
    setShowModalAccount(true);
  };

  //* Ferme la modale de confirmation pour la suppression d'un quiz
  const handleCloseModalAccount = () => {
    setShowModalAccount(false);
  };
  //* Supprime le compte utilisateur
  const handleDeleteUser = () => {
    dispatch(deleteUser());
  };

  //*  Déconnexion utilisateur
  const handleLogout = () => {
    dispatch(logout());
    navigate('/connexion');
  };

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__title profile-page-title">
          Bienvenue sur ton profil
        </h1>
        <div className="profile__container">
          <div className="profile__header">
            <div className="profile__header__user">
              <h2 className="profile__header__user-pseudo">{pseudo}</h2>
              <NavLink to="/profil/parametres" className="profile__update" title="paramètres">
                <IoSettingsSharp style={{ fontSize: '36px', color: '#0d72da' }} />
              </NavLink>
            </div>
            <div className="profile__header__score">
              <p>
                Moyenne des scores :
              </p>
              <p className="profile__header__score-average">
                {userAverageScore}
                /10
              </p>
            </div>
          </div>
          <div className="profile__navigation">
            <NavLink to="/profil/quiz" className="profile__navigation-link">
              {'Gérer mes quiz >'}
            </NavLink>
            <NavLink to="/profil/favoris" className="profile__navigation-link">
              {'Mes quiz favoris >'}
            </NavLink>
            <NavLink to="/profil/historique" className="profile__navigation-link">
              {'Mon historique >'}
            </NavLink>
            <button type="button" className="profile__navigation__btn-log-out" onClick={handleLogout}>
              Déconnexion
            </button>
            <button
              type="button"
              className="profile__quiz profile__quiz--delete"
              onClick={handleOpenModalAccount}
            >
              Supprimer mon compte
            </button>
            <Dialog
              open={showModalAccount}
              onClose={handleCloseModalAccount}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>Voulez-vous vraiment supprimer votre compte ?</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description2">
                  Attention cette action est irréversible
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModalAccount} variant="contained">Annuler</Button>
                <Button
                  endIcon={<DeleteIcon />}
                  onClick={handleDeleteUser}
                  variant="contained"
                  color="error"
                >
                  Supprimer
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>

    </div>

  );
}

export default Profile;
