import {
  useState, ChangeEvent, FormEvent, useEffect,
} from 'react';
import { ICreateQuiz, KeysOfICreateQuiz } from '../../@types/quiz';
import { ITag } from '../../@types/tag';

import './styles.scss';
import { axiosInstance } from '../../utils/axios';
import { ILevel } from '../../@types/level';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  FieldNameQuiz,
  changeQuizField,
  changeQuizFieldDescription,
  changeQuizFieldThumbnail,
  changeQuizFieldTitle,
  getLevels, getTags, setQuizLevel, setQuizLevelId, setQuizTag, setQuizTagId,
} from '../../store/reducers/quizCreate';
import CreateQuestion from './CreateQuestions';
import { Question } from '../../@types/newQuiz';

interface CreateQuizProps {
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

  // ---- LEVEL/NIVEAU DE DIFFICULTE DU QUIZ ----
  const allLevels = useAppSelector((state) => state.quizCreate.allLevels);
  console.log('allLevels', allLevels);
  const selectedLevelName = useAppSelector((state) => state.quizCreate.selectedLevelName);

  // récupère la liste des niveaux pour les afficher dans le menu déroulant
  useEffect(() => {
    dispatch(getLevels());
  }, [dispatch]);

  useEffect(() => {
    const findLevelId = () => {
      const foundLevel = allLevels.find((level) => level.name === selectedLevelName);
      if (foundLevel) {
        console.log('foundLevel', foundLevel.id);
        dispatch(setQuizLevelId(foundLevel.id));
      }
    };
    findLevelId();
  }, [allLevels, dispatch, selectedLevelName]);

  // récupère le nom du niveau sélectionnée dans le menu déroulant
  const handleChangeLevel = (event: ChangeEvent<HTMLSelectElement>) : void => {
    const newLevel = event.target.value;
    console.log('newLevel', newLevel);
    dispatch(setQuizLevel(newLevel));
  };

  // Titre, description et thumnail
  const title = useAppSelector((state) => state.quizCreate.quiz.title);
  const description = useAppSelector((state) => state.quizCreate.quiz.description);
  const thumbnail = useAppSelector((state) => state.quizCreate.quiz.thumbnail);

  // Met à jour le state quiz avec la valeur des inputs du formulaire
  const handleChangeFieldTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    dispatch(changeQuizFieldTitle(newValue));
  };
  const handleChangeFieldThumbnail = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    dispatch(changeQuizFieldThumbnail(newValue));
  };
  const handleChangeFieldDescription = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = event.target.value;
    dispatch(changeQuizFieldDescription(newValue));
  };

  // ----- QUESTIONS -----
  const [questions, setQuestions] = useState<Question[]>([]);
  const addEmptyQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        answers: [],
      },
    ]);
  };

  const addEmptyAnswer = (index: number) => {
    const question = questions[index];
    question.answers.push(
      {
        answer: '',
        is_valid: false,
      },
    );
    setQuestions(questions);
  };

  const setAnswer = (questionIndex: number, answerIndex:number, answer:string, is_valid:boolean) => {
    const question = questions[questionIndex];
    console.log('setAnswer - question', question);
    question.answers[answerIndex] = {
      answer,
      is_valid,
    };
    setQuestions(questions);
  };

  const setQuestion = (questionIndex: number, question:string) => {
    questions[questionIndex] = { question, answers: questions[questionIndex].answers };
    console.log('setQuestion - questions', questions);
    setQuestions(questions);
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
          <select name="level" id="level-quiz" className="quiz__selector" onChange={handleChangeLevel}>
            <option value="">Merci de choisir une difficulté</option>
            {
                allLevels.map((level) => (
                  <option key={level.name} value={level.name}>{level.name}</option>
                ))
            }
          </select>
          <label htmlFor="title">Choisissez votre titre de quiz</label>
          <input
            type="text"
            placeholder="Titre du quiz"
            className="quiz__selector"
            name={title}
            onChange={handleChangeFieldTitle}
          />
          <label htmlFor="thumbnail">Copier l&apos; url d&apos;une image pour votre quiz</label>
          <input
            type="text"
            placeholder="url image du quiz"
            name={thumbnail}
            className="quiz__selector"
            onChange={handleChangeFieldThumbnail}
          />

          <label htmlFor="description">Choisissez votre description de quiz</label>
          <textarea className="quiz__selector" name={description} id="" cols={30} rows={10} placeholder="Votre description de quiz..." onChange={handleChangeFieldDescription} />
        </div>

        {/* QUESTIONS */}
        <button type="button" onClick={addEmptyQuestion}>Ajouter une question</button>
        {questions.map((question, questionKey) => (
          <div className="question_container" id={`question${questionKey + 1}`} key={`question-${questionKey}`}>
            <p className="question__number">
              Question n°
              {questionKey + 1}
            </p>
            <input
              type="text"
              placeholder="Question"
              className="question__title"
              name="quizQuestion"
              onChange={(
                event:React.ChangeEvent<HTMLInputElement>,
              ) => setQuestion(questionKey, event.target.value)}
            />
            <fieldset>
              <div className="question-choice">
                <button type="button" onClick={() => addEmptyAnswer(questionKey)}>Ajouter une réponse</button>
                {question.answers.map((answer, answerKey) => (
                  <div className="answer_container" key={`answer-${questionKey}-${answerKey}`}>
                    <span className="answer_radio-button">
                      <input type="radio" id="question1-radio1" name="question1-radio" />
                      <label htmlFor="question1-radio1" />
                    </span>
                    <span className="answer_input-text">
                      <label htmlFor="question1-answer1" />
                      <input type="text" id="question1-answer1" name="question1Answer1" />
                    </span>
                  </div>
                ))}

              </div>
            </fieldset>

          </div>
        ))}

        {/*         <div className="questions__container">

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

        </div> */}

      </div>
    </form>
  );
}

export default CreateQuiz;
