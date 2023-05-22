import { NavLink } from 'react-router-dom';
import './styles.scss';

function ProfilQuiz() {
  return (
    <div>
      Profil quiz
      <NavLink to="/profile/quiz/creer-quiz">
        <button type="button" className="login-page__button">
          Créer un quiz
        </button>
      </NavLink>
    </div>
  );
}

export default ProfilQuiz;
