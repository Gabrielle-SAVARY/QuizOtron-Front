import {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import { ITag } from '../../@types/tag';
import './styles.scss';
import { Question, Quiz } from '../../@types/newQuiz';
import CreateQuestion from './CreateQuestions';

interface CreateQuizProps {
  tags: ITag[]
  fetchTags:() => void
}

function CreateQuiz({ tags, fetchTags }:CreateQuizProps) {
  // Stock les informations générale du quiz
  const [newQuiz, setNewQuiz] = useState<Quiz>({
    title: '',
    description: '',
    thumbnail: '',
    level_id: 0,
    user_id: 0,
    tag_id: 0,
  });
  // Stock les questions réponses du nouveau quiz
  const [newQuestions, setNewQuestions] = useState<Question[]>([]);

  // ---- TAG/CATEGORIE DU QUIZ ----
  // Récupère la liste des catégorie au chargemen de la page
  useEffect(() => {
    fetchTags();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //* GESTION DE LA MISE A JOUR DES INPUTS
  // MISE A JOUR DE newQuiz
  const handleChangeQuizData = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const quizData = { ...newQuiz } as Quiz;
    // D'abord on vérifie s'il s'agit du field id ou tag
    if (field === 'tag') {
      // On cherche dans tags l'id correspondant
      // on l'enregistre dans le state
      quizData.tag_id = field;
    } else if (field === 'level') {
      // On cherche dans levels l'id correspondant
      // on l'enregistre dans le state
      quizData.level_id = field;
    } else {
      quizData[field] = e.target.value;
    }
    setNewQuiz(quizData);
  };

  // MISE A JOUR DE newQuestion
  const handleChangeQuestionsData = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const questionsData = { ...newQuestions };
    questionsData[field] = e.target.value;
    setNewQuestions(questionsData);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // on envoie le state newQuiz et newQuestion a l'API
  };

  // pour le dev pour s'assurer du contenu des states
  useEffect(() => {
    console.log('newQuiz', newQuiz);
  }, [newQuiz]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="quiz__creation">
        <div className="quiz__header">
          <h3>Créer un quiz</h3>
          <button type="button" className="quiz__button">Quitter</button>
        </div>
        <div className="quiz__parameter">
          <label htmlFor="category-quiz">Choisissez une catégorie</label>
          <select name="Catégorie" id="category-quiz" className="quiz__selector" onChange={(e) => handleChangeQuizData(e, 'tag_id')}>
            <option value="">Merci de choisir une catégorie</option>
            {
                tags.map((tag) => (
                  <option key={tag.id} value={tag.name}>{tag.name}</option>
                ))
            }
          </select>
          <label htmlFor="level-quiz">Choisissez une difficulté</label>
          <select name="level" id="level-quiz" className="quiz__selector">
            <option value="">Merci de choisir une difficulté</option>
            {/*             {
                allLevels.map((level) => (
                  <option key={level.name} value={level.name}>{level.name}</option>
                ))
            } */}
          </select>
          <label htmlFor="title">Choisissez votre titre de quiz</label>
          <input
            type="text"
            placeholder="Titre du quiz"
            className="quiz__selector"
            onChange={(e) => handleChangeQuizData(e, 'title')}
          />
          <label htmlFor="thumbnail">Copier l&apos; url d&apos;une image pour votre quiz</label>
          <input
            type="text"
            placeholder="url image du quiz"
            className="quiz__selector"
/*             name={thumbnail}
            onChange={handleChangeFieldThumbnail} */
          />

          <label htmlFor="description">Choisissez votre description de quiz</label>
          <textarea className="quiz__selector" id="" cols={30} rows={10} placeholder="Votre description de quiz..." /* name={description} onChange={handleChangeFieldDescription} */ />
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
