import {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import { ITag } from '../../@types/tag';
import './styles.scss';
import { Question, Quiz } from '../../@types/newQuiz';
import CreateQuestion from './CreateQuestions';
import { ILevel } from '../../@types/level';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  FormControl, InputLabel, MenuItem, TextField,
} from '@mui/material';

interface CreateQuizProps {
  tagsList: ITag[]
  levelsList: ILevel[]
}

function CreateQuiz({
  tagsList, levelsList,
}:CreateQuizProps) {
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

  //* -------- GESTION DE LA MISE A JOUR DES INPUTS --------
  // MISE A JOUR DE newQuiz
  const handleChangeQuizData = (
    event: SelectChangeEvent<number> | SelectChangeEvent<string>,
    field: string,
  ) => {
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

  // MISE A JOUR DE newQuestions
  // TODO: en test
  // Quelle question  ? Quelle réponse ? Quel status
  const handleChangeQuestions = (e: any, qNb: number, aNb = 0) => {
    //* Etape 1 : On récupère le state de la question par rapport a son numéro : qNb
    //* Etape 2 : On affecte la valeur e.target.value au bon endroit
    switch (qNb) {
      case 1:
        const quizzQuestions = { ...newQuestion1 };
        if (aNb === 0) {
          quizzQuestions.question = e.target.value;
        } else {
          quizzQuestions.answers[aNb - 1].answer = e.target.value;
          // TODO: a tester pour le status
          quizzQuestions.answers[aNb - 1].is_valid = e.target.value;
        }
        setNewQuestion1(quizzQuestions);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // on envoie le state newQuiz et newQuestion a l'API
  };

  // pour le dev pour s'assurer du contenu des states
  useEffect(() => {
    console.log('newQuiz', newQuiz);
  }, [newQuiz]);

  return (
    <div className="quiz__creation">
      <div className="quiz__header">
        <h3>Créer un quiz</h3>
        <button type="button" className="quiz__button">Quitter</button>
      </div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="quiz__parameter">
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

          <label htmlFor="title">Choisissez votre titre de quiz</label>
          <input
            type="text"
            placeholder="Titre du quiz"
            className="quiz__selector"
            name="title"
            onChange={(event) => handleChangeQuizData(event, 'title')}
          />
          <label htmlFor="thumbnail">Copier l&apos; url d&apos;une image pour votre quiz</label>
          <input
            type="text"
            placeholder="url image du quiz"
            className="quiz__selector"
            name="thumbnail"
            onChange={(event) => handleChangeQuizData(event, 'thumbnail')}
          />

          <label htmlFor="description">Choisissez votre description de quiz</label>
          <textarea className="quiz__selector" id="" cols={30} rows={10} placeholder="Votre description de quiz..." name="description" onChange={(event) => handleChangeQuizData(event, 'description')} />
        </div>

        <input type="text" onChange={(e) => handleChangeQuestions(e, 1)} />

        {/* QUESTIONS */}
        {/* newQuestions, setNewQuestions */}
        {/* <CreateQuestion questionNumber={1} newQuestions={newQuestions} setNewQuestions={setNewQuestions} />
        <CreateQuestion questionNumber={2} />
        <CreateQuestion questionNumber={3} />
        <CreateQuestion questionNumber={4} />
        <CreateQuestion questionNumber={5} />
        <CreateQuestion questionNumber={6} />
        <CreateQuestion questionNumber={7} />
        <CreateQuestion questionNumber={8} />
        <CreateQuestion questionNumber={9} />
        <CreateQuestion questionNumber={10} /> */}

      </form>
    </div>
  );
}

export default CreateQuiz;
