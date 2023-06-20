import { GiCandleFlame } from 'react-icons/gi';
import logo from '../../assets/img/logo.png';
import './styles.scss';

function Logo() {
  return (
    <div className="header__logo">
      <div className="header__logo-img"><GiCandleFlame /></div>
      {/*       <img src={logo} alt="Logo quiz o tron" className="header__logo-img" /> */}
      <h1 className="header__logo-text">Quiz&apos;O&apos;Tron</h1>
    </div>
  );
}

export default Logo;
