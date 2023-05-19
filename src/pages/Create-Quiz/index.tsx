import {
  useState, ChangeEvent, FormEvent, useEffect,
} from 'react';
import { ICreateQuiz, KeysOfICreateQuiz } from '../../@types/quiz';
import { ITag } from '../../@types/tag';

import './styles.scss';
import { axiosInstance } from '../../utils/axios';
import { ILevel } from '../../@types/level';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getTags, setQuizTag, setQuizTagId } from '../../store/reducers/quizCreate';

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
  const dispatch = useAppDispatch();

  // ---- TAG/CATEGOERIE DU QUIZ ----
  const allTags = useAppSelector((state) => state.quizCreate.allTags);
  console.log('allTags', allTags);
  const selectedTagName = useAppSelector((state) => state.quizCreate.selectedTagName);

  // récupère la liste des catégories pour les afficher dans le menu déroulant
  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  // récupère l'id de la catégorie sélectionné dans le menu déroulant
  // et met à jour le state: tag_id,
  // se déclenche si le state: selectedTagName est mis à jour
  useEffect(() => {
    const findTagId = () => {
      const foundTag = allTags.find((tag) => tag.name === selectedTagName);
      if (foundTag) {
        console.log('foundTag', foundTag.id);
        dispatch(setQuizTagId(foundTag.id));
      }
    };
    findTagId();
  }, [allTags, dispatch, selectedTagName]);

  // récupère le nom de la catégorie sélectionnée dans le menu déroulant
  const handleChangeTag = (event: ChangeEvent<HTMLSelectElement>) : void => {
    const newTag = event.target.value;
    console.log('newTag', newTag);
    dispatch(setQuizTag(newTag));
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
          <select name="Catégorie" id="category-quiz" className="quiz__selector" onChange={handleChangeTag}>
            <option value="">Merci de choisir une catégorie</option>
            {
                allTags.map((tag) => (
                  <option key={tag.id} value={tag.name}>{tag.name}</option>
                ))
            }
          </select>
          <label htmlFor="level-quiz">Choisissez une difficulté</label>
          <select name="level" id="level-quiz" className="quiz__selector">
            <option value="">Merci de choisir une difficulté</option>
          </select>
          <label htmlFor="titre-quiz">Choisissez votre titre de quiz</label>
          <input
            type="text"
            placeholder="Titre du quiz"
            className="quiz__selector"
            name="quizTitle"

          />

          <label htmlFor="description-quiz">Choisissez votre description de quiz</label>
          <textarea className="quiz__selector" name="quizDescription" id="" cols={30} rows={10} placeholder="Votre description de quiz..." />
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

            />
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
                    <input type="text" id="question1-answer1" name="question1Answer1" />
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
                    <input type="text" id="question1-answer2" name="question1Answer2" />
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
                    <input type="text" id="question1-answer3" name="question1Answer3" />
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
                    <input type="text" id="question1-answer4" name="question1Answer4" />
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
