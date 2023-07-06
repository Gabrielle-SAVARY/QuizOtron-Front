import {
  useState, useEffect, ChangeEvent, FormEvent, SyntheticEvent, useCallback,
} from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  FormControl, FormHelperText, InputLabel, MenuItem, TextField,
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
import { initialQuestionUpErrors, initialUpdateQuestions, numberOfQuestions } from '../../utils/createModels';
import axios from 'axios';
import { IerrorFormUpdateQuiz } from '../../@types/error';
import { validationRulesNewQuiz, validationRulesSelect } from '../../utils/validationsRules';
import { validateMenuSelect, validateQuestions, validateTextFields } from '../../utils/validateFormField';

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
  const [updateQuestions, setUpdateQuestions] = useState<QuestionUp[]>(initialUpdateQuestions(numberOfQuestions));

  // Stocke le message d'erreur du backend lors d'une erreur 400
  const [errorBackend, setErrorBackend] = useState<string>('');

   // Stock les messages d'erreur du frontend suite à la validation des champs du formulaire
   const [errorInputMsg, setErrorInputMsg] = useState<IerrorFormUpdateQuiz>({
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

  //TODO à supprimer ?
  // On exclu les clé étrangères présentes dans oneQuiz et on stocke les infos dans updatedOneQuiz
  // on exclu quiz_id et question_id pour éviter erreur de violation de clé étrangère 
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
      // On stocke les infos dans le state updateQuiz 
      // on conserve uniquement les id pour user_id, level_id, tag_id(uniquement une catégorie MVP)
      setUpdateQuiz({
        title: copyOneQuiz.title,
        description: copyOneQuiz.description,
        thumbnail: copyOneQuiz.thumbnail,
        level_id: copyOneQuiz.level_id,
        user_id: userId,
        tag_id: copyOneQuiz.tags[0].id,
      }); 
      // On stocke les infos dans le state updateQuestions 
      //(on exclu les clés étrangères: quiz_id et question_id)
      setUpdateQuestions(
        copyOneQuiz.questions.map((question)=>({
          id: question.id,
          question: question.question,
          answers: question.answers.map((answer)=>({
            id: answer.id,
            answer: answer.answer,
            is_valid: answer.is_valid
          }))
        }))        
      );
    }
  }, [oneQuiz]);

  
  //* -------- GESTION DE LA MISE A JOUR DES INPUTS --------
  // Mise à jour du state updateQuiz
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
      setErrorInputMsg({ ...errorInputMsg, [field]: '' });
    };
    
    //* Mise à jour du champs d'une question
    const handleUpdateQuestion = (event: SyntheticEvent<Element, Event>, idQuestion: number) => {
     // Récupère et type la cible de l'événement
     const target = event.target as HTMLInputElement;
     // Récupère la valeur de l'input et l'affecte à la copie du state
     const newValue = target.value;
     setUpdateQuestions((updateQuestions: QuestionUp[]) =>
     updateQuestions.map((questionObject) => {
         if (questionObject.id === idQuestion) {
           return {
             ...questionObject,
             question: newValue,              
           };
         }
         return questionObject;
       })
     );
     //TODO à voir entre id et index
      // Mise à jour du state errors
      setErrorQuestion(idQuestion);
   };    

   //* Mise à jour du champs d'une réponse
  const handleUpdateAnswer = useCallback(
    (
      event: SyntheticEvent<Element, Event>,
      idQuestion: number,
      idAnswer: number
    ) => {
      // Récupère et type la cible de l'évenement
      const target = event.target as HTMLInputElement;
      // Récupère la valeur de l'input 
      const newValue = target.value;
      // Mise à jour du state
      setUpdateQuestions((updateQuestions: QuestionUp[]) =>
      updateQuestions.map((question) => {
          if (question.id === idQuestion) {
            return {
              ...question,
              answers: question.answers.map((answer) => {
                if (answer.id === idAnswer) {
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
  const handleUpdateRadioBtn = useCallback(
    (idQuestion: number,idAnswer: number) => {
      setUpdateQuestions((updateQuestions: QuestionUp[]) =>
      updateQuestions.map((question) => {
        if (question.id === idQuestion) {
          return {
            ...question,
            answers: question.answers.map((answer) => {
              if (answer.id === idAnswer) {
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

   //* Mise à jour du state des erreurs si modification d'un champ question
   const setErrorQuestion=(indexQuestion: number) => {
    setErrorInputMsg((errorInputMsg: IerrorFormUpdateQuiz) => ({
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
  setErrorInputMsg((errorInputMsg: IerrorFormUpdateQuiz) => ({
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
  setErrorInputMsg((errorInputMsg: IerrorFormUpdateQuiz) => ({
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

  //* Envoi du formulaire si aucune erreur
 const handleFormSubmit = async (isAllowed: boolean) => {
  if (isAllowed) {
    // Envoi des données au back
    // On affecte le state newQuiz à quiz
    // On affecte un tablleau des states des questions à questions
    try {
      const response = await axiosInstance.patch(`/quiz/user/update/${quizId}`, {
        quiz: updateQuiz,
        questions: updateQuestions,
      });
      if (response.status !== 200) throw new Error();

      // Rappel de la liste des quizs et mise à jour du state quizList
      fetchQuizList();
      // Vide le state des erreurs du backend
      setErrorBackend('');
      // On redirige vers la page de profile
      /* navigate('/profile/quiz'); */
    } catch (error) {
      // Gestion des erreurs, si statut 400 envoi d'un message d'erreur
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          console.log('error.response',error.response);
          const newErrorMsg = "Une erreur s'est produite lors de la création du quiz. Vérifier que vous êtes  bien connecté et que tous les champs du formulaires sont remplis ou sélectionnés. Si l'erreur persiste veuillez contacter le support.";
          console.log('newErrorMsg',newErrorMsg);
          setErrorBackend(newErrorMsg);        }
      } else {
        console.error(error);
      }
      throw error;
    }
  }
 };

  //* ENVOIE DU FORMULAIRE A l'API
  // TODO faire les vérifications des champs avant envoi du formulaire + feedback utilisateur
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
    console.log('fieldsErrors',fieldsErrors);
    
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

    
    // //* Critères à respecter avant d'envoyer aux back les données
    // if (!updateQuiz.title || updateQuiz.title.length < 3) {
    //   setErrorMessage(
    //     'Vous devez ajouter un titre contenant au moins 3 caractères',
    //   );
    // } else if (!updateQuiz.description || updateQuiz.description.length < 5) {
    //   setErrorMessage(
    //     'Vous devez ajouter une description contenant au moins 5 caractères',
    //   );
    // } else {
    //   // Envoi des données au back
    //   // On affecte le state newQuiz à quiz
    //   // On affecte un tablleau des states des questions à questions
    //   try {
    //     const response = await axiosInstance.patch(`/quiz/user/update/${quizId}`, {
    //       quiz: updateQuiz,
    //       questions: updateQuestions,
    //     });
    //     if (response.status !== 200) throw new Error();

    //     // On met à jour le state quizList
    //     fetchQuizList();
    //     // On redirige vers la page de profile
    //     navigate('/profile/quiz');
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };

  return (
    <div className="quiz__update">
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
              name='tag_id'
              labelId="label-select-tag"
              label="Catégorie"
              value={updateQuiz.tag_id}
              onChange={(event) => handleChangeQuizData(event, 'tag_id')}
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
              id="select-level"
              className="select-level"
              name="level_id"
              labelId="label-select-level"
              label="Difficulté"
              value={updateQuiz.level_id}
              onChange={(event) => handleChangeQuizData(event, 'level_id')}
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
            value={updateQuiz.title}
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
                : `${updateQuiz.title.length}/150 caractères maximum`
            }
          />

          {/* //? ======= Choix de la description ========== */}
          <TextField
            id="input-description"
            label="Description du quiz"
            variant="outlined"
            name="description"
            value={updateQuiz.description}
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
                : `${updateQuiz.description.length}/300 caractères maximum`
            }
          />

          {/* //? ======= Choix de l'url de l'image ========== */}
          <TextField
            id="input-thumbnail"
            label="Image du quiz"
            variant="outlined"
            name="thumbnail"
            value={updateQuiz.thumbnail}
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
          {updateQuestions.map((question, index) => (
            <UpdateQuestion
              key={`question${index + 1}-id${question.id}`}
              questionIndex={index}
              questionNumber={index + 1}
              currentQuestion={question}
              currentQuestionError={errorInputMsg.questions[index]}
              onChangeQuestion={handleUpdateQuestion}
              handleUpdateRadioBtn={handleUpdateRadioBtn}
              handleUpdateAnswer={handleUpdateAnswer}
              />
        ))}         
        </fieldset>
        <button type="submit" className="quiz__button">
          Modifier le Quiz
        </button>
      </form>
      {errorBackend !== '' && <div className="error-message">{errorBackend}</div>}
    </div>
  );
}

export default QuizUpdate;
