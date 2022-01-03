import { all } from 'redux-saga/effects';

import authenticateSaga from '../features/authentication/authenticationAPI';

export default function* rootSaga() {
  yield all([authenticateSaga()]);
}
