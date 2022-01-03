import faker from 'faker';

import { LoginPayload } from '../../../features/authentication/authenticationAPI';

export const loginParams: LoginPayload = {
  user: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  domain: 'author',
};
