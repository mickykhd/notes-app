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
        const { user, token } = value || {};
        state.token = token || '';
        const derivedName =
          typeof user === 'string'
            ? user
            : user?.name || user?.email || 'Explorer';
        state.user = derivedName;
      }
      if (name === 'logout') {
        state.token = '';
        state.user = '';
        state.notesLength = [];
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
