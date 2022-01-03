import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isAuthenticated: false,
  loader: false,
  error: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login(state, action) {
      state.loader = true;
    },
    register(state, action) {
      state.loader = true;
    },
    loginSuccess(state, action) {
      state.loader = false;
      state.isAuthenticated = !!action.payload;
      Cookies.set('token', action.payload.token, { expires: 1 });
    },
    loginFailure(state, action) {
      state.loader = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout(state) {
      state.loader = false;
      state.isAuthenticated = false;
    },
    logoutSuccess(state) {
      state.loader = false;
      state.isAuthenticated = false;
      Cookies.remove('token');
    },
    logoutFailure(state, action) {
      state.loader = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  },
});

export const { login, register, logout, loginSuccess, loginFailure, logoutSuccess, logoutFailure } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
export { initialState };
