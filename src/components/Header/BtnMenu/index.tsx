import { FiAlignJustify } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import './styles.scss';

interface BtnMenuProps {
  isToggleMenu: boolean;
  changeToggleMenu: () => void;
}

function BtnMenu({ isToggleMenu, changeToggleMenu }: BtnMenuProps) {
  // Style des icones
  const styledIconMenu = {
    stroke: '#0d72da', strokeWidth: '1', height: '3em', width: '3em',
  };
  const styledIconCross = {
    stroke: '#0d72da', strokeWidth: '0.9', height: '3em', width: '3em',
  };

  // Change l'icone du menu hamburger
  const handleChangeToggleMenu = () => {
    changeToggleMenu();
  };

  return (
    <button type="button" className="header__nav__toggle" onClick={handleChangeToggleMenu}>
      {isToggleMenu
        ? <AiFillCloseCircle style={styledIconCross} />
        : <FiAlignJustify style={styledIconMenu} />}
    </button>
  );
}

export default BtnMenu;
