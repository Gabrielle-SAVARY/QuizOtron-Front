import {
  FormControlLabel,
  FormLabel, Radio, RadioGroup, TextField,
} from '@mui/material';
import { Question } from '../../../@types/newQuiz';
import CreateAnswer from '../CreateAnswers';
import './styles.scss';

interface CreateQuestionsProps {
  questionNumber: number
}

function CreateQuestion({ questionNumber }:CreateQuestionsProps) {
  return (
    <div className="question_container" id={`question${questionNumber}`}>
      <h3 className="question__number">
        Question n°
        {questionNumber}
      </h3>
      <TextField
        fullWidth
        id={`question-${questionNumber}`}
        label={`Question ${questionNumber}`}
        variant="outlined"
      />
      <FormLabel id="demo-radio-buttons-group-label">Réponses</FormLabel>
      {' '}
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="choose"
        name={`radio-q${questionNumber}`}
      >

        <fieldset>
          <div className="question-choice">
            <div className="answer_container" id={`q${questionNumber}Answer1`}>
              <span className="answer_radio-button">
                <FormControlLabel
                  value="answer1"
                  control={<Radio />}
                  label=""
                />
              </span>
              <span className="answer_input-text">
                <TextField
                  id={`answer1-q${questionNumber}`}
                  label="Réponse 1"
                  variant="outlined"
                />
              </span>
            </div>
          </div>
          <div className="question-choice">
            <div className="answer_container" id={`q${questionNumber}Answer2`}>
              <span className="answer_radio-button">
                <FormControlLabel
                  value="answer2"
                  control={<Radio />}
                  label=""
                />
              </span>
              <span className="answer_input-text">
                <TextField
                  id={`answer2-q${questionNumber}`}
                  label="Réponse 2"
                  variant="outlined"
                />
              </span>
            </div>
          </div>
          <div className="question-choice">
            <div className="answer_container" id={`q${questionNumber}Answer3`}>
              <span className="answer_radio-button">
                <FormControlLabel
                  value="answer3"
                  control={<Radio />}
                  label=""
                />
              </span>
              <span className="answer_input-text">
                <TextField
                  id={`answer3-q${questionNumber}`}
                  label="Réponse 3"
                  variant="outlined"
                />
              </span>
            </div>
          </div>
          <div className="question-choice">
            <div className="answer_container" id={`q${questionNumber}Answer4`}>
              <span className="answer_radio-button">
                <FormControlLabel
                  value="answer4"
                  control={<Radio />}
                  label=""
                />
              </span>
              <span className="answer_input-text">
                <TextField
                  id={`answer4-q${questionNumber}`}
                  label="Réponse 4"
                  variant="outlined"
                />
              </span>
            </div>
          </div>
        </fieldset>
      </RadioGroup>
    </div>

  );
}

export default CreateQuestion;
