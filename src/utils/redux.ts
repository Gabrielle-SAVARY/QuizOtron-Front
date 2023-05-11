import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch
  state: RootState
}>();

// utilitaire pour typer createAsyncType cf. doc redux-toolkit
// https://redux-toolkit.js.org/usage/usage-with-typescript#defining-a-pre-typed-createasyncthunk
