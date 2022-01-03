import { setupServer } from 'msw/node';
import { expectSaga } from 'redux-saga-test-plan';

import { loginSaga, logoutSaga } from '../../authentication/authenticationAPI';
import { loginSuccess, logoutSuccess, loginFailure } from '../../authentication/authenticationSlice';
import { handlers } from '../../../pages/User/__mocks__/auth';
import { loginParams } from '../../../pages/User/__fixtures__/auth';

describe('AuthenticationAPI', () => {
  const loginAction = {
    payload: loginParams,
  };

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should handle loginSaga', () => {
    return expectSaga(loginSaga, loginAction)
      .put(loginSuccess('__test_token__'))
      .dispatch(loginSuccess('__test_token__'))
      .run();
  });

  it('should handle loginSaga error', () => {
    return expectSaga(loginSaga, loginAction)
      .put(loginFailure('login error'))
      .dispatch(loginFailure('login error'))
      .run();
  });

  it('should handle logoutSaga', () => {
    return expectSaga(logoutSaga).put(logoutSuccess()).dispatch(logoutSuccess()).run();
  });
});
