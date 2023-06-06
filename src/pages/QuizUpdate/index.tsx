import {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  FormControl, InputLabel, MenuItem, TextField,
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { axiosInstance } from '../../utils/axios';
import { ILevel } from '../../@types/level';
import { IOneQuiz } from '../../@types/quiz';
import { ITag } from '../../@types/tag';
import { IUpdatedOneQuiz, QuestionUp, QuizUp } from '../../@types/quizUpdate';
import UpdateQuestion from './QuestionUpdate';
import './styles.scss';

interface QuizUpdateProps {
  tagsList: ITag[];
  levelsList: ILevel[];
  oneQuiz: IOneQuiz
  getQuizDetails: (id: number) => void
  fetchQuizList: () => void
}

function QuizUpdate({
  tagsList, levelsList, oneQuiz, getQuizDetails, fetchQuizList,
}: QuizUpdateProps) {
  const navigate = useNavigate();
  //* Récupère l'id du quiz sur lequel on a cliqué
  const { id } = useParams();
  const pageId = Number(id);

  //* STATE
  // Stock l'id du quiz sur lequel on a cliqué
  const [quizId, setQuizId] = useState<number>(pageId);
  // Récupère l'id du user du reducer user
  const userId = useAppSelector((state) => state.user.userId);

  // errorMessage contient un message d'erreur s'il y a un problème lors du submit du formulaire
  const [errorMessage, setErrorMessage] = useState('');

  // Stock les informations générale du quiz sans les clés étrangères: quiz_id, question_id
  // Ces clés étrangères sont présentes dans oneQuiz mais non demandées par le back pour l'update
  const [updatedOneQuiz, setUpdatedOneQuiz] = useState<IUpdatedOneQuiz>({
    id: 0,
    title: '',
    description: '',
    thumbnail: '',
    level_id: 0,
    user_id: 0,
    level: {
      name: '',
    },
    author: {
      pseudo: '',
    },
    tags: [],
    questions: [],
  });

  // Stock les informations générale du quiz (state à envoyer au back)
  // on affecte l'id de l'utilsiateur dès le chargement de la page
  const [updateQuiz, setUpdateQuiz] = useState<QuizUp>({
    title: '',
    description: '',
    thumbnail: '',
    level_id: 0,
    user_id: 0,
    tag_id: 0,
  });

  //* -------- STATE QUESTIONS DU QUIZ A METTRE A JOUR --------
  // Stock chaques questions avec ses réponses pour le nouveau quiz: 1 state par question
  // on initialise les states à vide
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

  //* AU CHARGEMENT DE LA PAGE
  //* On récupère l'id du quiz à parir de l'URL et on stocke dans el state
  useEffect(() => {
    setQuizId(pageId);
  }, [id, pageId]);

  //* Appel API: on récupère les infos d'un quiz + msie à jour du state oneQuiz
  useEffect(() => {
    getQuizDetails(quizId);
  }, [quizId, getQuizDetails]);

  //* On exclu les clé étrangères présentes dans oneQuiz et on stocke les infos dans updatedOneQuiz
  // on exclu quiz_id et question_id pour éviter erreur de violation de clé étrangère
  useEffect(() => {
    // Si oneQuiz existe
    if (oneQuiz.id !== 0) {
      const convertedOneQUiz = {
        ...oneQuiz,
        questions: oneQuiz.questions.map(({ quiz_id, ...question }) => ({
          ...question,
          answers: question.answers.map(({ question_id, ...answer }) => answer),
        })),
      };
      setUpdatedOneQuiz(convertedOneQUiz);
    }
  }, [oneQuiz]);

  //* Mise à jour du state updateQuiz avec les infos du state updatedOneQuiz
  // State updateQuiz sera envoyé au back dans "quiz"
  // utilisé pour avoir des inputs avec des données pré-remplies
  useEffect(() => {
    if (updatedOneQuiz.id !== 0) {
      setUpdateQuiz((prevState) => ({
        ...prevState,
        title: updatedOneQuiz.title,
        description: updatedOneQuiz.description,
        thumbnail: updatedOneQuiz.thumbnail,
        level_id: updatedOneQuiz.level_id,
        user_id: userId,
        tag_id: updatedOneQuiz.tags[0].id,
      }));
    }
  }, [updatedOneQuiz, userId]);

  //* Mise à jour des states newQuestion avec les infos des questions du state updatedOneQuiz
  // State updateQuiz sera envoyé au back dans "questions"
  // utilisé pour avoir des inputs avec des données pré-remplies
  useEffect(() => {
    setNewQuestion1((prevState) => ({
      ...prevState,
      ...updatedOneQuiz.questions[0],
    }));

    setNewQuestion2((prevState) => ({
      ...prevState,
      ...updatedOneQuiz.questions[1],
    }));
    setNewQuestion3((prevState) => ({
      ...prevState,
      ...updatedOneQuiz.questions[2],
    }));
    setNewQuestion4((prevState) => ({
      ...prevState,
      ...updatedOneQuiz.questions[3],
    }));
    setNewQuestion5((prevState) => ({
      ...prevState,
      ...updatedOneQuiz.questions[4],
    }));
    setNewQuestion6((prevState) => ({
      ...prevState,
      ...updatedOneQuiz.questions[5],
    }));
    setNewQuestion7((prevState) => ({
      ...prevState,
      ...updatedOneQuiz.questions[6],
    }));
    setNewQuestion8((prevState) => ({
      ...prevState,
      ...updatedOneQuiz.questions[7],
    }));

    setNewQuestion9((prevState) => ({
      ...prevState,
      ...updatedOneQuiz.questions[8],
    }));
    setNewQuestion10((prevState) => ({
      ...prevState,
      ...updatedOneQuiz.questions[9],
    }));
  }, [updatedOneQuiz.questions]);

  //* -------- GESTION DE LA MISE A JOUR DES INPUTS --------
  // Mise à jour du state updateQuiz
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
    }
    setUpdateQuiz(quizData);
  };

  //* ENVOIE DU FORMULAIRE A l'API
  // TODO faire les vérifications des champs avant envoi du formulaire + feedback utilisateur
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //* Critères à respecter avant d'envoyer aux back les données
    if (!updateQuiz.title || updateQuiz.title.length < 3) {
      setErrorMessage(
        'Vous devez ajouter un titre contenant au moins 3 caractères',
      );
    } else if (!updateQuiz.description || updateQuiz.description.length < 5) {
      setErrorMessage(
        'Vous devez ajouter une description contenant au moins 5 caractères',
      );
    } else {
      // Envoi des données au back
      // On affecte le state newQuiz à quiz
      // On affecte un tablleau des states des questions à questions
      try {
        const response = await axiosInstance.patch(`/quiz/user/update/${quizId}`, {
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

        // On met à jour le state quizList
        fetchQuizList();
        // On redirige vers la page de profile
        navigate('/profile/quiz');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="quiz__creation">
      <div className="quiz__header">
        <h3>Mise à jour du quiz</h3>
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
              value={updateQuiz.tag_id}
              onChange={(event) => handleChangeQuizData(event, 'tag_id')}
              className="select-tag"
            >
              <MenuItem disabled value="choose option">
                Sélectionner une catégorie
              </MenuItem>
              {tagsList.map((tag) => (
                <MenuItem key={tag.id} value={tag.id} className="tags-list">
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
              className="select-level"
            >
              <MenuItem disabled value="choose option">
                Sélectionner
              </MenuItem>

              {levelsList.map((level) => (
                <MenuItem key={level.id} value={level.id} className="levels-list">
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

export default QuizUpdate;
