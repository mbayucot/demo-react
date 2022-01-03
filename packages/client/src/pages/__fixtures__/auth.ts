import faker from 'faker';

import { LoginPayload } from '../../features/authentication/authenticationAPI';
import { RegisterFormValues } from '../User/SignUp/SignUpForm';

export const loginParams: LoginPayload = {
  user: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  domain: 'author',
};

export const registerParams: RegisterFormValues = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
};
