import {
  FormControlLabel,
  FormLabel, Radio, RadioGroup, TextField,
} from '@mui/material';
import { ChangeEvent, SyntheticEvent, useEffect } from 'react';
import { Question } from '../../../@types/newQuiz';
import CreateAnswer from '../CreateAnswers';
import './styles.scss';

interface CreateQuestionsProps {
  questionNumber: number
  newQuestion: Question
  setNewQuestion: (question: Question) => void
}

function CreateQuestion({ questionNumber, newQuestion, setNewQuestion }:CreateQuestionsProps) {
  // Mise à jour du state au remplissage du formulaire
  // TODO TYPE EVENT
  const handleChangeQuestions = (
    e: ChangeEvent<HTMLInputElement> | SyntheticEvent<Element, Event>,
    aNb = 0,
    isChangingStatus = false,
  ) => {
    //* Etape 1 : On récupère le contenu du state en question
    const quizzQuestions = { ...newQuestion };
    //* Etape 2 : on contrôle le numéro de réponse (aNb)
    //* Cette valeur nous permet de savoir si on renseigne une question ou une réponse
    if (aNb === 0) {
      // Si aNb === 0 alors e.target.value est une question
      quizzQuestions.question = e.target.value;
    } else if (!isChangingStatus) {
      quizzQuestions.answers[aNb - 1].answer = e.target.value;
    } else {
      // Si aNb !== 0 alors e.target.value est une réponse
      // D'abord on réinitialise les status des réponses à false
      // TODO! : trouver une solution pour l'erreur de la boucle ci dessous
      // eslint-disable-next-line no-restricted-syntax
      for (const anwser of quizzQuestions.answers) {
        anwser.is_valid = false;
      }
      // Ensuite on passe la nouvelle réponse à true
      quizzQuestions.answers[aNb - 1].is_valid = true;
    }
    // Enfin, on met à jour le state
    setNewQuestion(quizzQuestions);
  };

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
        onChange={handleChangeQuestions}
        value={newQuestion.question}
      />
      <FormLabel id="demo-radio-buttons-group-label">Réponses</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="choose"
        name={`radio-q${questionNumber}`}
      >

        <fieldset>
          <div className="question-choice">
            {/* //? ======= Réponse 1 ========== */}
            <div className="answer_container" id={`q${questionNumber}Answer1`}>
              <span className="answer_radio-button">
                <FormControlLabel
                  value="answer1"
                  control={<Radio />}
                  label=""
                  onChange={(e) => handleChangeQuestions(e, 1, true)}
                />
              </span>
              <span className="answer_input-text">
                <TextField
                  id={`answer1-q${questionNumber}`}
                  label="Réponse 1"
                  variant="outlined"
                  onChange={(e) => handleChangeQuestions(e, 1)}
                  value={newQuestion.answers[0].answer}
                />
              </span>
            </div>
          </div>

          {/* //? ======= Réponse 2 ========== */}
          <div className="question-choice">
            <div className="answer_container" id={`q${questionNumber}Answer2`}>
              <span className="answer_radio-button">
                <FormControlLabel
                  value="answer2"
                  control={<Radio />}
                  label=""
                  onChange={(e) => handleChangeQuestions(e, 2, true)}
                />
              </span>
              <span className="answer_input-text">
                <TextField
                  id={`answer2-q${questionNumber}`}
                  label="Réponse 2"
                  variant="outlined"
                  onChange={(e) => handleChangeQuestions(e, 2)}
                  value={newQuestion.answers[1].answer}
                />
              </span>
            </div>
          </div>

          {/* //? ======= Réponse 3 ========== */}
          <div className="question-choice">
            <div className="answer_container" id={`q${questionNumber}Answer3`}>
              <span className="answer_radio-button">
                <FormControlLabel
                  value="answer3"
                  control={<Radio />}
                  label=""
                  onChange={(e) => handleChangeQuestions(e, 3, true)}
                />
              </span>
              <span className="answer_input-text">
                <TextField
                  id={`answer3-q${questionNumber}`}
                  label="Réponse 3"
                  variant="outlined"
                  onChange={(e) => handleChangeQuestions(e, 3)}
                  value={newQuestion.answers[2].answer}
                />
              </span>
            </div>
          </div>

          {/* //? ======= Réponse 4 ========== */}
          <div className="question-choice">
            <div className="answer_container" id={`q${questionNumber}Answer4`}>
              <span className="answer_radio-button">
                <FormControlLabel
                  value="answer4"
                  control={<Radio />}
                  label=""
                  onChange={(e) => handleChangeQuestions(e, 4, true)}
                />
              </span>
              <span className="answer_input-text">
                <TextField
                  id={`answer4-q${questionNumber}`}
                  label="Réponse 4"
                  variant="outlined"
                  onChange={(e) => handleChangeQuestions(e, 4)}
                  value={newQuestion.answers[3].answer}
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
