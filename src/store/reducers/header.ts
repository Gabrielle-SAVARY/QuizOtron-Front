import { createAction, createReducer } from '@reduxjs/toolkit';

interface HeaderState {
  isToggleMenu: boolean
  screenWidth: number
}

export const initialState: HeaderState = {
  isToggleMenu: false,
  screenWidth: window.innerWidth,
};

export const setIsToggleMenu = createAction<boolean>('header/SET_TOGGLE_MENU');

export const setScreenWidth = createAction<number>('header/SET_SCREEN_WIDTH');

const headerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setIsToggleMenu, (state, action) => {
      state.isToggleMenu = action.payload;
    })
    .addCase(setScreenWidth, (state, action) => {
      state.screenWidth = action.payload;
    });
});

export default headerReducer;
