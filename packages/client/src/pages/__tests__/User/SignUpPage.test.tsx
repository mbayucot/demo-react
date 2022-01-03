import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import faker from 'faker';
import userEvent from '@testing-library/user-event';
import { render, screen, act, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { setupServer } from 'msw/node';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../../../app/store';
import { client } from '../../../app/apolloClient';
import { handlers } from '../../__mocks__/auth';
import SignUpPage from '../../User/SignUp/SignUpPage';

const setup = () => {
  const utils = render(
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <MemoryRouter initialEntries={['/signup']}>
            <SignUpPage />
            <Route path="/dashboard">
              <div>Dashboard</div>
            </Route>
          </MemoryRouter>
        </ApolloProvider>
      </Provider>
    </PersistGate>,
  );
  const changeEmailInput = (value: string) => userEvent.type(utils.getByLabelText(/email address/i), value);
  const changePasswordInput = (value: string) => userEvent.type(utils.getByLabelText(/password/i), value);
  utils.debug(undefined, 300000);
  const submitButton = screen.getByRole('button', {
    name: /sign up/i,
  });
  const clickSubmit = () => userEvent.click(submitButton);
  return {
    utils,
    changeEmailInput,
    changePasswordInput,
    submitButton,
    clickSubmit,
  };
};

describe('SignUpPage', () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should show validation errors', async () => {
    const { clickSubmit } = setup();
    await act(async () => {
      await clickSubmit();
    });
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('should redirect to posts page if valid parameters', async () => {
    const { utils, changeEmailInput, changePasswordInput, clickSubmit } = setup();
    changeEmailInput(faker.internet.email());
    changePasswordInput(faker.random.word());
    await clickSubmit();
    await waitForElementToBeRemoved(() => utils.queryByText('Loading...'));
    await waitFor(() => utils.findByText(/dashboard/i));
  });
});
