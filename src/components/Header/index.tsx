import { useState, useEffect } from 'react';
import './styles.scss';
import { FiAlignJustify } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setScreenWidth, setIsToggleMenu } from '../../store/reducers/header';

function Header() {
  /*   const [isToggleMenu, setIsToggleMenu] = useState(false); */
  const dispatch = useAppDispatch();
  const isToggleMenu = useAppSelector((state) => state.header.isToggleMenu);
  const screenWidth = useAppSelector((state) => state.header.screenWidth);

  const isLogged = useAppSelector((state) => state.user.isLogged);

  // Met à jour le state de isToggleMenu si le menu hamburger est ouvert
  // au click sur button header__nav__toggle (toogle ouverture/fermeture)
  const changeToggleMenu = () => {
    dispatch(setIsToggleMenu(!isToggleMenu));
  };

  const handleScreenWidth = () => {
    dispatch(setScreenWidth(window.innerWidth));
    if (screenWidth > 992 && isToggleMenu) {
      dispatch(setIsToggleMenu(false));
    }
  };
  // écouteur d'évenement sur la fenêtre: permet de fermer le menu si fenetre redimensionnée
  window.addEventListener('resize', handleScreenWidth);

  return (
    <header className="header">
      <h1 className="header__logo"><NavLink to="/">Quiz&apos;O&apos;Tron</NavLink></h1>

      <nav className="header__nav">
        { /* affiche la liste: en mobile si menu hamburger est ouvert et desktop */}
        {(isToggleMenu || screenWidth >= 992) && (
          <ul className="header__nav-list">
            <li className="header__nav-list__items"><NavLink to="/">Accueil</NavLink></li>
            <li className="header__nav-list__items"><NavLink to="/quiz">Liste des quiz</NavLink></li>
          </ul>
        )}
        <button type="button" className="header__login">
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
          {/* mobile: change icon si menu est ouvert ou fermé: hamburger */}
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
/*          */
