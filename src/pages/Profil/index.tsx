import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './styles.scss';
import { deleteUser } from '../../store/reducers/user';
import { getUserDataFromLocalStorage } from '../../utils/user';

function Profil() {
  const dispatch = useAppDispatch();
  /*   const dataStorage = getUserDataFromLocalStorage(); */
  /*   console.log('dataStorage', dataStorage); */
  /*   const pseudo = dataStorage?.pseudo; */
  /*   console.log('pseudo', pseudo); */
  /*   const pseudo = useAppSelector((state) => state.user.credentials.pseudo); */

  const handleDeleteUser = () => {
    dispatch(deleteUser());
  };
  /*   ${pseudo} */
  return (
    <div className="profil">
      <p>
        {'Bienvenue sur ton profile '}
      </p>
      <button type="submit" className="profil__update">
        Modifier mon compte
      </button>
      <button type="submit" className="profil__delete" onClick={handleDeleteUser}>
        Supprimer mon compte
      </button>
    </div>

  );
}

export default Profil;
