import {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  FormControl, InputLabel, MenuItem, TextField,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axios';
import { useAppSelector } from '../../hooks/redux';
import { ILevel } from '../../@types/level';
import { ITag } from '../../@types/tag';
import { Question, Quiz } from '../../@types/newQuiz';
import QuestionCreate from './QuestionCreate';
import './styles.scss';

interface QuizCreateProps {
  tagsList: ITag[]
  levelsList: ILevel[]
  fetchQuizList: () => void
}

function QuizCreate({
  tagsList, levelsList, fetchQuizList,
}: QuizCreateProps) {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.user.userId);

  // errorMessage contient un message d'erreur s'il y a un problème lors du submit par ex
  const [errorMessage, setErrorMessage] = useState('');

  // Stock les informations générale du quiz
  // on affecte l'id de l'utilsiateur dès le chargement de la page
  const [newQuiz, setNewQuiz] = useState<Quiz>({
    title: '',
    description: '',
    thumbnail: '',
    level_id: 0,
    user_id: userId,
    tag_id: 0,
  });

  //* -------- STATE --------
  // Stock chaques questions avec ses réponses pour le nouveau quiz
  const [newQuestion1, setNewQuestion1] = useState<Question>({
    question: '',
    answers: [
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
    ],
  });
  const [newQuestion2, setNewQuestion2] = useState<Question>({
    question: '',
    answers: [
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
    ],
  });
  const [newQuestion3, setNewQuestion3] = useState<Question>({
    question: '',
    answers: [
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
    ],
  });
  const [newQuestion4, setNewQuestion4] = useState<Question>({
    question: '',
    answers: [
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
    ],
  });
  const [newQuestion5, setNewQuestion5] = useState<Question>({
    question: '',
    answers: [
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
    ],
  });
  const [newQuestion6, setNewQuestion6] = useState<Question>({
    question: '',
    answers: [
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
    ],
  });
  const [newQuestion7, setNewQuestion7] = useState<Question>({
    question: '',
    answers: [
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
    ],
  });
  const [newQuestion8, setNewQuestion8] = useState<Question>({
    question: '',
    answers: [
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
    ],
  });
  const [newQuestion9, setNewQuestion9] = useState<Question>({
    question: '',
    answers: [
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
    ],
  });
  const [newQuestion10, setNewQuestion10] = useState<Question>({
    question: '',
    answers: [
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
      {
        answer: '',
        is_valid: false,
      },
    ],
  });

  //* -------- GESTION DE LA MISE A JOUR DES INPUTS --------
  // MISE A JOUR DE newQuiz
  const handleChangeQuizData = (
    event: SelectChangeEvent<number> |
    SelectChangeEvent<string> |
    ChangeEvent<HTMLInputElement |
    HTMLTextAreaElement>,
    field: string,
  ) => {
    setErrorMessage('');
    const quizData = { ...newQuiz } as Quiz;
    // D'abord on vérifie s'il s'agit du field id ou tag
    if (field === 'tag_id') {
      quizData.tag_id = event.target.value as number;
    } else if (field === 'level_id') {
      quizData.level_id = event.target.value as number;
    } else {
      quizData[field] = event.target.value;
    }
    setNewQuiz(quizData);
  };

  // ENVOIE DU FORMULAIRE A l'API
  // TODO faire les vérifications des champs avant envoi du formulaire + feedback utilisateur
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newQuiz.title || newQuiz.title.length < 3) {
      setErrorMessage('Vous devez ajouter un titre contenant au moins 3 caractères');
    } else if (!newQuiz.description || newQuiz.description.length < 5) {
      setErrorMessage('Vous devez ajouter une description contenant au moins 5 caractères');
    } else {
      try {
        const response = await axiosInstance.post('/quiz/user/create', {
          quiz: newQuiz,
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
        fetchQuizList();
        navigate('/profile/quiz');
      } catch (error) {
        console.error(error);
      }
    }
  };

  // pour le dev pour s'assurer du contenu des states
  // TODO à supprimer en production
  useEffect(() => {
    setErrorMessage('');
  }, [newQuiz, newQuestion1, newQuestion2]);
  useEffect(() => {
  }, [newQuiz]);
  useEffect(() => {
  }, [newQuestion1]);
  useEffect(() => {
  }, [newQuestion2]);

  return (
    <div className="quiz__creation">
      <div className="quiz__header">
        <h3>Créer un quiz</h3>
        <Link to="/profile/quiz">
          <button type="button" className="quiz__button">
            Quitter
          </button>
        </Link>
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
              defaultValue="choose option"
              onChange={(event) => handleChangeQuizData(event, 'tag_id')}
            >
              <MenuItem disabled value="choose option">Sélectionner une catégorie</MenuItem>
              {tagsList.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>{tag.name}</MenuItem>
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
              defaultValue="choose option"
              onChange={(event) => handleChangeQuizData(event, 'level_id')}
            >
              <MenuItem disabled value="choose option">Sélectionner un niveau</MenuItem>
              {
                levelsList.map((level) => (
                  <MenuItem key={level.id} value={level.id}>{level.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>

          {/* //? ======= Choix du titre ========== */}
          <TextField
            id="input-title"
            label="Titre du quiz"
            variant="outlined"
            onChange={(event) => handleChangeQuizData(event, 'title')}
          />

          {/* //? ======= Choix de la description ========== */}
          <TextField
            id="input-description"
            label="Description du quiz"
            variant="outlined"
            onChange={(event) => handleChangeQuizData(event, 'description')}
          />

          {/* //? ======= Choix de l'url de l'image ========== */}
          <TextField
            id="input-thumbnail"
            label="Image du quiz"
            variant="outlined"
            onChange={(event) => handleChangeQuizData(event, 'thumbnail')}
            helperText="Coller l'url de l'image"
          />

        </fieldset>

        <fieldset className="quiz__questions">
          {/* Question 1 */}
          <QuestionCreate
            questionNumber={1}
            newQuestion={newQuestion1}
            setNewQuestion={setNewQuestion1}
          />
          <QuestionCreate
            questionNumber={2}
            newQuestion={newQuestion2}
            setNewQuestion={setNewQuestion2}
          />
          <QuestionCreate
            questionNumber={3}
            newQuestion={newQuestion3}
            setNewQuestion={setNewQuestion3}
          />
          <QuestionCreate
            questionNumber={4}
            newQuestion={newQuestion4}
            setNewQuestion={setNewQuestion4}
          />
          <QuestionCreate
            questionNumber={5}
            newQuestion={newQuestion5}
            setNewQuestion={setNewQuestion5}
          />
          <QuestionCreate
            questionNumber={6}
            newQuestion={newQuestion6}
            setNewQuestion={setNewQuestion6}
          />
          <QuestionCreate
            questionNumber={7}
            newQuestion={newQuestion7}
            setNewQuestion={setNewQuestion7}
          />
          <QuestionCreate
            questionNumber={8}
            newQuestion={newQuestion8}
            setNewQuestion={setNewQuestion8}
          />
          <QuestionCreate
            questionNumber={9}
            newQuestion={newQuestion9}
            setNewQuestion={setNewQuestion9}
          />
          <QuestionCreate
            questionNumber={10}
            newQuestion={newQuestion10}
            setNewQuestion={setNewQuestion10}
          />
        </fieldset>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="quiz__button">Créer le Quiz</button>
      </form>
    </div>
  );
}

export default QuizCreate;
