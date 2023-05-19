import {
  useState, ChangeEvent, FormEvent, useEffect,
} from 'react';
import { ICreateQuiz, KeysOfICreateQuiz } from '../../@types/quiz';
import { ITag } from '../../@types/tag';

import './styles.scss';
import { axiosInstance } from '../../utils/axios';
import { ILevel } from '../../@types/level';

interface CreateQuizProps {
  quizTitle: string;
  quizDescription: string;
  quizQuestion: string;
  question1Answer1: string;
  question1Answer2: string;
  question1Answer3: string;
  question1Answer4: string;
  question1Answer: string;
  quizTag: string;
  quizLevel: string;
}

function CreateQuiz() {
  // ---- STATE ----
  // State: inputs du formulaire de création
  const [quiz, setQuiz] = useState<CreateQuizProps[]>([]);
  // State: liste des tags/catégories possibles pour un quiz
  const [tags, setTags] = useState<ITag[]>([]);
  // State: level/niveau sélectionné pour le quiz en cours de création
  const [quizTag, setQuizTag] = useState('');
  const [levels, setLevels] = useState<ILevel[]>([]);
  // State: level/niveau sélectionné pour le quiz en cours de création
  const [quizLevel, setQuizLevel] = useState('');

  // Met à jour le state quiz avec la valeur des inputs du formulaire
  const handleChangeField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    // récupère le name et la valeur de l'input et le type la donnée
    const fieldName = event.target.name as KeysOfICreateQuiz;
    const newValue = event.target.value;
    // reprend les données déjà présentes dans le state quiz
    // et ajoute ou met à jour les nouvelles données
    setQuiz((prevQuiz) => ({ ...prevQuiz, [fieldName]: newValue }));
  };

  // ---- TAG/CATEGOERIE DU QUIZ ----
  // Met à jour le state quizTag: selon la catégorie sélectionnée dans le menu déroulant
  const handleChangeTag = (event: ChangeEvent<HTMLSelectElement>) : void => {
    setQuizTag(event.target.value);
  };

  // Appel API: récupère la liste des catégories/tags
  const getTags = async () => {
    try {
      const response = await axiosInstance.get('/tag');
      // Si pas de réponse 200 envoi erreur
      if (response.status !== 200) {
        throw new Error();
      }
      // met à jour le state avec les données envoyées par l'API
      setTags(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Récupère la liste des tags si le tag du quiz n'est pas sélectionné dans le menu déroulant
  useEffect(() => {
    // si tag/catégorie n'est pas sélectionné, faire un appel APi: récupérer la liste tags
    if (!quizTag) {
      getTags();
    }
  }, [quizTag]);

  // ---- DIFFICULTY/NIVEAU DE DIFFICULTE DU QUIZ ----
  // Appel API: récupère la liste des catégories/tags

  // Met à jour le state quizTag: selon la catégorie sélectionnée dans le menu déroulant
  const handleChangeLevel = (event: ChangeEvent<HTMLSelectElement>) : void => {
    setQuizLevel(event.target.value);
  };

  const getLevel = async () => {
    try {
      const response = await axiosInstance.get('/level');
      console.log('response', response);
      console.log('response DATA', response.data);
      // Si pas de réponse 200 envoi erreur
      if (response.status !== 200) {
        throw new Error();
      }
      // met à jour le state avec les données envoyées par l'API
      setLevels(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Récupère la liste des niveaux si n'est pas sélectionné dans le menu déroulant
  useEffect(() => {
    // si le niveau n'est pas sélectionné, faire un appel APi
    if (!quizLevel) {
      getLevel();
    }
  }, [quizLevel]);

  return (
    <form action="submit">
      <div className="quiz__creation">
        <div className="quiz__header">
          <h3>Créer un quiz</h3>
          <button type="button" className="quiz__button">Quitter</button>
        </div>
        <div className="quiz__parameter">
          <label htmlFor="category-quiz">Choisissez une catégorie</label>
          <select name="Catégorie" id="category-quiz" className="quiz__selector" onChange={handleChangeTag}>
            <option value="">Merci de choisir une catégorie</option>
            {
                tags.map((tag) => (
                  <option key={tag.id} value={tag.name}>{tag.name}</option>
                ))
            }
          </select>
          <label htmlFor="level-quiz">Choisissez une difficulté</label>
          <select name="level" id="level-quiz" className="quiz__selector" onChange={handleChangeLevel}>
            <option value="">Merci de choisir une difficulté</option>
            {
                levels.map((level) => (
                  <option key={level.id} value={level.name}>{level.name}</option>
                ))
            }
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
            <input
              type="text"
              placeholder="Question"
              className="question__title"
              name="quizQuestion"
              value={quiz.quizQuestion}
              onChange={handleChangeField}
            />
            <fieldset>
              <div className="question-choice">
                {/* réponse 1 */}
                <div className="answer_container">
                  <span className="answer_radio-button">
                    <input type="radio" id="question1-radio1" name="question1-radio" value={quiz.question1Answer} onChange={handleChangeField} />
                    <label htmlFor="question1-radio1" />
                  </span>
                  <span className="answer_input-text">
                    <label htmlFor="question1-answer1" />
                    <input type="text" id="question1-answer1" name="question1Answer1" value={quiz.question1Answer1} onChange={handleChangeField} />
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
                    <input type="text" id="question1-answer2" name="question1Answer2" value={quiz.question1Answer2} onChange={handleChangeField} />
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
                    <input type="text" id="question1-answer3" name="question1Answer3" value={quiz.question1Answer3} onChange={handleChangeField} />
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
                    <input type="text" id="question1-answer4" name="question1Answer4" value={quiz.question1Answer4} onChange={handleChangeField} />
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
