import { useState, useEffect } from 'react';
import { FiAlignJustify } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import './index.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setScreenWidth, setToggleMenu } from '../../store/reducers/header';

function Header() {
/*   const [toggleMenu, setToggleMenu] = useState(false); */
  const dispatch = useAppDispatch();
  const toggleMenu = useAppSelector((state) => state.header.toggleMenu);
  const screenWidth = useAppSelector((state) => state.header.screenWidth);
  console.log('screenWidth', screenWidth);

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
      <h1 className="header__logo"><a href="/#">Quiz&apos;O&apos;Tron</a></h1>
      <nav className="header__nav">
        { /* affiche la liste: en mobile si menu hamburger est ouvert et desktop */}
        {(toggleMenu || screenWidth >= 992) && (
        <ul className="header__nav-list">
          <li className="header__nav-list__items"><a href="/#">Accueil</a></li>
          <li className="header__nav-list__items"><a href="/#">Liste des quiz</a></li>
        </ul>
        )}
        <button type="button" className="header__login">
          <FaRegUserCircle size={24} />
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
