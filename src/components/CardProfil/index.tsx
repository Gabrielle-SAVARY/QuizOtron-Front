import WorkIcon from '@mui/icons-material/Work';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './styles.scss';

interface CardProfilProps {
  imgProfil: string;
  imgAlt: string;
  name: string;
  teamRole: string;
  otherRole: string;
  linkLinkedin: string;
  linkPortfolio: string;
  linkGithub: string;
}

function CardProfil(props: CardProfilProps) {
  const {
    imgProfil, imgAlt, name, teamRole, otherRole, linkLinkedin, linkPortfolio, linkGithub,
  } = props;
  return (
    <div className="team-card">
      <div className="team-card__header">
        <img src={imgProfil} alt={imgAlt} className="team-card__header-img" />
      </div>
      <div className="team-card__body">
        <p className="team-card__body-name">{name}</p>
        <div className="team-card__body-roles">
          <p className="team-card__body-roles__role">{teamRole}</p>
          <p className="team-card__body-roles__other-role">{otherRole}</p>
        </div>
      </div>
      <div className="team-card__footer">
        <ul className="team-card__contact">
          <li className="team-card__footer__contact-linkedin"><a href={linkLinkedin} target="_blank" rel="noreferrer"><LinkedInIcon sx={{ color: 'white' }} /></a></li>
          <li className="team-card__portfolio"><a href={linkPortfolio} target="_blank" rel="noreferrer"><WorkIcon sx={{ color: 'white' }} /></a></li>
          <li className="team-card__github"><a href={linkGithub} target="_blank" rel="noreferrer"><GitHubIcon sx={{ color: 'white' }} /></a></li>
        </ul>
      </div>
    </div>
  );
}

export default CardProfil;
