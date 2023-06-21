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
  const classNameLinkBtn = isUserLogged ? 'header__link-btn__profile' : 'header__link-btn__login';
  //* Ajout de la classe active sur le lien de navigation cliqué
  const activeLink = ({ isActive }: ILink) => cn(classNameLinkBtn, {
    [`${classNameLinkBtn}--active`]: isActive,
  });

  const redirectLink = isUserLogged ? '/profile' : '/connexion';
  const asideTextLink = isUserLogged ? userPseudo : 'connexion';
  const styledIcon = { fontSize: '1.5rem', stroke: '1' };

  return (
    <NavLink to={redirectLink} className={activeLink}>

      <FiUser style={styledIcon} />
      <span className="header__link-btn-text">{asideTextLink}</span>

    </NavLink>
  );
}
export default ProfileLink;
