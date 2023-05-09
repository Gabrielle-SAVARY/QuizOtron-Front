import './index.scss';
import { MdEmail } from 'react-icons/md';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__contact">
        <div className="footer__contact-logo">
          <h3>LOGO Quiz&apos;O&apos;Tron</h3>
        </div>
        <div>
          <h3 className="footer__contact-title">Contact</h3>
          <div className="footer__contact-mail">
            <MdEmail />
            <p>contact@quizotron.com</p>
          </div>
        </div>
      </div>
      <div className="footer-dark">
        <div className="footer-dark__site-map">
          <ul className="footer-dark__nav-list">
            <li>
              <a href="/#" className="footer-dark__nav-item">
                À propos
              </a>
            </li>
            <li>
              <a href="/#" className="footer-dark__nav-item">
                Accueil
              </a>
            </li>
            <li>
              <a href="/#" className="footer-dark__nav-item">
                Liste des quiz
              </a>
            </li>
            <li>
              <a href="/#" className="footer-dark__nav-item">
                Connexion
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-dark__mentions">
          <div className="footer-dark__mention-list">
            <a href="/#" className="footer-dark__mention-item">
              Mentions Légales
            </a>
            <a href="/#" className="footer-dark__mention-item">
              Données personnelles
            </a>
            <a href="/#" className="footer-dark__mention-item">
              Cookie
            </a>
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
