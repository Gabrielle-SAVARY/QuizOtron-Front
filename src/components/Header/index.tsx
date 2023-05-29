import { AiFillCloseCircle } from 'react-icons/ai';
import PersonIcon from '@mui/icons-material/Person';
import { FiAlignJustify } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../hooks/redux';
import './styles.scss';

interface IMenuLink {
  isActive: boolean;
}

function Header() {
  // Vérifie si l'utilisateur est connecté
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  // Vérifie si le menu hamburger est ouvert
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  // Vérifie la largeur de l'écran
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  //* Ajout de la classe active sur le lien cliqué
  const menuLink = ({ isActive }: IMenuLink) => cn('header__nav-list__items-link', {
    'header__nav-list__items-link--active': isActive,
  });

  //* Fermeture du menu hamburger après click (écran mobile)
  const handleCloseToggleMenu = () => {
    setIsToggleMenu(false);
  };

  //* Toggle du menu hamburger (écran mobile)
  const changeToggleMenu = () => {
    setIsToggleMenu(!isToggleMenu);
  };
  //* Ferme le menu hamburger si redimension fenetre
  useEffect(() => {
    const handleScreenWidth = () => {
      setScreenWidth(window.innerWidth);
      if (screenWidth > 992 && isToggleMenu) {
        setIsToggleMenu(false);
      }
    };
    // Ajout écouteur d'évenement si la fenêtre est redimensionée par l'utilisateur
    window.addEventListener('resize', handleScreenWidth);

    // Cleanup fonction: suppression écouteur d'évenement
    return () => {
      window.removeEventListener('resize', handleScreenWidth);
    };
  }, [isToggleMenu, screenWidth]);

  return (
    <header className="header">
      <h1 className="header__logo"><NavLink to="/">Quiz&apos;O&apos;Tron</NavLink></h1>

      <nav className="header__nav">
        { /* affiche les items du menu: écran desktop + mobile hamburger ouvert */}
        {(isToggleMenu || screenWidth >= 992) && (
          <ul className="header__nav-list">
            <li className="header__nav-list__items"><NavLink to="/" className={menuLink} onClick={handleCloseToggleMenu}>Accueil</NavLink></li>
            <li className="header__nav-list__items"><NavLink to="/quiz" className={menuLink} onClick={handleCloseToggleMenu}>Liste des quiz</NavLink></li>
          </ul>
        )}

        { /* affiche icone profile si connecté sinon bouton connexion */}
        { isLogged
          ? (
            <button type="button" className="header__login-button">
              <NavLink to="/profile">
                <div className="header__login-button-icon">
                  <PersonIcon />
                  <span className="header__login-button-pseudo">{pseudo}</span>
                </div>
              </NavLink>
            </button>
          )
          : (
            <button type="button" className="header__login-button">
              <NavLink to="/connexion" className="header__login">
                Connexion
              </NavLink>
            </button>
          )}

        <button type="button" className="header__nav__toggle" onClick={changeToggleMenu}>
          {/* Change l'icone du menu mobile- fermé: hambuger / ouvert:croix  */}
          {!isToggleMenu ? <FiAlignJustify size={48} stroke="#fff" strokeWidth="1" />
            : (
              <AiFillCloseCircle size={48} stroke="#003051" strokeWidth="0.9" />
            )}
        </button>
      </nav>

    </header>
  );
}

export default Header;
