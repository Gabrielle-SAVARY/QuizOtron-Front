import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import headerReducer from './reducers/header';

const store = configureStore({
  reducer: {
    user: userReducer,
    header: headerReducer,
  },
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
