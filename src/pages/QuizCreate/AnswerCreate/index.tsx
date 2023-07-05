import { FormControlLabel, Radio, TextField } from '@mui/material';
import { SyntheticEvent, memo } from 'react';
import { AnswerError } from '../../../@types/error';
import './styles.scss';

interface AnswerCreateProps {
  questionIndex:number
  answerIndex: number;
  answer: string;
  currentAnswerError: AnswerError;
  onChangeRadioBtn: (indexQuestion: number, answerNumber: number,) => void;
  onChangeAnswer: (event: SyntheticEvent<Element, Event>,
    indexQuestion: number, answerNumber: number) => void;
}

const AnswerCreate = memo(
  ({
    questionIndex,
    answerIndex,
    answer,
    currentAnswerError,
    onChangeRadioBtn,
    onChangeAnswer,
  }: AnswerCreateProps) => {
    console.log(`${questionIndex} Answer${answerIndex}`);
    return (
      <div className="question-choice">
        <div className="answer_container" id={`q${questionIndex + 1}Answer${answerIndex + 1}`}>
          <span className="answer_radio-button">
            <FormControlLabel
              value={`answer${answerIndex + 1}`}
              control={<Radio />}
              label=""
              onChange={() => onChangeRadioBtn(questionIndex, answerIndex)}
            />
          </span>
          <span className="answer_input-text">
            <TextField
              id={`answer${answerIndex + 1}-q${questionIndex + 1}`}
              label={`Réponse ${answerIndex + 1}`}
              variant="outlined"
              name={`answer${answerIndex + 1}-q${questionIndex + 1}`}
              fullWidth
              onChange={(event) => onChangeAnswer(event, questionIndex, answerIndex)}
              value={answer}
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

export default AnswerCreate;