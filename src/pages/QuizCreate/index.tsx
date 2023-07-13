import {  useState, ChangeEvent, FormEvent, useCallback, SyntheticEvent} from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from '../../utils/axios';
import { useAppSelector } from '../../hooks/redux';
import { FiArrowLeft } from 'react-icons/fi';
import { initialNewQuestions, initialQuestionErrors, numberOfQuestions} from '../../utils/createModels';
import { validationRulesNewQuiz, validationRulesSelect } from '../../utils/validationsRules';
import { validateTextFields, validateMenuSelect, validateQuestions } from '../../utils/validateFormField';
import { updateAnswerError, updateAnswerValue, updateQuestionUpError, updateQuestionValue, updateRadioBtn, updateRadioBtnError } from '../../utils/formQuizCreate';
import { IerrorFormNewQuiz} from '../../@types/error';
import { ILevel } from '../../@types/level';
import { ITag } from '../../@types/tag';
import { Question, Quiz } from '../../@types/newQuiz';
import QuestionCreate from './QuestionCreate';
import QuizInfoTextInput from '../../components/QuizTextInput';
import QuizMenuDropDown from '../../components/QuizMenuDropDown';
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
  //* STATE
  // Récupère l'id de l'utilisateur dans le reducer user
  const userId = useAppSelector((state) => state.user.userId);
    // Alerte présence d'erreur avant envoi ou erreur 400 du backend 
    const [errorWarnCreateQuiz, setErrorWarnCreateQuiz] = useState<string>('');
    // Stocke le message de succès de mise à jour du quiz
    const [successCreateQuiz, setSuccessCreateQuiz] = useState<string>('');
  
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
  const [errorsNewQuiz, setErrorsNewQuiz] = useState<IerrorFormNewQuiz>({
    title: '',
    description: '',
    thumbnail: '',
    level_id: '',
    tag_id: '',
    questions: initialQuestionErrors(numberOfQuestions),
  });

  //* Mise à jour du state des infos du quiz lors de la modification des champs du formulaire
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
    setErrorsNewQuiz({ 
      ...errorsNewQuiz,
       [field]: '' 
      });
  };

  //* Mise à jour du state des questions lors de la modification des champs du formulaire
  // Modification du champs d'une question
  const handleChangeQuestion = (event: SyntheticEvent<Element, Event>, indexQuestion: number) => {
    // Récupère et type la cible de l'événement
    const target = event.target as HTMLInputElement;
    // Récupère la valeur de l'input et mise à jour du state
    const newValue = target.value;
    setNewQuestions((newQuestions: Question[]) => updateQuestionValue(newQuestions, indexQuestion, newValue));
    // Mise à jour du state errors
    setErrorQuestion(indexQuestion);
  };    

  // Modification du champs d'une réponse
  const handleChangeAnswer = useCallback(
    (event: SyntheticEvent<Element, Event>,indexQuestion: number,indexAnswer: number) => {
    // Récupère et type la cible de l'évenement
    const target = event.target as HTMLInputElement;
    // Récupère la valeur de l'input et mise à jour du state 
    const newValue = target.value;
    setNewQuestions((newQuestions: Question[]) => updateAnswerValue(newQuestions, indexQuestion, indexAnswer, newValue));
    // Mise à jour du state des erreurs
    setErrorAnswer(indexQuestion, indexAnswer);
    },[]
  );

  // Sélection d'un bouton radio
  const handleChangeRadioBtn = useCallback((indexQuestion: number,indexAnswer: number) => {
    // Mise à jour du state 
    setNewQuestions((newQuestions: Question[]) => updateRadioBtn(newQuestions, indexQuestion, indexAnswer));
    // Mise à jour du state des erreurs
    setErrorRadio(indexQuestion);
    },
    []
  );

  //* Mises à jour du state des erreurs: suppression du message d'erreur lors de la modification d'un champs
  // Modification d'un champ question
  const setErrorQuestion=(indexQuestion: number) => {
    setErrorsNewQuiz((errorsNewQuiz: IerrorFormNewQuiz) => updateQuestionUpError(errorsNewQuiz, indexQuestion));
  };

 // Modification d'un champ réponse
  const setErrorAnswer =(indexQuestion: number, indexAnswer: number, ) => {
    setErrorsNewQuiz((errorsNewQuiz: IerrorFormNewQuiz) => updateAnswerError(errorsNewQuiz, indexQuestion, indexAnswer));
  };

  // Sélection d'un bouton radio
  const setErrorRadio =(indexQuestion: number) => {
    setErrorsNewQuiz((errorsNewQuiz: IerrorFormNewQuiz) => updateRadioBtnError(errorsNewQuiz, indexQuestion));
  };

  
  //* Envoi du formulaire si aucune erreur
  const handleFormSubmit = async () => {
      try {
        const response = await axiosInstance.post('/quiz/user/create', {
          quiz: newQuiz,
          questions: newQuestions,
        });
        if (response.status !== 200) throw new Error();
        // Rappel de la liste des quizs pour mise à jour du state quizList
        fetchQuizList();
        // Message de succès: création du quiz
        setSuccessCreateQuiz('Le quiz a été créé avec succès.');
      } catch (error) {
        // Si statut 400 envoi d'un message d'erreur
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 400) {
            console.log('error.response',error.response);
            const newErrorMsg = "Une erreur s'est produite lors de la création du quiz. Vérifier tous les champs du formulaires sont remplis ou sélectionnés. Si l'erreur persiste veuillez contacter le support.";
            setErrorWarnCreateQuiz(newErrorMsg);        
          }
        } else {
          console.error(error);
        }
        throw error;      
    }
  };

  //* Gère la validation des données et déclenche la soumission du formulaire
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //* Vide le state du message de succès + state alerte des erreurs
    setSuccessCreateQuiz('');
    setErrorWarnCreateQuiz('');
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
    setErrorsNewQuiz(errors);
    
     //* Soumission du formulaire si aucune erreur
    // eslint-disable-next-line no-unneeded-ternary
    const isAllowToSubmit = (!fieldsErrors.hasError
      && !menuSelectErrors.hasError && !questionsErrors.hasError) ? true : false;
    if (isAllowToSubmit){
      handleFormSubmit();
    }else {
      setErrorWarnCreateQuiz('Il y a une ou des erreurs qui empêchent la soumission du formulaire. Veuillez vérifier les champs du formulaire, les erreurs seront indiquées en rouge.');
    }
  };

  return (
    <div className="quiz-create">
      <div className="quiz-create__header">
        <h3 className="quiz-create__header-title">Créer un quiz</h3>
        <Link to="/profile/quiz">
          <button type="button" className="quiz-create__btn-exit">
          <FiArrowLeft/>Retour
          </button>
        </Link>
      <p>tous les champs sont obligatoires</p>
      </div>
      <form
        className="quiz-create__form" 
        onSubmit={(event) => handleSubmit(event)}>
        <fieldset className="quiz-create__parameter">

          {/* //? ======= Choix de la catégorie========== */}
          <QuizMenuDropDown
          arrayList={tagsList}
          item='tag'
          inputLabel='catégorie'
          inputValue={newQuiz.tag_id}
          inputError={errorsNewQuiz.tag_id}
          defaultMessage='Sélectionner une catégorie'
          handleChange={handleChangeQuizData}
          />

          {/* //? ======= Choix de la difficulté========== */}
          <QuizMenuDropDown
          arrayList={levelsList}
          item='level'
          inputLabel='niveau de difficulté'
          inputValue={newQuiz.level_id}
          inputError={errorsNewQuiz.level_id}
          defaultMessage='Sélectionner un niveau de difficulté'
          handleChange={handleChangeQuizData}
          />
         
          {/* //? ======= Choix du titre ========== */}
          <QuizInfoTextInput 
            inputName='title'
            inputLabel='titre'
            inputValue={newQuiz.title}
            inputError={errorsNewQuiz.title}
            defaultMessage={`${newQuiz.title.length}/150 caractères maximum`}
            handleChangeQuizData={handleChangeQuizData}
          />
          
          {/* //? ======= Choix de la description ========== */}
          <QuizInfoTextInput
            inputName='description'
            inputLabel='description'
            inputValue={newQuiz.description}
            inputError={errorsNewQuiz.description}
            defaultMessage={`${newQuiz.description.length}/300 caractères maximum`}
            handleChangeQuizData={handleChangeQuizData}
          />
         
          {/* //? ======= Choix de l'url de l'image ========== */}
          <QuizInfoTextInput
            inputName='thumbnail'
            inputLabel='image'
            inputValue={newQuiz.thumbnail}
            inputError={errorsNewQuiz.thumbnail}
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
              currentQuestionError={errorsNewQuiz.questions[index]}
              onChangeQuestion={handleChangeQuestion}
              handleChangeAnswer={handleChangeAnswer}
              handleChangeRadioBtn={handleChangeRadioBtn}
            />
          ))}
        </fieldset>
        <button type="submit" className="quiz-create__btn-submit">Créer le Quiz</button>
      </form>
        {errorWarnCreateQuiz !== '' && <div className="error-message">{errorWarnCreateQuiz}</div>}
        {successCreateQuiz !== '' &&
        <div className="success-message">
          {successCreateQuiz}          
          <Link to="/profile/quiz">
          Retour à la gestion des quiz.
          </Link>
        </div>
      }
    </div>
  );
}

export default QuizCreate;
