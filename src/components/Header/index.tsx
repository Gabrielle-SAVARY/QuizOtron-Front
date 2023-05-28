import { AiFillCloseCircle } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
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
  // Vérifie si le menu hamburger est ouvert
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  // Vérifie la largeur de l'écran
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  //* Ajout de la classe active sur le lien cliqué
  const menuLink = ({ isActive }: IMenuLink) => cn('header__nav-list__items', {
    'header__nav-list__items--active': isActive,
  });

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
            <li><NavLink to="/" className={menuLink}>Accueil</NavLink></li>
            <li><NavLink to="/quiz" className={menuLink}>Liste des quiz</NavLink></li>
          </ul>
        )}
        <button type="button" className="header__login">
          { /* affiche icone profile si connecté sinon bouton connexion */}
          { isLogged
            ? (
              <NavLink to="/profile">
                <FaRegUserCircle size={24} />
              </NavLink>
            )
            : (
              <NavLink to="/connexion" className="header__button-connexion">
                Connexion
              </NavLink>
            )}
        </button>

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
