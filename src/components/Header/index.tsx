import { useState } from 'react';
import './index.scss';
import { FiAlignJustify, FiXCircle } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  console.log('toggleMenu', toggleMenu);

  const changeToggleMenu = () => {
    setToggleMenu(!toggleMenu);
    console.log('setToggleMenu', toggleMenu);
  };

  return (
    <header className="header">
      <div className="header__content">

        <nav className="header__content__nav">
          <ul className="header__content__nav-list">
            <li className="header__content__nav-list__items"><a href="/#">Accueil</a></li>
            <li className="header__content__nav-list__items"><a href="/#">Liste des quiz</a></li>
          </ul>
          <button type="button" className="header__content__toggle" onClick={changeToggleMenu}>

            {!toggleMenu ? <FiAlignJustify size={48} stroke="#fff" strokeWidth="1" />
              : (
                <FiXCircle size={48} stroke="#fff" strokeWidth="1" />
              )}
          </button>
        </nav>

      </div>

    </header>
  );
}

export default Header;

/*         <a href="/#" className="header__content__logo"><h1>Quiz&apos;O&apos;Tron</h1></a> */
/*         <button type="button" className="header__content__login"><FaRegUserCircle size={30} /></button> */
