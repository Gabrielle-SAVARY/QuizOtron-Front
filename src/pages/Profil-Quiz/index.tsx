import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';
import Card from '../../components/Card';
import { IAllQuiz } from '../../@types/quiz';
import { useAppSelector } from '../../hooks/redux';

interface ProfilQuizProps {
  quizList: IAllQuiz[]
}

function ProfilQuiz({ quizList }:ProfilQuizProps) {
  // State: récupère pseudo du reducer user
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  // State: stocke les quiz d'un utilisateur
  const [userQuiz, setUserQuiz] = useState<IAllQuiz[]>([]);

  //* Filtre des quiz de l'utilisateur du profil
  useEffect(() => {
    const filterUserQuiz = (): IAllQuiz[] => quizList.filter(
      (quiz) => quiz.author.pseudo === pseudo,
    );
    const quizFiltered = filterUserQuiz();
    setUserQuiz(quizFiltered);
  }, [pseudo, quizList]);

  return (
    <div className="quiz__management">
      <h1 className="quiz__title">Gérer mes Quiz</h1>
      <NavLink to="/profile/quiz/creer-quiz">
        <button type="button" className="quiz__button">
          Créer un quiz
        </button>
      </NavLink>
      <div>
        <h2 className="quiz__subtitle">Liste des mes quiz</h2>
        {userQuiz && (
        <div className="content-list">
          {userQuiz.map((quiz) => (
            <Card
              key={quiz.id}
              title={quiz.title}
              thumbnail={quiz.thumbnail}
              author={quiz.author.pseudo}
              level={quiz.level.name}
              tags={quiz.tags}
            />

          ))}
        </div>
        )}

      </div>
    </div>
  );
}

export default ProfilQuiz;
