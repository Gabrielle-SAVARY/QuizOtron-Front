import { createAction, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAppAsyncThunk } from '../../utils/redux';

interface UserState {
}

export const initialState: UserState = {

};

const userReducer = createReducer(initialState, () => {

});

export default userReducer;
