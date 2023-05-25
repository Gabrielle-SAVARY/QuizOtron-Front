import {
  useState, useEffect, ChangeEvent, FormEvent, useCallback,
} from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  FormControl, InputLabel, MenuItem, TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { axiosInstance } from '../../utils/axios';
import { ILevel } from '../../@types/level';
import { IOneQuiz } from '../../@types/quiz';
import { ITag } from '../../@types/tag';
import { QuestionUp, QuizUp } from '../../@types/quizUpdate';
import UpdateQuestion from './UpdateQuestions';
import './styles.scss';
import { IAllQuiz } from '../../@types/quizList';

interface CreateQuizProps {
  tagsList: ITag[];
  levelsList: ILevel[];
  oneQuiz: IOneQuiz
  getQuizDetails: (id: number) => void
  setOneQuiz: (quiz: IOneQuiz) => void
}

function UpdateQuiz({
  tagsList, levelsList, oneQuiz, getQuizDetails, setOneQuiz,
}: CreateQuizProps) {
  // Récupère l'id du quiz sur lequel on a cliqué
  const { id } = useParams();
  const pageId = Number(id);
  const [quizId, setQuizId] = useState<number>(pageId);

  // Quiz en cours
  const userId = useAppSelector((state) => state.user.userId);

  useEffect(() => {
    setQuizId(pageId);
  }, [id, pageId]);

  useEffect(() => {
    getQuizDetails(quizId);
  }, [quizId, getQuizDetails]);

  // errorMessage contient un message d'erreur s'il y a un problème lors du submit par ex
  const [errorMessage, setErrorMessage] = useState('');

  // Stock les informations générale du quiz
  // on affecte l'id de l'utilsiateur dès le chargement de la page
  const [updateQuiz, setUpdateQuiz] = useState<QuizUp>({
    title: '',
    description: '',
    thumbnail: '',
    level_id: 0,
    user_id: 0,
    tag_id: 0,
  });

  useEffect(
    () => {
      setUpdateQuiz((prevState) => ({
        ...prevState,
        title: oneQuiz.title,
        description: oneQuiz.description,
        thumbnail: oneQuiz.thumbnail,
        level_id: oneQuiz.level_id,
        user_id: userId,
        tag_id: 1,
      }));
    },
    [oneQuiz.description, oneQuiz.level_id, oneQuiz.tags, oneQuiz.thumbnail, oneQuiz.title, userId],
  );

  //* -------- STATE --------
  // Stock chaques questions avec ses réponses pour le nouveau quiz
  const [newQuestion1, setNewQuestion1] = useState<QuestionUp>({
    id: 0,
    question: '',
    answers: [
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
    ],
  });

  const [newQuestion2, setNewQuestion2] = useState<QuestionUp>({
    id: 0,
    question: '',
    answers: [
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
    ],
  });

  const [newQuestion3, setNewQuestion3] = useState<QuestionUp>({
    id: 0,
    question: '',
    answers: [
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
    ],
  });

  const [newQuestion4, setNewQuestion4] = useState<QuestionUp>({
    id: 0,
    question: '',
    answers: [
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
    ],
  });

  const [newQuestion5, setNewQuestion5] = useState<QuestionUp>({
    id: 0,
    question: '',
    answers: [
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
    ],
  });
  const [newQuestion6, setNewQuestion6] = useState<QuestionUp>({
    id: 0,
    question: '',
    answers: [
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
    ],
  });
  const [newQuestion7, setNewQuestion7] = useState<QuestionUp>({
    id: 0,
    question: '',
    answers: [
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
    ],
  });
  const [newQuestion8, setNewQuestion8] = useState<QuestionUp>({
    id: 0,
    question: '',
    answers: [
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
    ],
  });
  const [newQuestion9, setNewQuestion9] = useState<QuestionUp>({
    id: 0,
    question: '',
    answers: [
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
    ],
  });
  const [newQuestion10, setNewQuestion10] = useState<QuestionUp>({
    id: 0,
    question: '',
    answers: [
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
      {
        id: 0,
        answer: '',
        is_valid: false,
      },
    ],
  });

  useEffect(() => {
    setNewQuestion1((prevState) => ({
      ...prevState,
      ...oneQuiz.questions[0],
    }));
    setNewQuestion2((prevState) => ({
      ...prevState,
      ...oneQuiz.questions[1],
    }));
    setNewQuestion3((prevState) => ({
      ...prevState,
      ...oneQuiz.questions[2],
    }));
    setNewQuestion4((prevState) => ({
      ...prevState,
      ...oneQuiz.questions[3],
    }));
    setNewQuestion5((prevState) => ({
      ...prevState,
      ...oneQuiz.questions[4],
    }));
    setNewQuestion6((prevState) => ({
      ...prevState,
      ...oneQuiz.questions[5],
    }));
    setNewQuestion7((prevState) => ({
      ...prevState,
      ...oneQuiz.questions[6],
    }));
    setNewQuestion8((prevState) => ({
      ...prevState,
      ...oneQuiz.questions[7],
    }));

    setNewQuestion9((prevState) => ({
      ...prevState,
      ...oneQuiz.questions[8],
    }));

    setNewQuestion10((prevState) => ({
      ...prevState,
      ...oneQuiz.questions[9],
    }));
  }, [oneQuiz.questions]);

  //* -------- GESTION DE LA MISE A JOUR DES INPUTS --------
  // MISE A JOUR DE newQuiz
  const handleChangeQuizData = (
    event:
      | SelectChangeEvent<number>
      | SelectChangeEvent<string>
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
    setErrorMessage('');
    const quizData = { ...updateQuiz } as QuizUp;
    // D'abord on vérifie s'il s'agit du field id ou tag
    if (field === 'tag_id') {
      quizData.tag_id = event.target.value as number;
    } else if (field === 'level_id') {
      quizData.level_id = event.target.value as number;
    } else {
      quizData[field] = event.target.value;
      console.log(' event.target.value', event.target.value);
    }
    setUpdateQuiz(quizData);
  };

  // ENVOIE DU FORMULAIRE A l'API
  // TODO faire les vérifications des champs avant envoi du formulaire + feedback utilisateur
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!updateQuiz.title || updateQuiz.title.length < 3) {
      setErrorMessage(
        'Vous devez ajouter un titre contenant au moins 3 caractères',
      );
    } else if (!updateQuiz.description || updateQuiz.description.length < 5) {
      setErrorMessage(
        'Vous devez ajouter une description contenant au moins 5 caractères',
      );
    } else {
      try {
        const response = await axiosInstance.patch('/quiz/user/update/:id', {
          quiz: updateQuiz,
          questions: [
            newQuestion1,
            newQuestion2,
            newQuestion3,
            newQuestion4,
            newQuestion5,
            newQuestion6,
            newQuestion7,
            newQuestion8,
            newQuestion9,
            newQuestion10,
          ],
        });
        if (response.status !== 200) throw new Error();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // pour le dev pour s'assurer du contenu des states
  // TODO à supprimer en production
  /* useEffect(() => {
    setErrorMessage('');
  }, [updateQuiz, newQuestion1, newQuestion2]); */
  useEffect(() => {
    console.log('updateQuiz', updateQuiz);
  }, [updateQuiz]);
  useEffect(() => {
    console.log('new question 1', newQuestion1);
  }, [newQuestion1]);
  /*   useEffect(() => {
    console.log('new question 2', newQuestion2);
  }, [newQuestion2]); */

  return (
    <div className="quiz__creation">
      <div className="quiz__header">
        <h3>Mise à jour du quiz</h3>
        <button type="button" className="quiz__button">
          Quitter
        </button>
      </div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <fieldset className="quiz__parameter">
          {/* //? ======= Choix de la catégorie========== */}
          <FormControl fullWidth>
            <InputLabel id="label-select-tag">Catégorie</InputLabel>
            <Select
              labelId="label-select-tag"
              id="select-tag"
              label="Catégorie"
              value={updateQuiz.tag_id}
              onChange={(event) => handleChangeQuizData(event, 'tag_id')}
            >
              <MenuItem disabled value="choose option">
                Sélectionner une catégorie
              </MenuItem>
              {tagsList.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* //? ======= Choix de la difficulté========== */}
          <FormControl fullWidth>
            <InputLabel id="label-select-level">Difficulté</InputLabel>
            <Select
              labelId="label-select-level"
              id="select-level"
              label="Difficulté"
              value={updateQuiz.level_id}
              onChange={(event) => handleChangeQuizData(event, 'level_id')}
            >
              <MenuItem disabled value="choose option">
                Sélectionner
              </MenuItem>

              {levelsList.map((level) => (
                <MenuItem key={level.id} value={level.id}>
                  {level.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* //? ======= Choix du titre ========== */}
          <TextField
            id="input-title"
            label="Titre du quiz"
            variant="outlined"
            value={updateQuiz.title}
            onChange={(event) => handleChangeQuizData(event, 'title')}
          />

          {/* //? ======= Choix de la description ========== */}
          <TextField
            id="input-description"
            label="Description du quiz"
            variant="outlined"
            value={updateQuiz.description}
            onChange={(event) => handleChangeQuizData(event, 'description')}
          />

          {/* //? ======= Choix de l'url de l'image ========== */}
          <TextField
            id="input-thumbnail"
            label="Image du quiz"
            variant="outlined"
            value={updateQuiz.thumbnail}
            onChange={(event) => handleChangeQuizData(event, 'thumbnail')}
            helperText="Coller l'url de l'image"
          />
        </fieldset>

        <fieldset className="quiz__questions">
          {/* Question 1 */}
          <UpdateQuestion
            questionNumber={1}
            newQuestion={newQuestion1}
            setNewQuestion={setNewQuestion1}
          />
          <UpdateQuestion
            questionNumber={2}
            newQuestion={newQuestion2}
            setNewQuestion={setNewQuestion2}
          />
          <UpdateQuestion
            questionNumber={3}
            newQuestion={newQuestion3}
            setNewQuestion={setNewQuestion3}
          />
          <UpdateQuestion
            questionNumber={4}
            newQuestion={newQuestion4}
            setNewQuestion={setNewQuestion4}
          />
          <UpdateQuestion
            questionNumber={5}
            newQuestion={newQuestion5}
            setNewQuestion={setNewQuestion5}
          />
          <UpdateQuestion
            questionNumber={6}
            newQuestion={newQuestion6}
            setNewQuestion={setNewQuestion6}
          />
          <UpdateQuestion
            questionNumber={7}
            newQuestion={newQuestion7}
            setNewQuestion={setNewQuestion7}
          />
          <UpdateQuestion
            questionNumber={8}
            newQuestion={newQuestion8}
            setNewQuestion={setNewQuestion8}
          />
          <UpdateQuestion
            questionNumber={9}
            newQuestion={newQuestion9}
            setNewQuestion={setNewQuestion9}
          />
          <UpdateQuestion
            questionNumber={10}
            newQuestion={newQuestion10}
            setNewQuestion={setNewQuestion10}
          />
        </fieldset>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="quiz__button">
          Modifier le Quiz
        </button>
      </form>
    </div>
  );
}

export default UpdateQuiz;
