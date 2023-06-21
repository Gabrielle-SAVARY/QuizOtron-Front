import { AiFillCloseCircle } from 'react-icons/ai';
import PersonIcon from '@mui/icons-material/Person';
import { FiAlignJustify } from 'react-icons/fi';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../hooks/redux';
import './styles.scss';
import Logo from '../Logo';
import ProfileLink from './ProfileLink';

interface IMenuLink {
  isActive: boolean;
}

function Header() {
  //* STATE
  // Vérifie si l'utilisateur est connecté
  const isLogged = useAppSelector((state) => state.user.isLogged);
  // Récupère le pseudo de l'utilisateur
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  // Vérifie si le menu hamburger est ouvert (écran <mobile></mobile>)
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  // Vérifie la largeur de l'écran
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  //* Ajout de la classe active sur le lien de navigation cliqué
  const menuLink = ({ isActive }: IMenuLink) => cn('header__nav-list__items-link', {
    'header__nav-list__items-link--active': isActive,
  });

  //* Fermeture du menu hamburger après click (écran mobile)
  const handleCloseToggleMenu = () => {
    setIsToggleMenu(false);
  };

  //* Toggle du menu hamburger: change l'icone (écran mobile)
  const changeToggleMenu = () => {
    setIsToggleMenu(!isToggleMenu);
  };
  //* Ferme le menu hamburger si redimension fenetre par utilisateur
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
      <div className="header__container">
        <Logo />
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-list__items"><NavLink to="/" className={menuLink} onClick={handleCloseToggleMenu}>Accueil</NavLink></li>
            <li className="header__nav-list__items"><NavLink to="/quiz" className={menuLink} onClick={handleCloseToggleMenu}>Liste des quiz</NavLink></li>
          </ul>
        </nav>

        <ProfileLink
          isUserLogged={isLogged}
          userPseudo={pseudo}
        />

      </div>

    </header>
  );
}

export default Header;
