import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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

function Profil() {
  const dispatch = useAppDispatch();
  //* STATE
  // Récupère le pseudo de l'utilisateur connecté
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  // Ouvre et ferme la modale pour la confirmation de suppression d'un compte utilisateur
  const [showModalAccount, setShowModalAccount] = useState<boolean>(false);

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
  };

  return (
    <div className="profil">

      <h1 className="profil__title">
        {`Bienvenue sur ton profile ${pseudo}`}
      </h1>

      <div className="profil__settings">
        <NavLink to="/profile/quiz" className="profil__quiz">
          Gérer mes quiz
        </NavLink>
        <NavLink to="/profile/parametres" className="profil__update">
          Modifier mon compte
        </NavLink>
        <button type="button" className="profil__button profil__button__logout" onClick={handleLogout}>
          <NavLink to="/connexion">
            Déconnexion
          </NavLink>
        </button>

        <div>
          <button
            type="button"
            className="profil__button profil__button__delete"
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

  );
}

export default Profil;
