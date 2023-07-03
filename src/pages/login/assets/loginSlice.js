import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  user: '',
  isLogout: false,
  addRender: false,
  notesLength: [],
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    handleChange: (state, action) => {
      if (!action) return;
      const { name, value } = action.payload;
      if (name === 'token') {
        const { user, token } = value;
        state.token = token;
        state.user = user.name;
      }
      if (name === 'logout') {
        state.token = '';
        state.user = '';
      }
      if (name === 'addRender') {
        state.notesLength = value;
      }

      return state;
    },
  },
});

export const { handleChange } = loginSlice.actions;
export default loginSlice.reducer;
