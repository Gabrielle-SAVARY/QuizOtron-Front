import Card from '../../components/Card';
import { IQuizList } from '../../@types/quizList';

interface QuizProps {
  quizList: IQuizList[]
}

function Quiz({ quizList }: QuizProps) {
  return (
    <div className="quiz">
      <h1>Liste des quiz</h1>
      {quizList && (
        <div className="content-list">
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
