import { useState, useEffect } from 'react';
import './index.scss';
import { FiAlignJustify } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  console.log('toggleMenu', toggleMenu);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  console.log('screenWidth', screenWidth);

  // Met à jour le state de toggleMenu si le menu hamburger est ouvert (toogle ouverture/fermeture)
  const changeToggleMenu = () => {
    setToggleMenu(!toggleMenu);
    console.log('setToggleMenu', toggleMenu);
  };

  // Met à jour le state de toggleMenu à false: screen mobile et menu hamburger ouvert
  // En cas de passage d'une screen large vers mobile: toggleMenu sera fermé par defaut
  useEffect(() => {
    if (screenWidth > 767 && toggleMenu) {
      console.log('screenWidth.width', screenWidth);
      setToggleMenu(false);
    }
  }, [screenWidth, toggleMenu]);

  // Met à jour le state de screenWidth si la largeur de la fenêtre se modifie
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
      console.log('setScreenWidth window.innerWidth', window.innerWidth);
    };
      // écouteur d'évenement sur la fenêtre qui déclenche fonction callback pour MAJ du state
    window.addEventListener('resize', changeWidth);

    // cleanup function: supprimer écouteur d'évenement
    // permet de ne pas mettre à jour le state si composant non existant ou non disponible
    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []);

  return (
    <header className="header">
      <nav className="header__nav">

        <ul className="header__nav-list">
          <li className="header__nav-list__items"><a href="/#">Accueil</a></li>
          <li className="header__nav-list__items"><a href="/#">Liste des quiz</a></li>
        </ul>
        <button type="button" className="header__nav__toggle" onClick={changeToggleMenu}>

          {!toggleMenu ? <FiAlignJustify size={48} stroke="#fff" strokeWidth="1" />
            : (
              <AiFillCloseCircle size={48} stroke="#003051" strokeWidth="1" />
            )}
        </button>
      </nav>

    </header>
  );
}

export default Header;
/*         <a href="/#" className="header__nav__logo"><h1>Quiz&apos;O&apos;Tron</h1></a> */
/*         <button type="button" className="header__login"><FaRegUserCircle size={30} /></button> */
