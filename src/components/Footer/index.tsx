import { NavLink } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import Logo from '../Logo';
import logoQuizotronWhite from '../../assets/img/logo_quizotron_white.png';
import './styles.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__contact">
        <Logo logoContainerClassName="footer__contact-logo" logoName={logoQuizotronWhite} logoClassName="footer__contact-logo-img" />
        <div>
          <h3 className="footer__contact-title">Contact</h3>
          <div className="footer__contact-mail">
            <MdEmail />
            <a href="mailto:contact@quizotron.com" className="footer__contact-mail-text">contact@quizotron.com</a>
          </div>
        </div>
      </div>
      <div className="footer-dark">
        <div className="footer-dark__site-map">
          <ul className="footer-dark__nav-list">
            <li>
              <NavLink to="/apropos" className="footer-dark__nav-item">
                À propos
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="footer-dark__nav-item">
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to="/quiz" className="footer-dark__nav-item">
                Liste des quiz
              </NavLink>
            </li>
            <li>
              <NavLink to="/connexion" className="footer-dark__nav-item">
                Connexion
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-dark__mentions">
          <div className="footer-dark__mention-list">
            <NavLink to="/mentions-legales" className="footer-dark__mention-item">
              Mentions Légales
            </NavLink>
            <NavLink to="/donnees-personnelles" className="footer-dark__mention-item">
              Données personnelles
            </NavLink>
            <NavLink to="/cookie" className="footer-dark__mention-item">
              Cookie
            </NavLink>
          </div>
          <div className="footer-dark__mentions-copyright">
            Quiz&apos;O&apos;Tron 2023 &copy;
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
