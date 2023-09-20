import './styles.scss';

function Confidentiality() {
  return (
    <div className="confidentiality">
      <h1 className="confidentiality__title">Politique de confidentialité</h1>
      <div className="confidentiality__container">
        <div className="confidentiality__presentation">
          <p className="confidentiality__text">Cette politique vous informe sur les types d’utilisation qui sont fait de vos données et sur la façon dont nous les protégeons lorsque vous utilisez notre site.</p>
          <br />
          <p className="confidentiality__text">Il appartient au visiteur du site de rester informé de ces évolutions qui l’engagent en consultant la présente page avant toute utilisation du présent site internet.</p>
        </div>
        <div className="confidentiality__rgpd">
          <h2 className="confidentiality__subtitle">Le règlement général sur la protection des données (RGPD)</h2>
          <p className="confidentiality__text">QuizOtron s&apos;engage à respecter les dispositions de la loi n°78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés modifiées et au Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 dit &quot;RGPD&quot; et prendre toute précaution nécessaire pour préserver la sécurité des informations nominatives confiées.</p>
        </div>
        <div className="confidentiality__editor">
          <h2 className="confidentiality__subtitle">Création d&apos; un compte</h2>
          <p className="confidentiality__text">Certaines informations personnelles sont collectées sur ce site de façon à nous permettre à répondre à certaines de vos demandes d’informations ou de vous faire profiter de fonctionalités supplémentaires.</p>
          <h3 className="confidentiality__text-subtitle">Listes des informations collectées</h3>
          <ul className="confidentiality__list">
            <li className="confidentiality__text"> Nom et prénom</li>
            <li className="confidentiality__text"> Adresse mail</li>
            <li className="confidentiality__text"> Pseudonyme</li>
            <li className="confidentiality__text"> Mot de passe</li>
          </ul>
          <p className="confidentiality__text">QuizOtron utilise ces informations pour le bon fonctionnement de l&apos;espace profil de ses utilisateurs. Aucune de ces informations n&apos;est partagées avec un tiers</p>
        </div>
        <div className="confidentiality__delete-data">
          <h2 className="confidentiality__subtitle">Supprimer vos données</h2>
          <p className="confidentiality__text">Conformément à vos droits vous pouvez à n&apos;importe quel moment décider de supprimer votre compte et l&apos;intégralité de vos données depuis votre profil utilisateur.</p>
          <p className="confidentiality__text">Cette action est irréversible car aucunes données ne sera conservée.</p>
        </div>
      </div>
    </div>
  );
}

export default Confidentiality;
