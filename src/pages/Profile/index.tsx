import { IoSettingsSharp } from 'react-icons/io5';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/reducers/user';
import './styles.scss';

interface ProfileProps {
  userAverageScore: number | null;
}

function Profile({ userAverageScore }: ProfileProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //* STATE
  // Récupère le pseudo de l'utilisateur connecté
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);

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
          <div className="profile__header">
            <div className="profile__header__user">
              <BsFillEmojiSmileFill style={{ fontSize: '66px', color: '#003051' }} />

              <h2 className="profile__header__user-pseudo">{pseudo}</h2>
              <Link to="/profil/parametres" className="profile__update" title="paramètres">
                <IoSettingsSharp style={{ fontSize: '36px', color: '#0d72da' }} />
              </Link>
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
            <Link to="/profil/quiz" className="profile__navigation-link">
              Gérer mes quiz
            </Link>
            <Link to="/profil/favoris" className="profile__navigation-link">
              Mes quiz favoris
            </Link>
            <Link to="/profil/historique" className="profile__navigation-link">
              Historique des scores
            </Link>
            <button type="button" className="profile__navigation__btn-log-out" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        </div>
      </div>

    </div>

  );
}

export default Profile;
