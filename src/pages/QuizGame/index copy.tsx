import { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/axios';
import { IOneQuiz } from '../../@types/quiz';

interface QuizGameProps {
  quiz: IOneQuiz;
}

function QuizPage({ quiz }: QuizGameProps) {
  const [loadedQuiz, setLoadedQuiz] = useState<IOneQuiz | null>(null);
  const [questions, setQuestions] = useState(quiz.questions);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(quiz.questions.length).fill(null));

  useEffect(() => {
    const getQuizDetails = async () => {
      try {
        const response = await axiosInstance.get(`/quiz/${quiz.id}`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch quiz details');
        }
        const quizData = response.data;
        setQuiz(quizData);
        setQuestions(quizData.questions);
        setUserAnswers(Array(quizData.questions.length).fill(null));
      } catch (error) {
        throw new Error('Failed to fetch quiz details');
      }
    };

    getQuizDetails();
  }, [quiz.id]);

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    // Met à jour la réponse de l'utilisateur pour la question correspondante
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = answerIndex;
      return updatedAnswers;
    });
  };

  const handleSubmit = () => {
    // Calcule le score et affiche les réponses de l'utilisateur
    // Comparaison des réponses avec les réponses correctes du quiz, calcul du score, etc.
    // Tu peux ajouter cette logique ici selon tes besoins
  };

  if (questions.length === 0) {
    return <div>Aucune question trouvée.</div>;
  }

  return (
    <div onSubmit={(event) => getQuizDetails(event)}>
      {/* Affichage des questions du quiz */}
      {questions.map((question, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <h3>
            Question
            {' '}
            {index + 1}
          </h3>
          <p>{question.question}</p>
          {/* Affichage des réponses possibles */}
          {question.answers.map((answer, answerIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={answerIndex}>
              <label>
                <input
                  type="radio"
                  value={answerIndex}
                  checked={userAnswers[index] === answerIndex}
                  onChange={() => handleAnswer(index, answerIndex)}
                />
                {answer.answer}
              </label>
            </div>
          ))}
        </div>
      ))}
      {/* Bouton de soumission */}
      <button type="submit" onClick={handleSubmit}>Soumettre</button>
    </div>
  );
}

export default QuizPage;
