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
