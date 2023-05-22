import {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  FormControl, InputLabel, MenuItem, TextField,
} from '@mui/material';
import { ITag } from '../../@types/tag';
import './styles.scss';
import { Question, Quiz } from '../../@types/newQuiz';
import CreateQuestion from './CreateQuestions';
import { ILevel } from '../../@types/level';
import { axiosInstance } from '../../utils/axios';

interface CreateQuizProps {
  tagsList: ITag[]
  levelsList: ILevel[]
}

function CreateQuiz({
  tagsList, levelsList,
}:CreateQuizProps) {
  // errorMessage contient un message d'erreur s'il y a un problème lors du submit par ex
  const [errorMessage, setErrorMessage] = useState('');
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

  // TODO: récupérer userId avant
  // ENVOIE DU FORMULAIRE A l'API
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
      } catch (error) {
        console.error(error);
      }
    }
  };

  // pour le dev pour s'assurer du contenu des states
  useEffect(() => {
    setErrorMessage('');
  }, [newQuiz, newQuestion1, newQuestion2]);
  useEffect(() => {
    console.log('newQuiz', newQuiz);
  }, [newQuiz]);
  useEffect(() => {
    console.log('new question 1', newQuestion1);
  }, [newQuestion1]);
  useEffect(() => {
    console.log('new question 2', newQuestion2);
  }, [newQuestion2]);

  return (
    <div className="quiz__creation">
      <div className="quiz__header">
        <h3>Créer un quiz</h3>
        <button type="button" className="quiz__button">Quitter</button>
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
              { tagsList.map((tag) => (
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
          <CreateQuestion
            questionNumber={1}
            newQuestion={newQuestion1}
            setNewQuestion={setNewQuestion1}
          />
          <CreateQuestion
            questionNumber={2}
            newQuestion={newQuestion2}
            setNewQuestion={setNewQuestion2}
          />
          <CreateQuestion
            questionNumber={3}
            newQuestion={newQuestion3}
            setNewQuestion={setNewQuestion3}
          />
          <CreateQuestion
            questionNumber={4}
            newQuestion={newQuestion4}
            setNewQuestion={setNewQuestion4}
          />
          <CreateQuestion
            questionNumber={5}
            newQuestion={newQuestion5}
            setNewQuestion={setNewQuestion5}
          />
          <CreateQuestion
            questionNumber={6}
            newQuestion={newQuestion6}
            setNewQuestion={setNewQuestion6}
          />
          <CreateQuestion
            questionNumber={7}
            newQuestion={newQuestion7}
            setNewQuestion={setNewQuestion7}
          />
          <CreateQuestion
            questionNumber={8}
            newQuestion={newQuestion8}
            setNewQuestion={setNewQuestion8}
          />
          <CreateQuestion
            questionNumber={9}
            newQuestion={newQuestion9}
            setNewQuestion={setNewQuestion9}
          />
          <CreateQuestion
            questionNumber={10}
            newQuestion={newQuestion10}
            setNewQuestion={setNewQuestion10}
          />
        </fieldset>
        { errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="quiz__button">Créer le Quiz</button>
      </form>
    </div>
  );
}

export default CreateQuiz;
