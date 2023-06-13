import { useEffect } from 'react';
import { IQuizzesScore } from '../../@types/quizHistory';
import { axiosInstance } from '../../utils/axios';
import './styles.scss';
import CardHistory from '../../components/CardHistory';

interface ProfilHistoryProps {
  quizHistory: IQuizzesScore[];
  setQuizHistory: (quizHistory: IQuizzesScore[]) => void;
}

function ProfilHistory({ quizHistory, setQuizHistory }: ProfilHistoryProps) {
  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const response = await axiosInstance.get('/profile/history');
        // Si pas de réponse 200 envoi erreur
        if (response.status !== 200) {
          throw new Error();
        }
        // récupère les données de la réponse
        const { data } = response;
        // Stocke les données dans le state quizHistory
        setQuizHistory(data.quizzes_scores);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuizHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="quiz__title">Mon historique</h1>
      <div className="cardhistory__container">
        {quizHistory.map((quiz) => (
          <CardHistory
            key={quiz.id}
            cardThumbnail={quiz.thumbnail}
            cardTitle={quiz.title}
            cardScore={quiz.score.quiz_score}
          />
        ))}
      </div>
    </div>
  );
}

export default ProfilHistory;
