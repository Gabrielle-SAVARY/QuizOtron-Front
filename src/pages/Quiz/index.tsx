import { useEffect } from 'react';
import Card from '../../components/Card';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchQuiz } from '../../store/reducers/quiz';

function Quiz() {
  const dispatch = useAppDispatch();
  const allQuiz = useAppSelector((state) => state.quiz.allQuiz);
  console.log('allQuiz', allQuiz);

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);

  return (
    <div className="quiz">
      <h1>Liste des quiz</h1>
      {allQuiz && (
        <div className="content-list">
          {allQuiz.map((quiz) => (
            <Card
              key={quiz.id}
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
