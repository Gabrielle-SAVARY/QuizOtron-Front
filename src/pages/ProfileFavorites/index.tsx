import Card from '../../components/Card';
import { IQuizList } from '../../@types/quizList';
import BtnExit from '../../components/BtnExit';
import './styles.scss';

interface ProfileFavoritesProps {
  userFavoritesQuiz: IQuizList[]
  addQuizToFavorite: (quizId: number) => void;
  deleteQuizToFavorite: (quizId: number) => void;
}
function ProfileFavorites({
  userFavoritesQuiz, addQuizToFavorite, deleteQuizToFavorite,
}: ProfileFavoritesProps) {
  return (
    <div className="quiz-favoris">
      <div className="quiz-favoris__header">
        <BtnExit redirectionLink="/profil" />
        <h1 className="quiz-favoris__header-title profile-page-title">Mes quiz favoris</h1>
      </div>
      <div>
        {userFavoritesQuiz && (
          <div className="quiz-favoris__content-list">
            {userFavoritesQuiz.map((quiz) => (
              <Card
                key={quiz.id}
                id={quiz.id}
                title={quiz.title}
                thumbnail={quiz.thumbnail}
                author={quiz.author.pseudo}
                level={quiz.level.name}
                tags={quiz.tags}
                addQuizToFavorite={addQuizToFavorite}
                userFavoritesQuiz={userFavoritesQuiz}
                deleteQuizToFavorite={deleteQuizToFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileFavorites;
