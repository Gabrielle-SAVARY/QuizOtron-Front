import { IScoreHistory } from '../../@types/quizHistory';
import BtnExit from '../../components/BtnExit';
import CardHistory from '../../components/CardHistory';
import './styles.scss';

interface ProfileHistoryProps {
  quizHistory: IScoreHistory[];
}

function ProfileHistory({ quizHistory }: ProfileHistoryProps) {
  return (
    <div>
      <h1 className="quiz__title profile-page-title">Mon historique</h1>
      <BtnExit redirectionLink="/profil" />
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

export default ProfileHistory;
