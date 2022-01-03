import { createSlice } from '@reduxjs/toolkit';
import { User } from '@demo/shared';
import Cookies from 'js-cookie';

export enum Role {
  Author = 'Author',
  Editor = 'Editor',
  Admin = 'Admin',
}

type StateType = {
  isAuthenticated: boolean;
  loader: boolean;
  user?: User;
  error?: string;
};

const initialState: StateType = {
  isAuthenticated: false,
  loader: false,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login(state, action) {
      state.loader = true;
      state.error = undefined;
    },
    loginSuccess(state, action) {
      state.loader = false;
      state.isAuthenticated = !!action.payload;
      const data = action.payload.user;
      const user: User = {
        id: data.id,
        email: data.email,
        role: data.role_fmt,
      };
      state.user = user;
      Cookies.set('token', action.payload.token, { expires: 1 });
    },
    loginFailure(state, action) {
      state.loader = false;
      state.isAuthenticated = false;
      state.user = undefined;
      state.error = action.payload;
    },
    logout(state) {
      state.loader = false;
      state.isAuthenticated = false;
      state.user = undefined;
      state.error = undefined;
    },
    logoutSuccess(state) {
      state.loader = false;
      state.isAuthenticated = false;
      state.user = undefined;
      Cookies.remove('token');
    },
    logoutFailure(state, action) {
      state.loader = false;
      state.isAuthenticated = false;
      state.user = undefined;
      state.error = action.payload;
    },
  },
});

export const { login, logout, loginSuccess, loginFailure, logoutSuccess, logoutFailure } = authenticationSlice.actions;
export default authenticationSlice.reducer;
export { initialState };
