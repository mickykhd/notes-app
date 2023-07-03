import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../pages/login/assets/loginSlice';

const store = configureStore({
  reducer: {
    loginData: loginSlice,
  },
});

export default store;
