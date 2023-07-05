import {
  useState, useEffect, ChangeEvent, FormEvent, SyntheticEvent, useCallback,
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
import { initialUpdateQuestions, numberOfQuestions } from '../../utils/createModels';

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
  // Stocke le message d'erreur du backend lors d'une erreur 400
  const [errorBackend, setErrorBackend] = useState<string>('');

  // errorMessage contient un message d'erreur s'il y a un problème lors du submit du formulaire
  const [errorMessage, setErrorMessage] = useState('');

  // Stock les informations générale du quiz sans les clés étrangères: quiz_id, question_id
  // Ces clés étrangères sont présentes dans oneQuiz mais non demandées par le back pour l'update
  //TODO à supprimer ?
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
  // Stock le tableau des questions et des réponses du quiz
  const [updateQuestions, setUpdateQuestions] = useState<QuestionUp[]>(initialUpdateQuestions(numberOfQuestions));
  //TODO à supprimer ?
  // const [newQuestion1, setNewQuestion1] = useState<QuestionUp>({
  //   id: 0,
  //   question: '',
  //   answers: [
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //   ],
  // });
  // const [newQuestion2, setNewQuestion2] = useState<QuestionUp>({
  //   id: 0,
  //   question: '',
  //   answers: [
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //   ],
  // });
  // const [newQuestion3, setNewQuestion3] = useState<QuestionUp>({
  //   id: 0,
  //   question: '',
  //   answers: [
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //   ],
  // });
  // const [newQuestion4, setNewQuestion4] = useState<QuestionUp>({
  //   id: 0,
  //   question: '',
  //   answers: [
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //   ],
  // });
  // const [newQuestion5, setNewQuestion5] = useState<QuestionUp>({
  //   id: 0,
  //   question: '',
  //   answers: [
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //   ],
  // });
  // const [newQuestion6, setNewQuestion6] = useState<QuestionUp>({
  //   id: 0,
  //   question: '',
  //   answers: [
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //   ],
  // });
  // const [newQuestion7, setNewQuestion7] = useState<QuestionUp>({
  //   id: 0,
  //   question: '',
  //   answers: [
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //   ],
  // });
  // const [newQuestion8, setNewQuestion8] = useState<QuestionUp>({
  //   id: 0,
  //   question: '',
  //   answers: [
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //   ],
  // });
  // const [newQuestion9, setNewQuestion9] = useState<QuestionUp>({
  //   id: 0,
  //   question: '',
  //   answers: [
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //   ],
  // });
  // const [newQuestion10, setNewQuestion10] = useState<QuestionUp>({
  //   id: 0,
  //   question: '',
  //   answers: [
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //     {
  //       id: 0,
  //       answer: '',
  //       is_valid: false,
  //     },
  //   ],
  // });

  //* AU CHARGEMENT DE LA PAGE
  //* On récupère l'id du quiz à parir de l'URL et on stocke dans el state
  
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
      //TODO MAJ state erreur front
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
      // Mise à jour du state errors
     //  setErrorQuestion(indexQuestion);
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
      // setErrorAnswer(indexQuestion, indexAnswer);
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
    // setErrorRadio(indexQuestion);
    },
    []
  );

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
          questions: updateQuestions,
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
          {updateQuestions.map((question, index) => (
            <UpdateQuestion
              key={`question${index + 1}-id${question.id}`}
              questionNumber={index + 1}
              currentQuestion={question}
              onChangeQuestion={handleUpdateQuestion}
              handleUpdateRadioBtn={handleUpdateRadioBtn}
              handleUpdateAnswer={handleUpdateAnswer}
              />
        ))}         
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
