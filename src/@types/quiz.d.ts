export interface ICreateQuiz {
  createQuiz: {
    quizTitle: string;
    quizDescription: string;
  }
}

export type KeysOfICreateQuiz = keyof ICreateQuiz['createQuiz'];
