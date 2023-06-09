import React from 'react';
import WorkIcon from '@mui/icons-material/Work';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './styles.scss';

interface CardProfilProps {
  imgProfil: string;
  imgAlt: string;
  name: string;
  pseudo: string;
  teamRole: string;
  linkLinkedin: string;
  linkPortfolio: string;
  linkGithub: string;
}

function CardProfil(props: CardProfilProps) {
  const {
    imgProfil, imgAlt, name, pseudo, teamRole, linkLinkedin, linkPortfolio, linkGithub,
  } = props;
  return (
    <div className="about__team-card">
      <div className="team-card__header">
        <img src={imgProfil} alt={imgAlt} className="team-card__header-img" />
      </div>
      <div className="team-card__body">
        <p className="team-card__name">{name}</p>
        <p className="team-card__pseudo">{pseudo}</p>
        <p className="team-card__role">{teamRole}</p>
      </div>
      <div className="team-card__footer">
        <ul className="team-card__contact">
          <li className="team-card__linkedin"><a href={linkLinkedin} target="_blank" rel="noreferrer"><LinkedInIcon sx={{ color: 'white' }} /></a></li>
          <li className="team-card__portfolio"><a href={linkPortfolio} target="_blank" rel="noreferrer"><WorkIcon sx={{ color: 'white' }} /></a></li>
          <li className="team-card__github"><a href={linkGithub} target="_blank" rel="noreferrer"><GitHubIcon sx={{ color: 'white' }} /></a></li>
        </ul>
      </div>
    </div>
  );
}

export default CardProfil;
