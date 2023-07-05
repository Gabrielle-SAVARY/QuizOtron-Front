import { FormControlLabel, Radio, TextField } from '@mui/material';
import { SyntheticEvent, memo } from 'react';
import './styles.scss';
import { AnswerUp } from '../../../@types/quizUpdate';

interface AnswerUpdateProps {
  questionNumber:number;
  questionId:number;
  answerNumber: number;
  answerId:number;
  answer: AnswerUp;
  // currentAnswerError: AnswerError;
  onChangeRadioBtn: (idQuestion: number, idAnswer: number,) => void;
  onChangeAnswer: (event: SyntheticEvent<Element, Event>,
    idQuestion: number, idAnswer: number) => void;
}

const AnswerUpdate = memo(
  ({
    questionNumber,
    questionId,
    answerNumber,
    answerId,
    answer,
    // currentAnswerError,
    onChangeRadioBtn,
    onChangeAnswer,
  }: AnswerUpdateProps) => {
    console.log(`${questionNumber} Answer${answerNumber}`);
    return (
      <div className="question-choice">
        <div className="answer_container" id={`q${questionNumber}Answer${answerNumber}-${answerId}`}>
          <span className="answer_radio-button">
            <FormControlLabel
              value={answerId}
              control={<Radio />}
              label=""
              checked={answer.is_valid}
              onChange={() => onChangeRadioBtn(questionId, answerId)}
            />
          </span>
          <span className="answer_input-text">
            <TextField
              id={`answer-${answerNumber}-${answerId}`}
              label={`Réponse ${answerNumber}`}
              variant="outlined"
              name={`answer${answerNumber}-q${questionNumber + 1}`}
              fullWidth
              onChange={(event) => onChangeAnswer(event, questionId, answerId)}
              value={answer.answer}

              // error={currentAnswerError.answer !== undefined && currentAnswerError.answer !== ''}
              // helperText={
              //   currentAnswerError.answer !== undefined && currentAnswerError.answer !== ''
              //     ? currentAnswerError.answer
              //     : ''
              // }
            />
          </span>
        </div>
      </div>
    );
  }
);

export default AnswerUpdate;