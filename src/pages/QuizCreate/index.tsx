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
import QuizInfoTextInput from '../../components/QuizTextInput';
import QuizMenuDropDown from '../../components/QuizMenuDropDown';
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
          <QuizMenuDropDown
          arrayList={tagsList}
          item='tag'
          inputLabel='catégorie'
          inputValue={newQuiz.tag_id}
          inputError={errorInputMsg.tag_id}
          defaultMessage='Sélectionner une catégorie'
          handleChange={handleChangeQuizData}
          />

          {/* //? ======= Choix de la difficulté========== */}
          <QuizMenuDropDown
          arrayList={levelsList}
          item='level'
          inputLabel='niveau de difficulté'
          inputValue={newQuiz.level_id}
          inputError={errorInputMsg.level_id}
          defaultMessage='Sélectionner un niveau de difficulté'
          handleChange={handleChangeQuizData}
          />
         
          {/* //? ======= Choix du titre ========== */}
          <QuizInfoTextInput 
            inputName='title'
            inputLabel='titre'
            inputValue={newQuiz.title}
            inputError={errorInputMsg.title}
            defaultMessage={`${newQuiz.title.length}/150 caractères maximum`}
            handleChangeQuizData={handleChangeQuizData}
          />
          
          {/* //? ======= Choix de la description ========== */}
          <QuizInfoTextInput
            inputName='description'
            inputLabel='description'
            inputValue={newQuiz.description}
            inputError={errorInputMsg.description}
            defaultMessage={`${newQuiz.description.length}/300 caractères maximum`}
            handleChangeQuizData={handleChangeQuizData}
          />
         
          {/* //? ======= Choix de l'url de l'image ========== */}
          <QuizInfoTextInput
            inputName='thumbnail'
            inputLabel='image'
            inputValue={newQuiz.thumbnail}
            inputError={errorInputMsg.thumbnail}
            defaultMessage={`Coller l'url de l'image`}
            handleChangeQuizData={handleChangeQuizData}
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
