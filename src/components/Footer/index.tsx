import { NavLink } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { useAppSelector } from '../../hooks/redux';
import Logo from '../Logo';
import logoQuizotronWhite from '../../assets/img/logo_quizotron_white.png';
import './styles.scss';

function Footer() {
  // Vérifie si l'utilisateur est connecté
  const isLogged = useAppSelector((state) => state.user.isLogged);
  return (
    <footer className="footer">
      <div className="footer__contact">
        <div className="footer__contact-seo">
          <Logo
            logoContainerClassName="footer__contact-seo__logo"
            logoName={logoQuizotronWhite}
            logoClassName="footer__contact-seo__logo-img"
          />
          <p className="footer__contact-seo__text">Amusez-vous en répondant à nos quiz ou en créant vos propres quiz !</p>
        </div>

        <div className="footer__contact-mail">
          <h3 className="footer__contact-mail__title">Contact</h3>
          <div className="footer__contact-mail__email">
            <MdEmail />
            <a href="mailto:contact@quizotron.com" className="footer__contact-mail-text">contact@quizotron.com</a>
          </div>
        </div>

      </div>
      <div className="footer-dark">
        <div className="footer-dark__site-map">
          <ul className="footer-dark__nav-list">
            <li>
              <NavLink to="/a-propos" className="footer-dark__nav-item">
                À propos
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="footer-dark__nav-item">
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to="/liste-quiz" className="footer-dark__nav-item">
                Liste des quiz
              </NavLink>
            </li>
            <li>
              {!isLogged && (
              <NavLink to="/connexion" className="footer-dark__nav-item">
                Connexion
              </NavLink>
              )}
              {isLogged && (
              <NavLink to="/profil" className="footer-dark__nav-item">
                Profil
              </NavLink>
              )}
            </li>
          </ul>
        </div>
        <div className="footer-dark__mentions">
          <div className="footer-dark__mention-list">
            <NavLink to="/mentions-legales" className="footer-dark__mention-item">
              Mentions Légales
            </NavLink>
            <NavLink to="/politique-confidentialite" className="footer-dark__mention-item">
              Politique de confidentialité
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
