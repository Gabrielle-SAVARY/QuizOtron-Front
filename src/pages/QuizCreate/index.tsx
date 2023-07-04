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
import { validationRulesNewQuiz, validationRulesSelect } from '../../utils/validationsRules';
import { validateTextFields, validateMenuSelect, validateQuestions } from '../../utils/validateFormField';
import { IerrorFormNewQuiz, QuestionError } from '../../@types/error';
import { ILevel } from '../../@types/level';
import { ITag } from '../../@types/tag';
import { Question, Quiz } from '../../@types/newQuiz';
import QuestionCreate from './QuestionCreate';
import './styles.scss';
import { initialNewQuestions, initialQuestionErrors } from '../../utils/createModels';
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
  // Nombre de  questions par quiz
  const numberOfQuestions = 10;
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
  const [newQuestions, setNewQuestions] = useState<Question[]>(
    initialNewQuestions(numberOfQuestions),
  );

  // Stock les messages d'erreur du frontend suite à la validation des champs du formulaire
  const [errorInputMsg, setErrorInputMsg] = useState<IerrorFormNewQuiz>({
    title: '',
    description: '',
    thumbnail: '',
    level_id: '',
    tag_id: '',
    questions: initialQuestionErrors(numberOfQuestions),
  });

  // Stock les messages d'erreurs du backend suite à la soumission du formulaire
  const [errorMessage] = useState<string>('');

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

  // Mise à jour desdonnées d'une question: question, réponses, boutons radio
  const handleSetNewQuestions = (questionIndex: number, updatedQuestion: Question) => {
    // Mise à jour du state en remplaçant la question à l'index par la nouvelle question
    setNewQuestions(newQuestions.map((question, index) => {
      if (index === questionIndex) {
        return updatedQuestion;
      }
      return question;
    }));
  };
    // Mise à jour des erreurs d'une question
  const handleSetQuestionsErrors = (questionIndex: number, updatedQuestionError: QuestionError) => {
    // Créer une copie du tableau et remplace avec les nouvelles erreurs sur la question à l'index
    const updatedErrors = errorInputMsg.questions.map((question, index) => {
      if (index === questionIndex) {
        return updatedQuestionError;
      }
      return question;
    });
    // Mise à jour du state
    setErrorInputMsg({
      ...errorInputMsg,
      questions: updatedErrors,
    });
  };

  //* Envoi du formulaire si aucune erreur
  const handleFormSubmit = async (isAllowed: boolean) => {
    // Renvoi un tableau contenant les clés (propriétés) de l'objet errors
    // et on vérifie sa longueur
    // Si vide alors pas d'erreur: faire la requête POST au backend

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

        // On met à jour le state quizList
        fetchQuizList();
        // On redirige vers la page de profile
        navigate('/profile/quiz');
      } catch (error) {
        console.error(error);
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

    //* Rassemble toutes les erreurs dans un nouvel objet
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
    console.log('isAllowToSubmit CREATQUIZ', isAllowToSubmit);

    //* Gère la soumission du formulaire
    handleFormSubmit(isAllowToSubmit);
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
      // Récupère la valeur de l'input et l'affecte à la copie du state
      const newValue = target.value;
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
    },
    []
  );

  // const handleChangeQuestion = useCallback(
  //   (event: SyntheticEvent<Element, Event>, indexQuestion: number) => {
  //   // Récupère et type la cible de l'évenement
  //     const target = event.target as HTMLInputElement;
  //     // Récupère la valeur de l'input et l'affecte à la copie du state
  //     const newValue = target.value;
  //     setNewQuestions((newQuestions: Question[]) => newQuestions.map((questionObject, questionIndex) => {
  //       if (questionIndex === indexQuestion) {
  //         return {
  //           ...questionObject,
  //           question: newValue,           
  //         };
  //       }
  //       return questionObject;
  //     })
  //   );
  //   },
  //   [newQuestions, setNewQuestions],
  // );
  const handleChangeQuestion = useCallback(
    (event: SyntheticEvent<Element, Event>, indexQuestion: number) => {
      // Récupère et type la cible de l'événement
      const target = event.target as HTMLInputElement;
      // Récupère la valeur de l'input et l'affecte à la copie du state
      const newValue = target.value;
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
    },
    []
  );

  const handleChangeRadioBtn = useCallback(
    (
      indexQuestion: number,
      indexAnswer: number
    ) => {
      setNewQuestions((newQuestions: Question[]) =>
        newQuestions.map((question, ) => {          
            return {
              ...question,
              answers: question.answers.map((answer) => {                
                  return {
                    ...answer,
                    is_valid: false,
                  }; 
              }),
            };   
        })
      );

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
              return answer;
            }),
          };
        }
        return question;
      })
    );
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
      </div>
      <div>tous les champs sont obligatoires</div>
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
              questionData={question}
              errorData={errorInputMsg.questions[index]}
              newQuestions={newQuestions}
              errorInputMsg={errorInputMsg}
              handleSetNewQuestions={handleSetNewQuestions}
              handleSetQuestionsErrors={handleSetQuestionsErrors}
              setNewQuestions={setNewQuestions}
              onChangeQuestion={handleChangeQuestion}
              handleChangeAnswer={handleChangeAnswer}
              handleChangeRadioBtn={handleChangeRadioBtn}
            />
          ))}
        </fieldset>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="quiz__button">Créer le Quiz</button>
      </form>
    </div>
  );
}

export default QuizCreate;
