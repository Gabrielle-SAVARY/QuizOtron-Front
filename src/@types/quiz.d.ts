export interface IAllQuiz {
  id: number
  title: string
  description: string
  thumbnail: string
  created_at: string
  updated_at: string
  level_id: number
  user_id: number
  level: Level
  author: Author
  tags: Tag[]
}

export interface Level {
  name: string
  id: number
}

export interface Author {
  pseudo: string
}

export interface Tag {
  name: string
  quiz_has_tag: QuizHasTag
  id: number
}

export interface QuizHasTag {
  created_at: string
  updated_at: string
  tag_id: number
  quiz_id: number
}

// interfaces for local state first try
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
