import { useState, ChangeEvent, FormEvent } from 'react';
import { ICreateQuiz, KeysOfICreateQuiz } from '../../@types/quiz';

import './styles.scss';

interface CreateQuizProps {
  quizTitle: string;
  quizDescription: string;
}

function CreateQuiz() {
  const [quiz, setQuiz] = useState<CreateQuizProps>({
    quizTitle: '',
    quizDescription: '',
  });

  // Met à jour le state avec la valur des inputs du formulaire
  const handleChangeField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    // récupère le name et la valeur de l'input et le type la donnée
    const fieldName = event.target.name as KeysOfICreateQuiz;
    const newValue = event.target.value;
    console.log('fieldName', fieldName);
    console.log('newValue', newValue);
    setQuiz((prevQuiz) => ({ ...prevQuiz, [fieldName]: newValue }));
  };
  return (
    <form action="submit">
      <div className="quiz__creation">
        <div className="quiz__header">
          <h3>Créer un quiz</h3>
          <button type="button" className="quiz__button">Quitter</button>
        </div>
        <div className="quiz__parameter">
          <label htmlFor="category-quiz">Choisissez une catégorie</label>
          <select name="Catégorie" id="category-quiz" className="quiz__selector">
            <option value="">Merci de choisir une catégorie</option>
            <option value="Catégorie 1">Catégorie 1</option>
            <option value="Catégorie 2">Catégorie 2</option>
            <option value="Catégorie 2">Catégorie 3</option>
          </select>
          <label htmlFor="level-quiz">Choisissez une difficulté</label>
          <select name="level" id="level-quiz" className="quiz__selector">
            <option value="">Merci de choisir une difficulté</option>
            <option value="Difficulté 1">Difficulté 1</option>
            <option value="Difficulté 2">Difficulté 2</option>
            <option value="Difficulté 2">Difficulté 3</option>
          </select>
          <label htmlFor="titre-quiz">Choisissez votre titre de quiz</label>
          <input
            type="text"
            placeholder="Titre du quiz"
            className="quiz__selector"
            name="quizTitle"
            value={quiz.quizTitle}
            onChange={handleChangeField}
          />

          <label htmlFor="description-quiz">Choisissez votre description de quiz</label>
          <textarea className="quiz__selector" name="quizDescription" id="" cols={30} rows={10} placeholder="Votre description de quiz..." value={quiz.quizDescription} onChange={handleChangeField} />
        </div>
        <div className="question__container">

          {/* question 1 */}
          <div className="question1_container">
            <p className="question__number">Question n°1</p>
            <p className="question__title">Intitulé de la question</p>
            <fieldset>
              <div className="question-choice">
                {/* réponse 1 */}
                <div className="answer_container">
                  <span className="answer_radio-button">
                    <input type="radio" id="question1-radio1" name="question1-radio" />
                    <label htmlFor="question1-radio1" />
                  </span>
                  <span className="answer_input-text">
                    <label htmlFor="question1-answer1" />
                    <input type="text" id="question1-answer1" />
                  </span>
                </div>
                {/* réponse 2 */}
                <div className="answer_container">
                  <span className="answer_radio-button">
                    <input type="radio" id="question1-radio2" name="question1-radio" />
                    <label htmlFor="radio2" />
                  </span>
                  <span className="answer_input-text">
                    <label htmlFor="question1-answer2" />
                    <input type="text" id="question1-answer2" />
                  </span>
                </div>
                {/* réponse 3 */}
                <div className="answer_container">
                  <span className="answer_radio-button">
                    <input type="radio" id="question1-radio3" name="question1-radio" />
                    <label htmlFor="question1-radio3" />
                  </span>
                  <span className="answer_input-text">
                    <label htmlFor="question1-answer3" />
                    <input type="text" id="question1-answer3" />
                  </span>
                </div>
                {/* réponse 4 */}
                <div className="answer_container">
                  <span className="answer_radio-button">
                    <input type="radio" id="question1-radio4" name="question1-radio" />
                    <label htmlFor="question1-radio4" />
                  </span>
                  <span className="answer_input-text">
                    <label htmlFor="question1-answer4" />
                    <input type="text" id="question1-answer4" />
                  </span>
                </div>
              </div>
            </fieldset>
          </div>

          {/* question 2 */}
          <div className="question1_container">
            <p className="question__number">Question n°2</p>
            <p className="question__title">Intitulé de la question</p>
            <fieldset>
              <div className="question-choice">
                {/* réponse 1 */}
                <div className="answer_container">
                  <span className="answer_radio-button">
                    <input type="radio" id="question1-radio1" name="question2-radio" />
                    <label htmlFor="question1-radio1" />
                  </span>
                  <span className="answer_input-text">
                    <label htmlFor="question1-answer1" />
                    <input type="text" id="question1-answer1" />
                  </span>
                </div>
                {/* réponse 2 */}
                <div className="answer_container">
                  <span className="answer_radio-button">
                    <input type="radio" id="question1-radio2" name="question2-radio" />
                    <label htmlFor="radio2" />
                  </span>
                  <span className="answer_input-text">
                    <label htmlFor="question1-answer2" />
                    <input type="text" id="question1-answer2" />
                  </span>
                </div>
                {/* réponse 3 */}
                <div className="answer_container">
                  <span className="answer_radio-button">
                    <input type="radio" id="question1-radio3" name="question2-radio" />
                    <label htmlFor="question1-radio3" />
                  </span>
                  <span className="answer_input-text">
                    <label htmlFor="question1-answer3" />
                    <input type="text" id="question1-answer3" />
                  </span>
                </div>
                {/* réponse 4 */}
                <div className="answer_container">
                  <span className="answer_radio-button">
                    <input type="radio" id="question1-radio4" name="question2-radio" />
                    <label htmlFor="question1-radio4" />
                  </span>
                  <span className="answer_input-text">
                    <label htmlFor="question1-answer4" />
                    <input type="text" id="question1-answer4" />
                  </span>
                </div>
              </div>
            </fieldset>
          </div>

        </div>

      </div>
    </form>
  );
}

export default CreateQuiz;
