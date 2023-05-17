export interface ICreateQuiz {
  createQuiz: {
    quizTitle: string;
    quizDescription: string;
    quizQuestion: string;
    question1Answer1: string;
    question1Answer2: string;
    question1Answer3: string;
    question1Answer4: string;
    question1Answer: false;
  }
}

export type KeysOfICreateQuiz = keyof ICreateQuiz['createQuiz'];
