import reducer, {
  login,
  register,
  logout,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  initialState,
} from '../../authentication/authenticationSlice';

import { loginParams, registerParams } from '../../../pages/__fixtures__/auth';

describe('AuthenticationSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthenticated: false,
      loader: false,
    });
  });

  it('should handle login', () => {
    expect(reducer(initialState, login(loginParams))).toEqual({
      isAuthenticated: false,
      loader: true,
    });
  });

  it('should handle register', () => {
    expect(reducer(initialState, register(registerParams))).toEqual({
      isAuthenticated: false,
      loader: true,
    });
  });

  it('should handle loginSuccess', () => {
    expect(reducer(initialState, loginSuccess('fake token'))).toEqual({
      isAuthenticated: true,
      loader: false,
    });
  });

  it('should handle loginFailure', () => {
    expect(reducer(initialState, loginFailure('login error'))).toEqual({
      isAuthenticated: false,
      loader: false,
    });
  });

  it('should handle logout', () => {
    expect(reducer(initialState, logout())).toEqual({
      isAuthenticated: false,
      loader: false,
    });
  });

  it('should handle logoutSuccess', () => {
    expect(reducer(initialState, logoutSuccess())).toEqual({
      isAuthenticated: false,
      loader: false,
    });
  });

  it('should handle logoutFailure', () => {
    expect(reducer(initialState, logoutFailure('logout error'))).toEqual({
      isAuthenticated: false,
      loader: false,
    });
  });
});
