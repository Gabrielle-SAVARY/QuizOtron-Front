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
