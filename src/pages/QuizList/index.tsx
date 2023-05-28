import Card from '../../components/Card';
import { IQuizList } from '../../@types/quizList';
import './styles.scss';

interface QuizProps {
  quizList: IQuizList[]
}

function Quiz({ quizList }: QuizProps) {
  return (
    <div className="quiz-list">
      <h1 className="quiz-list__title">Liste des quiz</h1>
      {quizList && (
        <div className="quiz-list__items">
          {quizList.map((quiz) => (
            <Card
              key={quiz.id}
              id={quiz.id}
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

  );
}

export default Quiz;
