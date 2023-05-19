export interface InputCreateQuiz {
  input: {
    title: string
    thumbnail:string
    description: string
    question1:string
    q1answer1: string
    q1answer2: string
    q1answer3: string
    q1answer4: string
  }
}

export type KeysOfInput = keyof InputCreateQuiz['input'];
