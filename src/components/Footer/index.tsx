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
          <h3>Contact</h3>
          <div className="footer__contact-mail">
            <MdEmail />
            <p>contact@quizotron.com</p>
          </div>
        </div>
      </div>
      <div className="footer-dark">
        <div className="footer-dark__site-map">
          <ul className="site-map__nav-list">
            <li><a href="/#" className="a__text">À propos</a></li>
            <li><a href="/#" className="a__text">Accueil</a></li>
            <li><a href="/#" className="a__text">Liste des quiz</a></li>
            <li><a href="/#" className="a__text">Connexion</a></li>
          </ul>
        </div>
        <div className="footer-dark__mentions">
          <a href="/#" className="a__text">Mentions Légales</a>
          <a href="/#" className="a__text">Données personnelles</a>
          <a href="/#" className="a__text">Cookie</a>
          <div className="footer-dark__mentions-copyright">Quiz&apos;O&apos;Tron 2023 &copy;</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
