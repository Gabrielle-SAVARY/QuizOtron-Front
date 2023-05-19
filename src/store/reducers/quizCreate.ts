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
  'createQuiz/GET_TAGS',
  async () => {
    const { data } = await axiosInstance.get('/tag');
    console.log('GET TAGS', data);
    return data as Tag[];
  },
);

// Action: récupère la catégorie sélectionné par le menu déroulant
export const setQuizTag = createAction<string>('quizCreate/SET_QUIZ_TAG');

// Action: récupère l'id de la catégorie sélectionné par le menu déroulant
export const setQuizTagId = createAction<number>('quizCreate/SET_QUIZ_TAG_ID');

// ---- LEVEL/NIVEAU DE DIFFICULTE DU QUIZ ----
// Appel API: récupère la liste des niveaux/levels
export const getLevels = createAppAsyncThunk(
  'quizCreate/GET_LEVELS',
  async () => {
    const { data } = await axiosInstance.get('/level');
    console.log('GET LEVELS', data);
    return data as Level[];
  },
);

// Action: récupère le niveau sélectionné par le menu déroulant
export const setQuizLevel = createAction<string>('quizCreate/SET_QUIZ_LEVEL');

// Action: récupère l'id du niveau sélectionné par le menu déroulant
export const setQuizLevelId = createAction<number>('quizCreate/SET_QUIZ_LEVEL_ID');

//  Récupère les champs input du titre, description et thumnail
export const changeQuizFieldTitle = createAction<string>('quizCreate/CHANGE_QUIZ_FIELD_TITLE');
export const changeQuizFieldThumbnail = createAction<string>('quizCreate/CHANGE_QUIZ_FIELD_THUMBNAIL');
export const changeQuizFieldDescription = createAction<string>('quizCreate/CHANGE_QUIZ_FIELD_DESCRIPTION');

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
    })
  // NIVEAU
    .addCase(getLevels.fulfilled, (state, action) => {
      state.allLevels = action.payload;
    })
    .addCase(setQuizLevel, (state, action) => {
      state.selectedLevelName = action.payload;
    })
    .addCase(setQuizLevelId, (state, action) => {
      state.quiz.level_id = action.payload;
    })
    // QUIZ: title, description, thumbnail
    .addCase(changeQuizFieldTitle, (state, action) => {
      state.quiz.title = action.payload;
    })
    .addCase(changeQuizFieldThumbnail, (state, action) => {
      state.quiz.thumbnail = action.payload;
    })
    .addCase(changeQuizFieldDescription, (state, action) => {
      state.quiz.description = action.payload;
    });
});

export default quizCreateReducer;
