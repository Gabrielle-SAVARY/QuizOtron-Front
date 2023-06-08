import './styles.scss';

function About() {
  return (
    <div className="about">
      <div className="about__quizotron">
        <h1 className="about__title">À propos de Quiz&apos;O&apos;Tron</h1>
        <p className="about__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic amet eveniet animi magni aliquid libero dignissimos ducimus sunt, modi vel quidem, voluptate ab rem non omnis eaque repellendus, ipsa laborum.</p>
      </div>
      <div className="about__team">
        <h2 className="about__title">L&apos;équipe</h2>
        <div className="about__team-card">
          <div className="team-card__header">
            <p className="team-card__img">img</p>
          </div>
          <div className="team-card__body">
            <p className="team-card__name">Nom prénom</p>
            <p className="team-card__pseudo">Pseudo</p>
            <p className="team-card__role">Role</p>
          </div>
          <div className="team-card__footer">
            <p className="team-card__linkedin">Linkedin</p>
            <p className="team-card__portfolio">Portfolio</p>
            <p className="team-card__github">GitHub</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
