import { createAction, createReducer } from '@reduxjs/toolkit';

interface HeaderState {
  toggleMenu: boolean
  screenWidth: number
}

export const initialState: HeaderState = {
  toggleMenu: false,
  screenWidth: window.innerWidth,
};

export const setToggleMenu = createAction<boolean>('header/SET_TOGGLE_MENU');

export const setScreenWidth = createAction<number>('header/SET_SCREEN_WIDTH');

const headerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setToggleMenu, (state, action) => {
      state.toggleMenu = action.payload;
    })
    .addCase(setScreenWidth, (state, action) => {
      state.screenWidth = action.payload;
    });
});

export default headerReducer;
