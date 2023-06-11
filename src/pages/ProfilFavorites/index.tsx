import Card from '../../components/Card';
import { IQuizList } from '../../@types/quizList';
import './styles.scss';

interface ProfilQuizProps {
  userFavoritesQuiz: IQuizList[]
  addQuizToFavorite: (quizId: number) => void;
}
function ProfilFavorites({ userFavoritesQuiz, addQuizToFavorite }: ProfilQuizProps) {
  return (
    <div className="quiz__favoris">
      <h1 className="quiz__title">Mes quiz favoris</h1>

      <div>
        {userFavoritesQuiz && (

        <div className="quiz__content-list">
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
            />
          ))}
        </div>

        )}

      </div>
    </div>
  );
}

export default ProfilFavorites;
