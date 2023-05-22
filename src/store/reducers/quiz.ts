import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import {
  IQuiz, Tag, Author, Level,
} from '../../@types/quizlist';

interface QuizState {
  allQuiz: IQuiz[];
}

export const initialState: QuizState = {
  allQuiz: [],
};

export const fetchQuiz = createAsyncThunk(
  'quiz/FETCH_QUIZ',
  async () => {
    const { data } = await axiosInstance.get('/quiz');
    return data as IQuiz[];
  },
);

const quizReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchQuiz.fulfilled, (state, action) => {
      state.allQuiz = action.payload;
    });
});

export default quizReducer;
