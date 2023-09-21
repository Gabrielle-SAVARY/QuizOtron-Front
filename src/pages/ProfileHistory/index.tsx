import { IScoreHistory } from '../../@types/quizHistory';
import BtnExit from '../../components/BtnExit';
import CardHistory from '../../components/CardHistory';
import './styles.scss';

interface ProfileHistoryProps {
  quizHistory: IScoreHistory[];
}

function ProfileHistory({ quizHistory }: ProfileHistoryProps) {
  return (

    <div className="profile-history">
      <div className="profile-history__header">
        <BtnExit redirectionLink="/profil" />
        <h1 className="profile-history__header-title profile-page-title">Historique des scores</h1>
      </div>
      <h2 className="profile-history__header-subtitle">Liste des scores des 10 derniers quiz joués</h2>
      {quizHistory && (
        <div className="profile-history__container">
          {quizHistory.map((score) => (
            <CardHistory
              key={score.id}
              cardThumbnail={score.quiz.thumbnail}
              cardTitle={score.quiz.title}
              cardTags={score.quiz.tags}
              cardLevel={score.quiz.level.name}
              cardAuthor={score.quiz.author.pseudo}
              cardScore={score.quiz_score}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileHistory;
