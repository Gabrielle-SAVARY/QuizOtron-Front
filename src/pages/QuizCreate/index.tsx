import {
  useState, ChangeEvent, FormEvent,
} from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  FormControl, FormHelperText, InputLabel, MenuItem, TextField,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axios';
import { useAppSelector } from '../../hooks/redux';
import { validateNotEmpty, validationRulesNewQuiz } from '../../utils/validationsRules';
import { validateFormFields, validateQuiz } from '../../utils/validateFormField';
import { IerrorFormNewQuiz } from '../../@types/error';
import { ILevel } from '../../@types/level';
import { ITag } from '../../@types/tag';
import { Question, Quiz } from '../../@types/newQuiz';
import QuestionCreate from './QuestionCreate';
import './styles.scss';
// TODO supprimer les consoles log

interface QuizCreateProps {
  tagsList: ITag[]
  levelsList: ILevel[]
  fetchQuizList: () => void
}

function QuizCreate({
  tagsList, levelsList, fetchQuizList,
}: QuizCreateProps) {
  const navigate = useNavigate();
  //* STATE
  // Récupère l'id de l'utilisateur dans le reducer user
  const userId = useAppSelector((state) => state.user.userId);
  // errorMessage contient un message d'erreur s'il y a un problème lors du submit du formulaire
  const [errorMessage, setErrorMessage] = useState('');

  // Stock les informations générale du quiz (state à envoyer au back)
  // on affecte l'id de l'utilsateur à partir du state
  const [newQuiz, setNewQuiz] = useState<Quiz>({
    title: '',
    description: '',
    thumbnail: '',
    level_id: 0,
    user_id: userId,
    tag_id: 0,
  });
  // Stock les messages d'erreur des inputs (texte et select) du formulaire - repéré par le frontEnd
  const [errorInputMsg, setErrorInputMsg] = useState<IerrorFormNewQuiz>({});

  //* -------- STATE QUESTIONS DU NOUVEAU QUIZ--------
  // Stock chaques questions avec ses réponses pour le nouveau quiz: 1 state par question
  // on initialise les states à vide
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
  //* MISE A JOUR DE newQuiz
  const handleChangeQuizData = (
    event: SelectChangeEvent<number> |
    SelectChangeEvent<string> |
    ChangeEvent<HTMLInputElement |
    HTMLTextAreaElement>,
    field: string,
  ) => {
    const quizData = { ...newQuiz } as Quiz;
    // D'abord on vérifie s'il s'agit du field ou d'un champs id
    if (field === 'tag_id') {
      quizData.tag_id = event.target.value as number;
    } else if (field === 'level_id') {
      quizData.level_id = event.target.value as number;
    } else {
      quizData[field] = event.target.value;
    }
    // On met à jour le state newQuiz
    setNewQuiz(quizData);
    // Réinitialise le message d'erreur de l'input
    setErrorInputMsg({ ...errorInputMsg, [field]: '' });
  };

  //* ENVOIE DU FORMULAIRE A l'API
  //* Envoi du formulaire au backend si aucune erreur
  const handleFormSubmit = async (errors: { [key: string]: string }) => {
    // Renvoi un tableau contenant les clés (propriétés) de l'objet errors
    // et on vérifie sa longueur
    // Si vide alors pas d'erreur: faire la requête POST au backend
    if (Object.keys(errors).length === 0) {
    // Envoi des données au back
    // On affecte le state newQuiz à quiz
    // On affecte un tablleau des states des questions à questions
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

        // On met à jour le state quizList
        fetchQuizList();
        // On redirige vers la page de profile
        navigate('/profile/quiz');
      } catch (error) {
        console.error(error);
      }
    }
  };
  // TODO faire les vérifications des champs avant envoi du formulaire + feedback utilisateur
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Typepage de l'event.target
    const form = event.target as HTMLFormElement;
    console.log('form.title', form.title);
    console.log('form.question1', form.question1);
    console.log('form.question1', form.answer1Q1);

    // Résultat de la validation des champs du formulaire
    // errors: objet vide ou contient les messages d'erreurs
    const errors = {
      ...validateFormFields(form, validationRulesNewQuiz),
      ...validateQuiz(form, 'question', validateNotEmpty),
      ...validateQuiz(form, 'answer', validateNotEmpty),
    };
    console.log('TOTAL !!!!! errors', errors);

    // Mise à jour du state avec les messages d'erreurs (asynchrone): affichage des erreurs frontend
    setErrorInputMsg((prevState) => ({ ...prevState, ...errors }));

    // Gère la soumission du formulaire
    handleFormSubmit(errors);
  };

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
      <div>tous les champs sont obligatories</div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <fieldset className="quiz__parameter">

          {/* //? ======= Choix de la catégorie========== */}
          <FormControl
            required
            error={
            errorInputMsg.tag_id !== undefined
            && errorInputMsg.tag_id !== ''
            }
          >
            <InputLabel id="label-select-tag">Catégorie</InputLabel>
            <Select
              labelId="label-select-tag"
              id="select-tag"
              label="Catégorie"
              defaultValue="choose option"
              onChange={(event) => handleChangeQuizData(event, 'tag_id')}
              className="select-tag"
              name="tag_id"
            >
              <MenuItem disabled value="choose option">Sélectionner une catégorie</MenuItem>
              {tagsList.map((tag) => (
                <MenuItem key={tag.id} value={tag.id} className="select-tag">{tag.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {
              errorInputMsg.tag_id !== undefined
              && errorInputMsg.tag_id !== ''
                ? errorInputMsg.tag_id
                : 'selectionner une catégorie'
              }
            </FormHelperText>
          </FormControl>

          {/* //? ======= Choix de la difficulté========== */}
          <FormControl
            required
            error={
            errorInputMsg.level_id !== undefined
            && errorInputMsg.level_id !== ''
            }
          >
            <InputLabel id="label-select-level">Difficulté</InputLabel>
            <Select
              labelId="label-select-level"
              id="select-level"
              label="Difficulté"
              defaultValue="choose option"
              onChange={(event) => handleChangeQuizData(event, 'level_id')}
              required
              name="level_id"
            >
              <MenuItem disabled value="choose option">Sélectionner niveau de difficulté</MenuItem>
              {
                levelsList.map((level) => (
                  <MenuItem key={level.id} value={level.id}>{level.name}</MenuItem>
                ))
              }
            </Select>
            <FormHelperText>
              {
              errorInputMsg.level_id !== undefined
              && errorInputMsg.level_id !== ''
                ? errorInputMsg.level_id
                : 'selectionner un niveau de difficulté'
              }
            </FormHelperText>
          </FormControl>

          {/* //? ======= Choix du titre ========== */}
          <TextField
            id="input-title"
            label="Titre du quiz"
            variant="outlined"
            onChange={(event) => handleChangeQuizData(event, 'title')}
            name="title"
            fullWidth
            error={
              errorInputMsg.title !== undefined
              && errorInputMsg.title !== ''
            }
            helperText={
              errorInputMsg.title !== undefined
              && errorInputMsg.title !== ''
                ? errorInputMsg.title
                : `${newQuiz.title.length}/150 caractères maximum`
            }
          />

          {/* //? ======= Choix de la description ========== */}
          <TextField
            id="input-description"
            label="Description du quiz"
            variant="outlined"
            onChange={(event) => handleChangeQuizData(event, 'description')}
            name="description"
            fullWidth
            multiline
            rows={4}
            error={
              errorInputMsg.description !== undefined
              && errorInputMsg.description !== ''
            }
            helperText={
              errorInputMsg.description !== undefined
              && errorInputMsg.description !== ''
                ? errorInputMsg.description
                : `${newQuiz.description.length}/300 caractères maximum`
            }
          />

          {/* //? ======= Choix de l'url de l'image ========== */}
          <TextField
            id="input-thumbnail"
            label="Image du quiz"
            variant="outlined"
            onChange={(event) => handleChangeQuizData(event, 'thumbnail')}
            name="thumbnail"
            fullWidth
            error={
              errorInputMsg.thumbnail !== undefined
              && errorInputMsg.thumbnail !== ''
            }
            helperText={errorInputMsg.thumbnail !== undefined
              && errorInputMsg.thumbnail !== ''
              ? errorInputMsg.thumbnail
              : 'Coller l\'url de l\'image'}
          />

        </fieldset>

        <fieldset className="quiz__questions">
          {/* Question 1 */}
          <QuestionCreate
            questionNumber={1}
            newQuestion={newQuestion1}
            setNewQuestion={setNewQuestion1}
            errorInputMsg={errorInputMsg}
            setErrorInputMsg={setErrorInputMsg}
          />
          <QuestionCreate
            questionNumber={2}
            newQuestion={newQuestion2}
            setNewQuestion={setNewQuestion2}
            errorInputMsg={errorInputMsg}
            setErrorInputMsg={setErrorInputMsg}
          />
          <QuestionCreate
            questionNumber={3}
            newQuestion={newQuestion3}
            setNewQuestion={setNewQuestion3}
            errorInputMsg={errorInputMsg}
            setErrorInputMsg={setErrorInputMsg}
          />
          <QuestionCreate
            questionNumber={4}
            newQuestion={newQuestion4}
            setNewQuestion={setNewQuestion4}
            errorInputMsg={errorInputMsg}
            setErrorInputMsg={setErrorInputMsg}
          />
          <QuestionCreate
            questionNumber={5}
            newQuestion={newQuestion5}
            setNewQuestion={setNewQuestion5}
            errorInputMsg={errorInputMsg}
            setErrorInputMsg={setErrorInputMsg}
          />
          <QuestionCreate
            questionNumber={6}
            newQuestion={newQuestion6}
            setNewQuestion={setNewQuestion6}
            errorInputMsg={errorInputMsg}
            setErrorInputMsg={setErrorInputMsg}
          />
          <QuestionCreate
            questionNumber={7}
            newQuestion={newQuestion7}
            setNewQuestion={setNewQuestion7}
            errorInputMsg={errorInputMsg}
            setErrorInputMsg={setErrorInputMsg}
          />
          <QuestionCreate
            questionNumber={8}
            newQuestion={newQuestion8}
            setNewQuestion={setNewQuestion8}
            errorInputMsg={errorInputMsg}
            setErrorInputMsg={setErrorInputMsg}
          />
          <QuestionCreate
            questionNumber={9}
            newQuestion={newQuestion9}
            setNewQuestion={setNewQuestion9}
            errorInputMsg={errorInputMsg}
            setErrorInputMsg={setErrorInputMsg}
          />
          <QuestionCreate
            questionNumber={10}
            newQuestion={newQuestion10}
            setNewQuestion={setNewQuestion10}
            errorInputMsg={errorInputMsg}
            setErrorInputMsg={setErrorInputMsg}
          />
        </fieldset>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="quiz__button">Créer le Quiz</button>
      </form>
    </div>
  );
}

export default QuizCreate;
