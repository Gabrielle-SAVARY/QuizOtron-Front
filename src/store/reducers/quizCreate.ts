import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { INewQuiz, Question, Answer } from '../../@types/newQuiz';
import {
  IAllQuiz, Tag, Level, Author,
} from '../../@types/quiz';
import { axiosInstance } from '../../utils/axios';

interface QuizCreateState {
  quiz: {
    title: string
    description: string
    thumbnail: string
    level_id: number
    user_id: number
    tag_id: number
  }
  questions: Question[]
  allTags: Tag[],
  selectedTagName: string
  allLevels: Level[],
  selectedLevelName: string
}

export const initialState: QuizCreateState = {
  quiz: {
    title: '',
    description: '',
    thumbnail: '',
    level_id: 0,
    user_id: 0,
    tag_id: 0,
  },
  questions: [],
  allTags: [],
  selectedTagName: '',
  allLevels: [],
  selectedLevelName: '',
};

const quizCreateReducer = createReducer(initialState, () => {

});

export default quizCreateReducer;
