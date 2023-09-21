import {
  useState, useEffect, ChangeEvent, FormEvent, SyntheticEvent, useCallback,
} from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SelectChangeEvent } from '@mui/material/Select';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { axiosInstance } from '../../utils/axios';
import { handleAxiosErrors } from '../../utils/axiosError';
import { initialQuestionUpErrors, initialUpdateQuestions, numberOfQuestions } from '../../utils/createModels';
import {
  updateAnswerError, updateAnswerUpValue, updateQuestionUpError,
  updateQuestionUpValue, updateRadioBtnUp, updateRadioBtnUpError,
} from '../../utils/formQuizUpdate';
import { validationRulesNewQuiz, validationRulesSelect } from '../../utils/validationsRules';
import { validateMenuSelect, validateQuestionsUp, validateTextFields } from '../../utils/validateFormField';
import { IAxiosError, IerrorFormUpdateQuiz } from '../../@types/error';
import { ILevel } from '../../@types/level';
import { IOneQuiz } from '../../@types/quiz';
import { ITag } from '../../@types/tag';
import { QuestionUp, QuizUp } from '../../@types/quizUpdate';
import BtnExit from '../../components/BtnExit';
import QuizInfoTextInput from '../../components/QuizTextInput';
import QuizMenuDropDown from '../../components/QuizMenuDropDown';
import QuestionUpdate from './QuestionUpdate';
import './styles.scss';

interface QuizUpdateProps {
  tagsList: ITag[];
  levelsList: ILevel[];
  oneQuiz: IOneQuiz
  getQuizDetails: (id: number) => void
  fetchQuizList: () => void
  setSuccessMessage: (successMessage: string) => void;
  setErrorMessage: (value: string) => void;
}

function QuizUpdate({
  tagsList, levelsList, oneQuiz, getQuizDetails, fetchQuizList, setSuccessMessage, setErrorMessage,
}: QuizUpdateProps) {
  //* Récupère l'id du quiz sur lequel on a cliqué
  const { id } = useParams();
  const pageId = Number(id);

  //* STATE
  // Stock l'id du quiz sur lequel on a cliqué
  const [quizId, setQuizId] = useState<number>(pageId);
  // Récupère l'id du user du reducer user
  const userId = useAppSelector((state) => state.user.userId);

  // Stock les informations générale du quiz
  const [updateQuiz, setUpdateQuiz] = useState<QuizUp>({
    title: '',
    description: '',
    thumbnail: '',
    level_id: 0,
    user_id: 0,
    tag_id: 0,
  });

  // Stock le tableau des questions et des réponses du quiz
  const [
    updateQuestions, setUpdateQuestions,
  ] = useState<QuestionUp[]>(initialUpdateQuestions(numberOfQuestions));

  // Stock les messages d'erreur du frontend suite à la validation des champs du formulaire
  const [errorsUpdateQuiz, setErrorsUpdateQuiz] = useState<IerrorFormUpdateQuiz>({
    title: '',
    description: '',
    thumbnail: '',
    level_id: '',
    tag_id: '',
    questions: initialQuestionUpErrors(numberOfQuestions),
  });

  useEffect(() => {
    setQuizId(pageId);
  }, [id, pageId]);

  //* Appel API: on récupère les infos d'un quiz + mise à jour du state oneQuiz
  useEffect(() => {
    getQuizDetails(quizId);
  }, [quizId, getQuizDetails]);

  //* Au chargement de la page après la récupérations des données du quiz
  useEffect(() => {
    // Si oneQuiz existe, on créer une copie du state
    if (oneQuiz.id !== 0) {
      const copyOneQuiz = {
        ...oneQuiz,
        tags: oneQuiz.tags.map((tag) => tag),
        questions: oneQuiz.questions.map(({ quiz_id, ...question }) => ({
          ...question,
          answers: question.answers.map(({ question_id, ...answer }) => answer),
        })),
      };
      // On stocke les infos du quiz dans le state updateQuiz
      setUpdateQuiz({
        title: copyOneQuiz.title,
        description: copyOneQuiz.description,
        thumbnail: copyOneQuiz.thumbnail,
        level_id: copyOneQuiz.level.id,
        user_id: userId,
        tag_id: copyOneQuiz.tags[0].id,
      });
      // On stocke les infos dans le state updateQuestions
      // (on exclu les clés étrangères: quiz_id et question_id)
      setUpdateQuestions(
        copyOneQuiz.questions.map((question) => ({
          id: question.id,
          question: question.question,
          answers: question.answers.map((answer) => ({
            id: answer.id,
            answer: answer.answer,
            is_valid: answer.is_valid,
          })),
        })),
      );
      // On récupère les id des questions er réponses du quiz
      setErrorsUpdateQuiz({
        ...errorsUpdateQuiz,
        questions: copyOneQuiz.questions.map((question) => ({
          id: question.id,
          question: '',
          radioGroup: '',
          answers: question.answers.map((answer) => ({
            id: answer.id,
            answer: '',
          })),
        })),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneQuiz]);

  //* Mise à jour du state des infos du quiz lors de la modification des champs du formulaire
  const handleChangeQuizData = (
    event:
    | SelectChangeEvent<number>
    | SelectChangeEvent<string>
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
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
    // Réinitialise le message d'erreur de l'input
    setErrorsUpdateQuiz({
      ...errorsUpdateQuiz,
      [field]: '',
    });
  };

  //* Mises à jour du state des erreurs:
  //* suppression du message d'erreur lors de la modification d'un champs
  // Modification d'un champ question
  const setErrorQuestion = (idQuestion: number) => {
    setErrorsUpdateQuiz((newErrors: IerrorFormUpdateQuiz) => updateQuestionUpError(
      newErrors,
      idQuestion,
    ));
  };
  // Modification d'un champ réponse
  const setErrorAnswer = (idQuestion: number, idAnswer: number) => {
    setErrorsUpdateQuiz((newErrors: IerrorFormUpdateQuiz) => updateAnswerError(
      newErrors,
      idQuestion,
      idAnswer,
    ));
  };
  // Sélection d'un bouton radio
  const setErrorRadio = (indexQuestion: number) => {
    setErrorsUpdateQuiz((newErrors: IerrorFormUpdateQuiz) => updateRadioBtnUpError(
      newErrors,
      indexQuestion,
    ));
  };

  //* Mise à jour du state des questions lors de la modification des champs du formulaire
  // Modification du champs d'une question
  const handleUpdateQuestion = useCallback((
    event: SyntheticEvent<Element, Event>,
    idQuestion: number,
  ) => {
    // Récupère et type la cible de l'événement
    const target = event.target as HTMLInputElement;
    // Récupère la valeur de l'input et mise à jour du state
    const newValue = target.value;
    setUpdateQuestions((newUpdateQuestions: QuestionUp[]) => updateQuestionUpValue(
      newUpdateQuestions,
      idQuestion,
      newValue,
    ));
    // Mise à jour du state errors
    setErrorQuestion(idQuestion);
  }, []);

  // Modification du champs d'une réponse
  const handleUpdateAnswer = useCallback((
    event: SyntheticEvent<Element, Event>,
    idQuestion: number,
    idAnswer: number,
  ) => {
    // Récupère et type la cible de l'évenement
    const target = event.target as HTMLInputElement;
    // Récupère la valeur de l'input
    const newValue = target.value;
    // Mise à jour du state des
    setUpdateQuestions((newUpdateQuestions: QuestionUp[]) => updateAnswerUpValue(
      newUpdateQuestions,
      idQuestion,
      idAnswer,
      newValue,
    ));
    // Mise à jour du state des erreurs
    setErrorAnswer(idQuestion, idAnswer);
  }, []);

  // Sélection d'un bouton radio
  const handleUpdateRadioBtn = useCallback((idQuestion: number, idAnswer: number) => {
    // Mise à jour du state
    setUpdateQuestions((newUpdateQuestions: QuestionUp[]) => updateRadioBtnUp(
      newUpdateQuestions,
      idQuestion,
      idAnswer,
    ));
    // Mise à jour du state des erreurs
    setErrorRadio(idQuestion);
  }, []);

  //* Envoi du formulaire si aucune erreur
  const handleFormSubmit = async () => {
    try {
      const response = await axiosInstance.patch(`profile/quiz/${quizId}`, {
        quiz: updateQuiz,
        questions: updateQuestions,
      });
      if (response.status !== 200) throw new Error();
      // Rappel de la liste des quizs pour mise à jour du state quizList
      fetchQuizList();
      // Message de succès: mise à jour du quiz
      setSuccessMessage(response.data.message);
      // const newSuccessMsg: string = response.data.message;
      // setSuccessUpdateQuiz(newSuccessMsg);
    } catch (error) {
      const errorAxios = handleAxiosErrors(error as IAxiosError);
      setErrorMessage(errorAxios);
    }
  };

  //* Gère la validation des données et déclenche la soumission du formulaire
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //* Récupération des erreurs du formulaire à partir des states
    // partie informations du quiz: state updateQuiz
    // Erreurs des champs texte
    const dataToValidate = {
      title: updateQuiz.title,
      description: updateQuiz.description,
      thumbnail: updateQuiz.thumbnail,
    };
    // Erreur des menus déroulants
    const menuSelectToValidate = {
      tag_id: updateQuiz.tag_id,
      level_id: updateQuiz.level_id,
    };
    // partie questions du quiz: state updateQuestions
    const quizDataToValidate = [...updateQuestions];

    //* Validation du formulaire
    // Récupère la validations des champs texte et des menus déroulants
    const fieldsErrors = validateTextFields(dataToValidate, validationRulesNewQuiz);
    const menuSelectErrors = validateMenuSelect(menuSelectToValidate, validationRulesSelect);
    // Récupère la validation des questions, réponses et boutons radio
    const questionsErrors = validateQuestionsUp(quizDataToValidate);

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
    setErrorsUpdateQuiz(errors);

    //* Soumission du formulaire si aucune erreur
    // eslint-disable-next-line no-unneeded-ternary
    const isAllowToSubmit = (!fieldsErrors.hasError
    && !menuSelectErrors.hasError && !questionsErrors.hasError) ? true : false;
    console.log('isAllowToSubmit', isAllowToSubmit);
    if (isAllowToSubmit) {
      handleFormSubmit();
    } else {
      setErrorMessage('Des erreurs empêchent la soumission du formulaire. Veuillez corriger les erreurs indiquées en rouge.');
    }
  };

  return (
    <div className="quiz-update">
      {updateQuestions[0].id === 0 ? (
        <div className="quiz-update__loading">
          <p>Chargement du formulaire</p>
          <Box sx={{ size: 40 }}>
            <CircularProgress sx={{ color: '#dd5751' }} />
          </Box>
        </div>
      ) : (
        <>
          <div className="quiz-update__header">
            <div className="quiz-update__header-main">
              <BtnExit redirectionLink="/profil/quiz" />
              <h2 className="quiz-update__header-main__title">Mise à jour du quiz</h2>
            </div>
            <p>tous les champs sont obligatoires</p>
          </div>
          <form
            className="quiz-update__form"
            onSubmit={(event) => handleSubmit(event)}
          >
            <fieldset className="quiz-update__parameter">
              {/* //? ======= Choix de la catégorie========== */}
              {updateQuiz.tag_id !== 0 && (
              <QuizMenuDropDown
                arrayList={tagsList}
                item="tag"
                inputLabel="catégorie"
                inputValue={updateQuiz.tag_id}
                inputError={errorsUpdateQuiz.tag_id}
                defaultMessage="Sélectionner une catégorie"
                handleChange={handleChangeQuizData}
              />
              )}

              {/* //? ======= Choix de la difficulté========== */}
              {updateQuiz.level_id !== 0 && (
              <QuizMenuDropDown
                arrayList={levelsList}
                item="level"
                inputLabel="niveau de difficulté"
                inputValue={updateQuiz.level_id}
                inputError={errorsUpdateQuiz.level_id}
                defaultMessage="Sélectionner un niveau de difficulté"
                handleChange={handleChangeQuizData}
              />
              )}

              {/* //? ======= Choix du titre ========== */}
              <QuizInfoTextInput
                inputName="title"
                inputLabel="titre"
                inputValue={updateQuiz.title}
                inputError={errorsUpdateQuiz.title}
                defaultMessage={`${updateQuiz.title.length}/150 caractères maximum`}
                handleChangeQuizData={handleChangeQuizData}
              />

              {/* //? ======= Choix de la description ========== */}
              <QuizInfoTextInput
                inputName="description"
                inputLabel="description"
                inputValue={updateQuiz.description}
                inputError={errorsUpdateQuiz.description}
                defaultMessage={`${updateQuiz.description.length}/300 caractères maximum`}
                handleChangeQuizData={handleChangeQuizData}
              />

              {/* //? ======= Choix de l'url de l'image ========== */}
              <QuizInfoTextInput
                inputName="thumbnail"
                inputLabel="image"
                inputValue={updateQuiz.thumbnail}
                inputError={errorsUpdateQuiz.thumbnail}
                defaultMessage={'Coller l\'url de l\'image'}
                handleChangeQuizData={handleChangeQuizData}
              />
            </fieldset>
            {updateQuestions[0].id !== 0 && (
            <fieldset className="quiz__questions">
              {updateQuestions.map((question, index) => (
                <QuestionUpdate
                  key={question.id}
                  questionNumber={index + 1}
                  currentQuestion={question}
                  currentQuestionError={errorsUpdateQuiz.questions[index]}
                  onChangeQuestion={handleUpdateQuestion}
                  handleUpdateRadioBtn={handleUpdateRadioBtn}
                  handleUpdateAnswer={handleUpdateAnswer}
                />
              ))}
            </fieldset>
            )}
            <button type="submit" className="quiz-update__btn-submit">
              Modifier le quiz
            </button>
            <Link to="/profil/quiz" className="navigation-link">
              Retour à la gestion des quiz
            </Link>

          </form>
        </>
      )}
    </div>
  );
}

export default QuizUpdate;
