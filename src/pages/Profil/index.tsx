import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './styles.scss';

function Profil() {
  const dispatch = useAppDispatch();
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  return (
    <div className="profil">
      <p>
        {`Bienvenue sur ton profile ${pseudo}`}
      </p>
      <button type="submit" className="profil__delete">
        Supprimer mon compte
      </button>
    </div>

  );
}

export default Profil;
