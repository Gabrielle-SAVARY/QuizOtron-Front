import {
  FormControl, RadioGroup, TextField, FormLabel,
} from '@mui/material';
import { SyntheticEvent} from 'react';
import { numberOfQuestions } from '../../../utils/createModels';
import {QuestionError } from '../../../@types/error';
import { Question } from '../../../@types/newQuiz';
import AnswerCreate from '../AnswerCreate';
import './styles.scss';

interface QuestionCreateProps {
  questionIndex: number
  currentQuestion:Question
  currentQuestionError: QuestionError
  onChangeQuestion: (event: SyntheticEvent<Element, Event>, indexQuestion: number) => void
  handleChangeAnswer: (event: SyntheticEvent<Element, Event>, indexQuestion: number, indexAnswer: number) => void
  handleChangeRadioBtn: (indexQuestion: number, indexAnswer: number) => void
}

function QuestionCreate({
  questionIndex, currentQuestion, currentQuestionError, onChangeQuestion,handleChangeAnswer, handleChangeRadioBtn
}:QuestionCreateProps){
  console.log(`QCREATE ${questionIndex}`);  
  return (
    <div className="question-create__container" id={`question${questionIndex + 1}`}>
      <h3 className="question-create__number">
        Question n°
        {questionIndex + 1}
        /{numberOfQuestions}
      </h3>
      <TextField
        fullWidth
        id={`question-${questionIndex + 1}`}
        label={`Question ${questionIndex + 1}`}
        variant="outlined"
        name={`question${questionIndex + 1}`}
        onChange={(event) => onChangeQuestion(event, questionIndex)}
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
      <FormControl error={currentQuestionError.radioGroup !== undefined
          && currentQuestionError.radioGroup !== ''}
      >
        <FormLabel id="demo-radio-buttons-group-label"
        sx={{ pt: 2 }}
        >Ecrivez les 4 choix de réponses et sélectionner la bonne réponse à la question</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="choose"
          name={`radio-q${questionIndex + 1}`}
        >
          <fieldset>
            {currentQuestion.answers.map((answer, index) => (
              <AnswerCreate
                key={`answer${index + 1}`}
                questionIndex={questionIndex}
                answerIndex={index}
                answer={answer.answer}
                currentAnswerError={currentQuestionError.answers[index]}
                onChangeRadioBtn={handleChangeRadioBtn}
                onChangeAnswer={handleChangeAnswer}
              />
            ))}
          </fieldset>
        </RadioGroup>
      </FormControl>
    </div>

  );
}

export default QuestionCreate;
