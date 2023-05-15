import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './styles.scss';
import { deleteUser } from '../../store/reducers/user';

function Profil() {
  const dispatch = useAppDispatch();
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);

  const handleDeleteUser = () => {
    dispatch(deleteUser());
  };

  return (
    <div className="profil">
      <p>
        {`Bienvenue sur ton profile ${pseudo}`}
      </p>
      <button type="submit" className="profil__delete" onClick={handleDeleteUser}>
        Supprimer mon compte
      </button>
    </div>

  );
}

export default Profil;
