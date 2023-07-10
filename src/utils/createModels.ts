//* Constante nombre de questions par quiz
export const numberOfQuestions = 10;

//* Formulaire création d'un quiz
// Créer un objet question modèle pour un nouveau quiz
export const createQuestionModel = () => ({
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

// Création d'un tableau de questions selon le nombre de questions par quiz
export const initialNewQuestions = (questionNumber: number) => Array.from(
  { length: questionNumber },
  () => createQuestionModel(),
);

// Créer un objet de messages d'erreurs pour une question d'un nouveau quiz
export const createQuestionErrorModel = () => ({
  question: '',
  radioGroup: '',
  answers: [
    {
      answer: '',
    },
    {
      answer: '',
    },
    {
      answer: '',
    },
    {
      answer: '',
    },
  ],
});

export const initialQuestionErrors = (questionNumber: number) => Array.from(
  { length: questionNumber },
  () => createQuestionErrorModel(),
);

//* Formulaire mise à jour d'un quiz
// Créer un objet question modèle pour un nouveau quiz
export const updateQuestionModel = () => ({
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

// Création d'un tableau de questions selon le nombre de questions par quiz
export const initialUpdateQuestions = (questionNumber: number) => Array.from(
  { length: questionNumber },
  () => updateQuestionModel(),
);

// Créer un objet de messages d'erreurs pour une question d'un nouveau quiz
export const createQuestionUpErrorModel = () => ({
  id:0,
  question: '',
  radioGroup: '',
  answers: [
    {
      id:0,
      answer: '',
    },
    {
      id:0,
      answer: '',
    },
    {
      id:0,
      answer: '',
    },
    {
      id:0,
      answer: '',
    },
  ],
});

export const initialQuestionUpErrors = (questionNumber: number) => Array.from(
  { length: questionNumber },
  () => createQuestionUpErrorModel(),
);