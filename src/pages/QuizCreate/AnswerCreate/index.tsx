import { FormControlLabel, Radio, TextField } from '@mui/material';
import { SyntheticEvent, memo } from 'react';
import { AnswerError } from '../../../@types/error';
import './styles.scss';

interface AnswerCreateProps {
  questionIndex:number
  answerIndex: number;
  answer: string;
  answerErrorData: AnswerError;
  // onChangeRadio: (indexQuestion: number, answerNumber: number,) => void;
  onChangeAnswer: (event: SyntheticEvent<Element, Event>,
    indexQuestion: number, answerNumber: number) => void;
}

const AnswerCreate = memo(
  ({
    questionIndex,
    answerIndex,
    answer,
    answerErrorData,
    // onChangeRadio,
    onChangeAnswer,
  }: AnswerCreateProps) => {
    console.log(`${questionIndex} Answer${answerIndex}`);
    return (
      <div className="question-choice">
        <div className="answer_container" id={`q${questionIndex + 1}Answer${answerIndex + 1}`}>
          {/* <span className="answer_radio-button">
            <FormControlLabel
              value={`answer${answerIndex + 1}`}
              control={<Radio />}
              label=""
              onChange={() => onChangeRadio(questionIndex, answerIndex)}
            />
          </span> */}
          <span className="answer_input-text">
            <TextField
              id={`answer${answerIndex + 1}-q${questionIndex + 1}`}
              label={`Réponse ${answerIndex + 1}`}
              variant="outlined"
              name={`answer${answerIndex + 1}-q${questionIndex + 1}`}
              fullWidth
              onChange={(event) => onChangeAnswer(event, questionIndex, answerIndex)}
              value={answer}
              error={answerErrorData.answer !== undefined && answerErrorData.answer !== ''}
              helperText={
                answerErrorData.answer !== undefined && answerErrorData.answer !== ''
                  ? answerErrorData.answer
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