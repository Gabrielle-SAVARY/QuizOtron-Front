import { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
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
        <h1 className="profile__title">
          Bienvenue sur ton profil
        </h1>
        <div className="profile__container">
          <div className="profile__user">
            <div className="profile__user-stat">
              <h2 className="profile__user-title">{pseudo}</h2>
              <NavLink to="/profil/parametres" className="profile__update">
                <IoSettingsOutline style={{ fontSize: '34px', color: 'white' }} />
              </NavLink>
            </div>
            <p>
              Moyenne des scores :
            </p>
            <p className="profile__score">
              {userAverageScore}
              /10
            </p>
          </div>
          <div className="profile__settings">
            <NavLink to="/profil/quiz" className="profile__quiz">
              {'Gérer mes quiz >'}
            </NavLink>
            <NavLink to="/profil/favoris" className="profile__quiz">
              {'Mes quiz favoris >'}
            </NavLink>
            <NavLink to="/profil/historique" className="profile__quiz">
              {'Mon historique >'}
            </NavLink>
            <button type="button" className="profile__quiz--disconnect btn-primary" onClick={handleLogout}>
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
