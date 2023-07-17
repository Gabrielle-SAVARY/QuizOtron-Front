import { IScoreHistory } from '../../@types/quizHistory';
import BtnExit from '../../components/BtnExit';
import CardHistory from '../../components/CardHistory';
import './styles.scss';

interface ProfilHistoryProps {
  quizHistory: IScoreHistory[];
}

function ProfilHistory({ quizHistory }: ProfilHistoryProps) {
  return (
    <div>
      <h1 className="quiz__title">Mon historique</h1>
      <BtnExit/>
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
