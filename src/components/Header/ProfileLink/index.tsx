import { NavLink } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import cn from 'classnames';
import './styles.scss';

interface ProfileBtnProps {
  isUserLogged: boolean;
  userPseudo: string;
}
interface ILink {
  isActive: boolean;
}
// mobile: utilisateur est connecté: affiche bouton icone avec pseudo sinon affiche bouton connexion
// PC: utlisateur est connecté: affiche bouton avec icone + pseudo sinon affiche bouton connexion
function ProfileLink({ isUserLogged, userPseudo }: ProfileBtnProps) {
  //* En fonction du statut de l'utilisateur: connecté ou non
  // Classe du lien
  const classNameLinkBtn = isUserLogged ? 'header__link-btn__profile' : 'header__link-btn__login';
  // redirection vers une route
  const redirectLink = isUserLogged ? '/profile' : '/connexion';
  // Texte acoller à l'icone
  const asideTextLink = isUserLogged ? userPseudo : 'connexion';

  //* Ajout de la classe active sur la classe du lien cliqué
  const activeLink = ({ isActive }: ILink) => cn(classNameLinkBtn, {
    [`${classNameLinkBtn}--active`]: isActive,
  });

  // Style de l'icone
  const styledIcon = { fontSize: '1.5rem', stroke: '1' };

  return (
    <NavLink to={redirectLink} className={activeLink}>
      <FiUser style={styledIcon} />
      <span className="header__link-btn-text">{asideTextLink}</span>
    </NavLink>
  );
}
export default ProfileLink;
