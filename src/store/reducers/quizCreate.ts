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
// ---- TAG/CATEGOERIE DU QUIZ ----
// Appel API: récupère la liste des catégories/tags
export const getTags = createAppAsyncThunk(
  'createQuiz/GET_ALL_TAGS',
  async () => {
    const { data } = await axiosInstance.get('/tag');
    console.log('DATA TAGS', data);

    return data as Tag[];
  },
);

// Action: récupère la catégorie sélectionné par le menu déroulant
export const setQuizTag = createAction<string>('createQuiz/SET_QUIZ_TAG');

// Action: récupère l'id de la catégorie sélectionné par le menu déroulant
export const setQuizTagId = createAction<number>('createQuiz/SET_QUIZ_TAG_ID');

const quizCreateReducer = createReducer(initialState, (builder) => {
  builder
    // CATEGORIE
    .addCase(getTags.fulfilled, (state, action) => {
      state.allTags = action.payload;
    })
    .addCase(setQuizTag, (state, action) => {
      state.selectedTagName = action.payload;
    })
    .addCase(setQuizTagId, (state, action) => {
      state.quiz.tag_id = action.payload;
    });
});

export default quizCreateReducer;
