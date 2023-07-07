import {
  useState, ChangeEvent, FormEvent, useCallback, SyntheticEvent
} from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  FormControl, FormHelperText, InputLabel, MenuItem, TextField,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axios';
import { useAppSelector } from '../../hooks/redux';
import { initialNewQuestions, initialQuestionErrors, numberOfQuestions} from '../../utils/createModels';
import { validationRulesNewQuiz, validationRulesSelect } from '../../utils/validationsRules';
import { validateTextFields, validateMenuSelect, validateQuestions } from '../../utils/validateFormField';
import { IerrorFormNewQuiz} from '../../@types/error';
import { ILevel } from '../../@types/level';
import { ITag } from '../../@types/tag';
import { Question, Quiz } from '../../@types/newQuiz';
import QuestionCreate from './QuestionCreate';
import './styles.scss';
import axios from 'axios';
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
  
  // Stock les informations générale du quiz
  const [newQuiz, setNewQuiz] = useState<Quiz>({
    title: '',
    description: '',
    thumbnail: '',
    level_id: 0,
    user_id: userId,
    tag_id: 0,
  });
  
  // Stock le tableau des questions et des réponses du quiz
  const [newQuestions, setNewQuestions] = useState<Question[]>(initialNewQuestions(numberOfQuestions));
  
  // Stock les messages d'erreur du frontend suite à la validation des champs du formulaire
  const [errorInputMsg, setErrorInputMsg] = useState<IerrorFormNewQuiz>({
    title: '',
    description: '',
    thumbnail: '',
    level_id: '',
    tag_id: '',
    questions: initialQuestionErrors(numberOfQuestions),
  });

  // Stocke le message d'erreur du backend suite à une erreur 400 lors de la soumission du formulaire 
  const [errorBackend, setErrorBackend] = useState<string>('');

  //* -------- GESTION DE LA MISE A JOUR DES INPUTS --------
  // Mise à jour de newQuiz: infos du quiz
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

  
  //* Envoi du formulaire si aucune erreur
  const handleFormSubmit = async (isAllowed: boolean) => {
    if (isAllowed) {
      // Envoi des données au back
      // On affecte le state newQuiz à quiz
      // On affecte un tablleau des states des questions à questions
      try {
        const response = await axiosInstance.post('/quiz/user/create', {
          quiz: newQuiz,
          questions: newQuestions,
        });
        if (response.status !== 200) throw new Error();

        // Rappel API de la liste des quiz pour mettre à jour le state et les données
        fetchQuizList();
        // Vide le state des erreurs du backend
        setErrorBackend('');
        // Redirige vers la page de profile
        navigate('/profile/quiz');
      } catch (error) {
        // Gestion des erreurs, si statut 400 envoi d'un message d'erreur
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 400) {
            const newErrorMsg = "Une erreur s'est produite lors de la création du quiz. Vérifier que vous êtes  bien connecté et que tous les champs du formulaires sont remplis ou sélectionnés. Si l'erreur persiste veuillez contacter le support.";
            setErrorBackend(newErrorMsg);        }
        } else {
          console.error(error);
        }
        throw error;
      }
    }
  };

  //* Gère la validation des données et déclenche la soumission du formulaire
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //* Récupération des erreurs du formulaire à partir des states
    // partie informations du quiz: state newQuiz
    // Erreurs des champs texte
    const dataToValidate = {
      title: newQuiz.title,
      description: newQuiz.description,
      thumbnail: newQuiz.thumbnail,
    };
    // Erreur des menus déroulants
    const menuSelectToValidate = {
      tag_id: newQuiz.tag_id,
      level_id: newQuiz.level_id,
    };
    // partie questions du quiz: state newQuestions
    const quizDataToValidate = [...newQuestions];

    //* Validation du formulaire
    // Récupère la validations des champs texte et des menus déroulants
    const fieldsErrors = validateTextFields(dataToValidate, validationRulesNewQuiz);
    const menuSelectErrors = validateMenuSelect(menuSelectToValidate, validationRulesSelect);

    // Récupère la validation des questions, réponses et boutons radio
    const questionsErrors = validateQuestions(quizDataToValidate);

    //*Rassemble toutes les erreurs dans un nouvel objet
    const errors = {
      title: fieldsErrors.errors.title,
      description: fieldsErrors.errors.description,
      thumbnail: fieldsErrors.errors.thumbnail,
      level_id: menuSelectErrors.errors.level_id,
      tag_id: menuSelectErrors.errors.tag_id,
      questions: questionsErrors.errors,
    };
    console.log('TOTAL !!!!! errors', errors);
    // Mise à jour du state avec les messages d'erreurs du frontend
    setErrorInputMsg(errors);
    // eslint-disable-next-line no-unneeded-ternary
    const isAllowToSubmit = (!fieldsErrors.hasError
      && !menuSelectErrors.hasError && !questionsErrors.hasError) ? true : false;

    //*Gère la soumission du formulaire
    handleFormSubmit(isAllowToSubmit);
  };

  //* Mise à jour du state des erreurs si modification d'un champ question
  const setErrorQuestion=(indexQuestion: number) => {
    setErrorInputMsg((errorInputMsg: IerrorFormNewQuiz) => ({
      ...errorInputMsg,
      questions: errorInputMsg.questions.map((questionError, index) => {
        if (index === indexQuestion) {
          return {
            ...questionError,
            question: '',
          };
        }
        return questionError;
      }),
    }));
  };

 //* Mise à jour du state des erreurs si modification d'un champ réponse
 const setErrorAnswer =(indexQuestion: number, indexAnswer: number, ) => {
  setErrorInputMsg((errorInputMsg: IerrorFormNewQuiz) => ({
    ...errorInputMsg,
    questions: errorInputMsg.questions.map((questionError, index) => {
      if (index === indexQuestion) {
        return {
          ...questionError,
          answers: questionError.answers.map((answerError, answerIndex) => {
            if (answerIndex === indexAnswer) {
              return {
                ...answerError,
                answer: '',
              };
            }
            return answerError;
          }),
        };
      }
      return questionError;
    }),
  }));
 };

  //* Mise à jour du state des erreurs si sélection d'un bouton radio
 const setErrorRadio =(indexQuestion: number) => {
  setErrorInputMsg((errorInputMsg: IerrorFormNewQuiz) => ({
    ...errorInputMsg,
    questions: errorInputMsg.questions.map((questionError, index) => {
      if (index === indexQuestion) {
        return {
          ...questionError,
          radioGroup: '',
        };
      }
      return questionError;
    }),
  }));
 };

   //* Mise à jour du champs d'une question
   const handleChangeQuestion = (event: SyntheticEvent<Element, Event>, indexQuestion: number) => {
       // Récupère et type la cible de l'événement
       const target = event.target as HTMLInputElement;
       // Récupère la valeur de l'input et l'affecte à la copie du state
       const newValue = target.value;
       console.log('indexQuestion',indexQuestion);
       setNewQuestions((newQuestions: Question[]) =>
         newQuestions.map((questionObject, questionIndex) => {
           if (questionIndex === indexQuestion) {
             return {
               ...questionObject,
               question: newValue,              
             };
           }
           return questionObject;
         })
       );
        // Mise à jour du state errors
        setErrorQuestion(indexQuestion);
     };    

  //* Mise à jour du champs d'une réponse
  const handleChangeAnswer = useCallback(
  (
    event: SyntheticEvent<Element, Event>,
    indexQuestion: number,
    indexAnswer: number
  ) => {
    // Récupère et type la cible de l'évenement
    const target = event.target as HTMLInputElement;
    // Récupère la valeur de l'input 
    const newValue = target.value;
    // Mise à jour du state
    setNewQuestions((newQuestions: Question[]) =>
      newQuestions.map((question, questionIndex) => {
        if (questionIndex === indexQuestion) {
          return {
            ...question,
            answers: question.answers.map((answer, answerIndex) => {
              if (answerIndex === indexAnswer) {
                return {
                  ...answer,
                  answer: newValue,
                };
              }
              return answer;
            }),
          };
        }
        return question;
      })
    );
    // Mise à jour du state des erreurs
    setErrorAnswer(indexQuestion, indexAnswer);
  },
  []
);

//* Mise à jour sélection d'un bouton radio
  const handleChangeRadioBtn = useCallback(
    (
      indexQuestion: number,
      indexAnswer: number
    ) => {
      setNewQuestions((newQuestions: Question[]) =>
      newQuestions.map((question, questionIndex) => {
        if (questionIndex === indexQuestion) {
          return {
            ...question,
            answers: question.answers.map((answer, answerIndex) => {
              if (answerIndex === indexAnswer) {
                return {
                  ...answer,
                  is_valid: true,
                };
              }
              return   {
                ...answer,
                is_valid: false,
              };
            }),
          };
        }
        return question;
      })
    );
    // Mise à jour du state des erreurs
    setErrorRadio(indexQuestion);
    },
    []
  );
  

  return (
    <div className="quiz__creation">
      <div className="quiz__header">
        <h3>Créer un quiz</h3>
        <Link to="/profile/quiz">
          <button type="button" className="quiz__button">
            Quitter
          </button>
        </Link>
      <p>tous les champs sont obligatoires</p>
      </div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <fieldset className="quiz__parameter">

          {/* //? ======= Choix de la catégorie========== */}
          {newQuiz.tag_id !== 0 && ( 
          <FormControl
            required
            error={
            errorInputMsg.tag_id !== undefined
            && errorInputMsg.tag_id !== ''
            }
          >
            <InputLabel id="label-select-tag">Catégorie</InputLabel>
            <Select
              id="select-tag"
              className="select-tag"
              name="tag_id"
              labelId="label-select-tag"
              label="Catégorie"
              defaultValue="choose option"
              onChange={(event) => handleChangeQuizData(event, 'tag_id')}
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
          )}

          {/* //? ======= Choix de la difficulté========== */}
          {newQuiz.level_id !== 0 && ( 
          <FormControl
            required
            error={
            errorInputMsg.level_id !== undefined
            && errorInputMsg.level_id !== ''
            }
          >
            <InputLabel id="label-select-level">Difficulté</InputLabel>
            <Select
              id="select-level"
              name="level_id"
              label="Difficulté"
              labelId="label-select-level"
              defaultValue="choose option"
              onChange={(event) => handleChangeQuizData(event, 'level_id')}   
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
          )}

          {/* //? ======= Choix du titre ========== */}
          <TextField
            id="input-title"
            label="Titre du quiz"
            variant="outlined"
            name="title"
            value={newQuiz.title}
            onChange={(event) => handleChangeQuizData(event, 'title')}
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
            name="description"
            value={newQuiz.description}
            onChange={(event) => handleChangeQuizData(event, 'description')}
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
            name="thumbnail"
            value={newQuiz.thumbnail}
            onChange={(event) => handleChangeQuizData(event, 'thumbnail')}
            fullWidth
            error={
              errorInputMsg.thumbnail !== undefined
              && errorInputMsg.thumbnail !== ''
            }
            helperText={
              errorInputMsg.thumbnail !== undefined
              && errorInputMsg.thumbnail !== ''
                ? errorInputMsg.thumbnail
                : 'Coller l\'url de l\'image'
            }
          />
        </fieldset>
        <fieldset className="quiz__questions">
          {newQuestions.map((question, index) => (
            <QuestionCreate
              key={`question${index + 1}`}
              questionIndex={index}
              currentQuestion={question}
              currentQuestionError={errorInputMsg.questions[index]}
              onChangeQuestion={handleChangeQuestion}
              handleChangeAnswer={handleChangeAnswer}
              handleChangeRadioBtn={handleChangeRadioBtn}
            />
          ))}
        </fieldset>
        <button type="submit" className="quiz__button">Créer le Quiz</button>
      </form>
        {errorBackend !== '' && <div className="error-message">{errorBackend}</div>}
    </div>
  );
}

export default QuizCreate;
