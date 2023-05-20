import {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import { ITag } from '../../@types/tag';
import './styles.scss';
import { Question, Quiz } from '../../@types/newQuiz';
import CreateQuestion from './CreateQuestions';
import { ILevel } from '../../@types/level';

interface CreateQuizProps {
  tagsList: ITag[]
  fetchTags:() => void
  levelsList: ILevel[]
  fetchLevels:() => void
}

function CreateQuiz({
  tagsList, fetchTags, levelsList, fetchLevels,
}:CreateQuizProps) {
  // Stock les informations générale du quiz
  const [newQuiz, setNewQuiz] = useState<Quiz>({
    title: '',
    description: '',
    thumbnail: '',
    level_id: 0,
    user_id: 0,
    tag_id: 0,
  });
  //* -------- STATE --------
  // Stock les questions réponses du nouveau quiz
  const [newQuestions, setNewQuestions] = useState<Question[]>([]);

  //* -------- TAGS/CATEGORIES DU QUIZ --------
  // Récupère la liste des catégorie au chargement de la page
  // TODO ouvrir une issue pour cette erreur de eslint: déssactiver ou useCallback dans App ?
  useEffect(() => {
    fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //* -------- LEVELS/NIVEAUX DU QUIZ --------
  // Récupère la liste des niveaux au chargement de la page
  // TODO ouvrir une issue pour cette erreur de eslint: déssactiver ou useCallback dans App ?
  useEffect(() => {
    fetchLevels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //* -------- GESTION DE LA MISE A JOUR DES INPUTS --------
  // MISE A JOUR DE newQuiz
  const handleChangeQuizData = (
    event: ChangeEvent<HTMLInputElement> |
    ChangeEvent<HTMLSelectElement> |
    ChangeEvent<HTMLTextAreaElement>,
    field: string,
  ) => {
    console.log('event.target', event.target.id);
    const quizData = { ...newQuiz } as Quiz;
    // D'abord on vérifie s'il s'agit du field id ou tag
    // Cherche dans tags/levels l'id correspond puis on l'enregistre dans le state
    if (field === 'tag_id') {
      const foundTag = tagsList.find((tag) => tag.name === event.target.value);
      quizData.tag_id = foundTag?.id;
    } else if (field === 'level_id') {
      const foundLevel = levelsList.find((level) => level.name === event.target.value);
      quizData.level_id = foundLevel?.id;
    } else {
      quizData[field] = event.target.value;
    }
    setNewQuiz(quizData);
  };

  // MISE A JOUR DE newQuestion
  const handleChangeQuestionsData = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    const questionsData = { ...newQuestions };
    questionsData[field] = event.target.value;
    setNewQuestions(questionsData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // on envoie le state newQuiz et newQuestion a l'API
  };

  // pour le dev pour s'assurer du contenu des states
  useEffect(() => {
    console.log('newQuiz', newQuiz);
  }, [newQuiz]);

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="quiz__creation">
        <div className="quiz__header">
          <h3>Créer un quiz</h3>
          <button type="button" className="quiz__button">Quitter</button>
        </div>
        <div className="quiz__parameter">
          <label htmlFor="category-quiz">Choisissez une catégorie</label>
          <select name="Catégorie" id="category-quiz" className="quiz__selector" onChange={(event) => handleChangeQuizData(event, 'tag_id')}>
            <option value="">Merci de choisir une catégorie</option>
            {
                tagsList.map((tag) => (
                  <option key={tag.id} value={tag.name}>
                    {tag.name}
                  </option>
                ))
            }
          </select>
          <label htmlFor="level-quiz">Choisissez une difficulté</label>
          <select name="level" id="level-quiz" className="quiz__selector" onChange={(event) => handleChangeQuizData(event, 'level_id')}>
            <option value="">Merci de choisir une difficulté</option>
            {
                levelsList.map((level) => (
                  <option key={level.name} value={level.name}>{level.name}</option>
                ))
            }
          </select>
          <label htmlFor="title">Choisissez votre titre de quiz</label>
          <input
            type="text"
            placeholder="Titre du quiz"
            className="quiz__selector"
            name="title"
            onChange={(event) => handleChangeQuizData(event, 'title')}
          />
          <label htmlFor="thumbnail">Copier l&apos; url d&apos;une image pour votre quiz</label>
          <input
            type="text"
            placeholder="url image du quiz"
            className="quiz__selector"
            name="thumbnail"
            onChange={(event) => handleChangeQuizData(event, 'thumbnail')}
          />

          <label htmlFor="description">Choisissez votre description de quiz</label>
          <textarea className="quiz__selector" id="" cols={30} rows={10} placeholder="Votre description de quiz..." name="description" onChange={(event) => handleChangeQuizData(event, 'description')} />
        </div>

        {/* QUESTIONS */}
        {/* newQuestions, setNewQuestions */}
        {/* <CreateQuestion questionNumber={1} newQuestions={newQuestions} setNewQuestions={setNewQuestions} />
        <CreateQuestion questionNumber={2} />
        <CreateQuestion questionNumber={3} />
        <CreateQuestion questionNumber={4} />
        <CreateQuestion questionNumber={5} />
        <CreateQuestion questionNumber={6} />
        <CreateQuestion questionNumber={7} />
        <CreateQuestion questionNumber={8} />
        <CreateQuestion questionNumber={9} />
        <CreateQuestion questionNumber={10} /> */}

      </div>
    </form>
  );
}

export default CreateQuiz;
