import { FormControlLabel, Radio, TextField } from '@mui/material';
import { SyntheticEvent, memo } from 'react';
import './styles.scss';
import { AnswerUp } from '../../../@types/quizUpdate';
import { AnswerUpError } from '../../../@types/error';

interface AnswerUpdateProps {
  questionNumber:number;
  questionId:number;
  answerIndex: number;
  answerNumber: number;
  answerId:number;
  answer: AnswerUp;
  currentAnswerError: AnswerUpError;
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
    currentAnswerError,
    onChangeRadioBtn,
    onChangeAnswer,
  }: AnswerUpdateProps) => {
    console.log(`${questionNumber} Answer${answerNumber}`);
    return (
      <div className="answer-update__question-choice">
        <div className="answer-update__container" id={`q${questionNumber}Answer${answerNumber}-${answerId}`}>
          <span className="answer-update__radio-btn">
            <FormControlLabel
              value={answerId}
              control={<Radio 
                sx={{
                  color: 'gray',
                  '&.Mui-checked': {
                    color: 'orange',
                  },
                }} 
              />}
              label=""
              checked={answer.is_valid}
              onChange={() => onChangeRadioBtn(questionId, answerId)}
              
              
            />
          </span>
          <span className="answer-update__input-text">
            <TextField
              id={`answer-${answerNumber}-${answerId}`}
              label={`Réponse ${answerNumber}`}
              variant="outlined"
              name={`answer${answerNumber}-q${questionNumber + 1}`}
              fullWidth
              onChange={(event) => onChangeAnswer(event, questionId, answerId)}
              value={answer.answer}
              error={currentAnswerError.answer !== undefined && currentAnswerError.answer !== ''}
              helperText={
                currentAnswerError.answer !== undefined && currentAnswerError.answer !== ''
                  ? currentAnswerError.answer
                  : ''
              }
            />
          </span>
        </div>
      </div>
    );
  }
);

export default AnswerUpdate;