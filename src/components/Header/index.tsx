import { useState, useEffect } from 'react';
import './styles.scss';
import { FiAlignJustify } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setScreenWidth, setToggleMenu } from '../../store/reducers/header';

function Header() {
  /*   const [toggleMenu, setToggleMenu] = useState(false); */
  const dispatch = useAppDispatch();
  const toggleMenu = useAppSelector((state) => state.header.toggleMenu);
  const screenWidth = useAppSelector((state) => state.header.screenWidth);

  const logged = useAppSelector((state) => state.user.logged);

  // Met à jour le state de toggleMenu si le menu hamburger est ouvert
  // au click sur button header__nav__toggle (toogle ouverture/fermeture)
  const changeToggleMenu = () => {
    dispatch(setToggleMenu(!toggleMenu));
  };

  const handleScreenWidth = () => {
    dispatch(setScreenWidth(window.innerWidth));
    if (screenWidth > 992 && toggleMenu) {
      dispatch(setToggleMenu(false));
    }
  };
  // écouteur d'évenement sur la fenêtre: permet de fermer le menu si fenetre redimensionnée
  window.addEventListener('resize', handleScreenWidth);

  return (
    <header className="header">
      <h1 className="header__logo"><NavLink to="/">Quiz&apos;O&apos;Tron</NavLink></h1>

      <nav className="header__nav">
        { /* affiche la liste: en mobile si menu hamburger est ouvert et desktop */}
        {(toggleMenu || screenWidth >= 992) && (
          <ul className="header__nav-list">
            <li className="header__nav-list__items"><NavLink to="/">Accueil</NavLink></li>
            <li className="header__nav-list__items"><NavLink to="/quiz">Liste des quiz</NavLink></li>
          </ul>
        )}
        <button type="button" className="header__login">
          <NavLink to="/profile">
            <FaRegUserCircle size={24} />
            {logged ? <p>Mon Profile</p> : ('')}
          </NavLink>
        </button>

        <button type="button" className="header__nav__toggle" onClick={changeToggleMenu}>
          {/* mobile: change icon si menu est ouvert ou fermé: hamburger */}
          {!toggleMenu ? <FiAlignJustify size={48} stroke="#fff" strokeWidth="1" />
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
