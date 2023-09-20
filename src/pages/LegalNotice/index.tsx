import './styles.scss';

function LegalNotice() {
  return (
    <div className="legal-notice">
      <h1 className="legal-notice__title">Mentions légales</h1>
      <div className="legal-notice__container">
        <div className="legal-notice__hosting">
          <h2 className="legal-notice__subtitle">Hébergeur</h2>
          <ul className="legal-notice__text">
            <li>
              Nom hébergeur: MONPC
            </li>
            <li>
              Raison Sociale : SARL QUIZOTRON
            </li>
            <li>
              Adresse : 253, rue du Faubourg Saint-martin - 75010 PARIS
            </li>
          </ul>
        </div>
        <div className="legal-notice__personal-data">
          <h2 className="legal-notice__subtitle">Données personnelles</h2>
          <p className="legal-notice__text">
            Retrouvez toutes les informations concernant les données collectées dans notre
            {' '}
            <a href="#politique-confidentialite">politique de confidentialité</a>
            .
          </p>
          {' '}
          <br />
          <p className="legal-notice__text">
            Les utilisateurs de la plateforme QuizOtron peuvent supprimer l'intégralité de leurs données personnelles directement depuis leur compte.
            <br />
            Un bouton permet de supprimer son compte.
            <br />
            Cette action est irréversible et nous ne pouvons pas revenir en arrière.
          </p>
        </div>
        <div className="legal-notice__advertising">
          <h2 className="legal-notice__subtitle">Publicité</h2>
          <p className="legal-notice__text">
            Notre plateforme est gratuite et sans publicité.
          </p>
        </div>
        <div className="legal-notice__editor">
          <h2 className="legal-notice__subtitle">Éditeur</h2>
          <p className="legal-notice__text">Site web édité par : Gabrielle SAVARY, Romain ANDINÉ et Sami BEN ABDALLAH</p>
          <p><a href="mailto:contact@quizotron.com" className="legal-notice__link">contact@quizotron.com</a></p>
        </div>
        <div className="legal-notice__credit">
          <h2 className="legal-notice__subtitle">Crédits</h2>
          <p className="legal-notice__text">
            Certaines photos et visuels utilisés proviennent de la plateforme
            {' '}
            <a className="legal-notice__link" href="https://fr.freepik.com/">freepik.com</a>
            {' '}
            en original ou retransformées (exemple le background de QuizOtron utilise cette image:
            {' '}
            <a className="legal-notice__link" href="https://fr.freepik.com/vecteurs-libre/modele-point-interrogation-dessine-main_26539479.htm#query=ques" target="blank">Source arrière-plan avec points d&apos;intérrogations</a>
            ).
          </p>
          <p className="legal-notice__text">Une partie des quiz sont crées par nos équipes spécialement pour notre plateforme Il est interdit de copier ces données sans faire mention de QuizOtron.com.</p>
        </div>
      </div>
    </div>
  );
}

export default LegalNotice;
