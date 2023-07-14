import {
  FormControl,
  FormLabel, RadioGroup, TextField,
} from '@mui/material';
import { SyntheticEvent, memo } from 'react';
import { numberOfQuestions } from '../../../utils/createModels';
import { QuestionUp } from '../../../@types/quizUpdate';
import { QuestionUpError } from '../../../@types/error';
import AnswerUpdate from '../AnswerUpdate';
import './styles.scss';

interface QuestionUpdateProps {
  questionNumber: number
  currentQuestion: QuestionUp
  currentQuestionError: QuestionUpError
  onChangeQuestion:(event: SyntheticEvent<Element, Event>, idQuestion: number) => void
  handleUpdateRadioBtn: (idQuestion: number, idAnswer: number) => void
  handleUpdateAnswer: (event: SyntheticEvent<Element, Event>, idQuestion: number, idAnswer: number) => void
}

const QuestionUpdate = memo(
  ({
  questionNumber,
  currentQuestion,
  currentQuestionError,
   onChangeQuestion,
   handleUpdateRadioBtn, 
   handleUpdateAnswer,
}: QuestionUpdateProps) => {
  console.log(`QUPDATE ${questionNumber}`);  
  // TODO trouver solution pour éviter d'utiliser en key l'index de la réponse dans le map

  return (
    <div className="question-update__container" id={`question${questionNumber}`}>
      <h3 className="question-update__number">
        question n°
        {questionNumber}/{numberOfQuestions}
      </h3>
      <TextField
        fullWidth
        id={`question-${currentQuestion.id}`}
        label={`Question ${questionNumber}`}
        variant="outlined"
        name={`question${questionNumber}`}
        onChange={(event) =>onChangeQuestion(event, currentQuestion.id )}
        value={currentQuestion.question}
        error={
          currentQuestionError.question !== undefined
          && currentQuestionError.question !== ''
        }
        helperText={
          currentQuestionError.question !== undefined
          && currentQuestionError.question !== ''
            ? currentQuestionError.question
            : `${currentQuestion.question.length}/150 caractères maximum`
        }
      />
      <FormControl 
        error={currentQuestionError.radioGroup !== undefined
        && currentQuestionError.radioGroup !== ''}
        fullWidth
      >
      <FormLabel id="demo-radio-buttons-group-label"       
      sx={{ pt: 2 }}>
        Ecrivez les 4 choix de réponses et sélectionner la bonne réponse à la question
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name={`radio-q${questionNumber}`}
      >

        <fieldset>
          {currentQuestion.answers.map((answer, index) => (
            <AnswerUpdate
            key={`answer${index}-${answer.id}`}
            questionNumber={questionNumber}
            questionId={currentQuestion.id}
            answerIndex={index}
            answerNumber={index + 1}
            answerId={answer.id}
            answer={answer}
            currentAnswerError={currentQuestionError.answers[index]}
            onChangeRadioBtn={handleUpdateRadioBtn}
            onChangeAnswer={handleUpdateAnswer}  
            />
          ))}
        </fieldset>
      </RadioGroup>
      </FormControl>
    </div>

  );
}
);

export default QuestionUpdate;
