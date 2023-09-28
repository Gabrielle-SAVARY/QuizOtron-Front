import profilRomain from '../../assets/img/peeps-avatarRomain.png';
import profilGabrielle from '../../assets/img/peeps-avatarGabrielle.png';
import profilGabrielle2 from '../../assets/img/peeps-avatarGabrielle2.png';
import profilSami from '../../assets/img/peeps-avatarSami.png';
import CardProfil from '../../components/CardProfil';
import CardStack from '../../components/CardStack';
import logoReact from '../../assets/img/stacks_logo/stack_react.png';
import logoRedux from '../../assets/img/stacks_logo/stack_redux.png';
import logoTypeScript from '../../assets/img/stacks_logo/stack_typeScript.png';
import logoSass from '../../assets/img/stacks_logo/stack_sass.png';
import logoNodeJs from '../../assets/img/stacks_logo/stack_nodeJs.png';
import logoPostgreSQL from '../../assets/img/stacks_logo/stack_postgreSQL.png';
import logoSequelize from '../../assets/img/stacks_logo/stack_sequelize.png';
import './styles.scss';

function About() {
  return (
    <div className="about">
      <h1 className="about__title">À propos de Quiz&apos;O&apos;Tron</h1>
      <div className="about-project">
        <div className="about-project__presentation">
          <p className="about__text">Bienvenue sur notre site de quiz, une plateforme interactive conçue avec passion par notre équipe de fin d&apos;étude de Développeur Fullstack JS avec l&apos;organisme de formation O&apos;Clock. Notre objectif est de vous offrir une expérience ludique et enrichissante en testant vos connaissances dans différents domaines. Que vous soyez un amateur curieux ou un passionné avide de défis, notre site propose une variété de quiz captivants et divertissants.</p>
          <p className="about__text">Notre équipe est composée de trois esprits créatifs qui ont uni leurs compétences pour donner vie à ce projet. Nous avons travaillé dur pour vous offrir des fonctionnalités conviviales qui rendront votre expérience de quiz inoubliable.</p>
        </div>
      </div>
      <div className="about-project__stack">
        <h2 className="about-project__subtitle">Les technologies utilisées</h2>
        <div className="about-project__stack-container">
          <CardStack thumbnail={logoReact} imgAlt="logo react" title="React" />
          <CardStack thumbnail={logoRedux} imgAlt="logo redux" title="Redux" />
          <CardStack thumbnail={logoTypeScript} imgAlt="logo typeScript" title="TypeScript" />
          <CardStack thumbnail={logoSass} imgAlt="logo Sass" title="Sass" />
          <CardStack thumbnail={logoNodeJs} imgAlt="logo nodeJS" title="Node Js" />
          <CardStack thumbnail={logoPostgreSQL} imgAlt="logo PostgreSQL" title="PostgreSQL" />
          <CardStack thumbnail={logoSequelize} imgAlt="logo Sequelize" title="Sequelize" />
        </div>
      </div>
      <div className="about-project__team">
        <h2 className="about-project__subtitle">L&apos;équipe de QuizOtron</h2>
        <div className="about-project__team__card-container">
          <CardProfil
            imgProfil={profilGabrielle2}
            imgAlt={profilGabrielle}
            name="Gabrielle SAVARY"
            teamRole="Développeuse Front-End"
            otherRole="Product Owner/Scrum Master"
            linkLinkedin="https://www.linkedin.com/in/gabrielle-savary/"
            linkPortfolio="/#"
            linkGithub="https://github.com/Gabrielle-SAVARY"
          />
          <CardProfil
            imgProfil={profilRomain}
            imgAlt={profilRomain}
            name="Romain ANDINÉ"
            teamRole="Lead Développeur Front-End"
            otherRole="Git Master"
            linkLinkedin="https://www.linkedin.com/in/romain-andin%C3%A9/"
            linkPortfolio="https://romain-andine-portfolio.vercel.app/"
            linkGithub="https://github.com/RomainAndine"
          />
          <CardProfil
            imgProfil={profilSami}
            imgAlt={profilSami}
            name="Sami BEN ABDALLAH"
            teamRole="Lead Développeur Backend"
            otherRole=""
            linkLinkedin="https://www.linkedin.com/in/sami-ben-abdallah-211767161/"
            linkPortfolio="/#"
            linkGithub="https://github.com/SamiBenAbdallah"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
