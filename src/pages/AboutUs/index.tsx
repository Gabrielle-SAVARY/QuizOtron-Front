import profilRomain from '../../assets/img/peeps-avatarRomain.png';
import profilGabrielle from '../../assets/img/peeps-avatarGabrielle.png';
import profilGabrielle2 from '../../assets/img/peeps-avatarGabrielle2.png';
import profilSami from '../../assets/img/peeps-avatarSami.png';
import './styles.scss';
import CardProfil from '../../components/CardProfil';

function About() {
  return (
    <div className="about">
      <div className="about__quizotron">
        <h1 className="about__title">À propos de Quiz&apos;O&apos;Tron</h1>
        <p className="about__text">Bienvenue sur notre site de quiz, une plateforme interactive conçue avec passion par notre équipe de fin d&apos;étude. Notre objectif est de vous offrir une expérience ludique et enrichissante en testant vos connaissances dans différents domaines. Que vous soyez un amateur curieux ou un passionné avide de défis, notre site propose une variété de quiz captivants et divertissants.</p>
        <p className="about__text">Notre équipe est composée de trois esprits créatifs qui ont uni leurs compétences pour donner vie à ce projet. Nous avons travaillé dur pour vous offrir des questions soigneusement sélectionnées et des fonctionnalités conviviales qui rendront votre expérience de quiz inoubliable. Nous nous engageons à maintenir une plateforme de qualité, constamment mise à jour avec de nouveaux quiz pour satisfaire votre soif de connaissances.</p>
        <p className="about__text">Nous espérons que notre site de quiz vous apportera à la fois du plaisir et des découvertes. N&apos;hésitez pas à explorer les différentes catégories de quiz, à défier vos amis ou à rivaliser avec d&apos;autres joueurs. Relevez le défi, mesurez vos compétences et améliorez-vous continuellement. Nous vous souhaitons une expérience enrichissante sur notre site et espérons que vous vous amuserez autant que nous avons pris plaisir à créer cette plateforme.</p>
      </div>
      <div className="about__stack">
        <h2 className="about__title">Les technologies utilisées</h2>
      </div>
      <div className="about__team">
        <h2 className="about__title">L&apos;équipe</h2>
        <div className="about__team-card-container">
          <CardProfil
            imgProfil={profilGabrielle2}
            imgAlt={profilGabrielle}
            name="Gabrielle SAVARY"
            pseudo="Gaby"
            teamRole="Développeuse Front-End"
            linkLinkedin="/#"
            linkPortfolio="/#"
            linkGithub="/#"
          />
          <CardProfil
            imgProfil={profilRomain}
            imgAlt={profilRomain}
            name="Romain ANDINÉ"
            pseudo="Romain"
            teamRole="Développeur Front-End"
            linkLinkedin="https://www.linkedin.com/in/romain-andin%C3%A9/"
            linkPortfolio="https://romain-andine-portfolio.vercel.app/"
            linkGithub="https://github.com/RomainAndine"
          />
          <CardProfil
            imgProfil={profilSami}
            imgAlt={profilSami}
            name="Sami BEN ABDALLAH"
            pseudo="Sami"
            teamRole="Développeur Backend"
            linkLinkedin="/#"
            linkPortfolio="/#"
            linkGithub="/#"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
