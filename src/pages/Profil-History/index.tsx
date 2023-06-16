import { IScoreHistory } from '../../@types/quizHistory';
import './styles.scss';
import CardHistory from '../../components/CardHistory';

interface ProfilHistoryProps {
  quizHistory: IScoreHistory[];
}

function ProfilHistory({ quizHistory }: ProfilHistoryProps) {
  return (
    <div>
      <h1 className="quiz__title">Mon historique</h1>
      <div className="cardhistory__container">
        {quizHistory.map((score) => (
          <CardHistory
            key={score.id}
            cardThumbnail={score.quiz.thumbnail}
            cardTitle={score.quiz.title}
            cardScore={score.quiz_score}
          />
        ))}
      </div>
    </div>
  );
}

export default ProfilHistory;
