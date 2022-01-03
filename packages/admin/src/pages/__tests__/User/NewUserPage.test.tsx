import React from 'react';
import faker from 'faker';
import { render, screen, act, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApolloProvider } from '@apollo/client';
import { MemoryRouter, Route } from 'react-router-dom';
import { setupServer } from 'msw/node';

import { client } from '../../../app/apolloClient';
import NewUserPage from '../../User/NewUserPage';
import { graphqlHandler } from '../../../app/mockedGraphQLServer';

const setup = () => {
  const utils = render(
    <ApolloProvider client={client}>
      <MemoryRouter initialEntries={['/my/initial/route']}>
        <NewUserPage />
        <Route path="/users">
          <div>Users</div>
        </Route>
      </MemoryRouter>
    </ApolloProvider>,
  );
  const changeFirstNameInput = (value: string) => userEvent.type(utils.getByLabelText(/first name/i), value);
  const changeLastNameInput = (value: string) => userEvent.type(utils.getByLabelText(/last name/i), value);
  const changeEmailInput = (value: string) => userEvent.type(utils.getByLabelText(/email/i), value);
  const changePasswordInput = (value: string) => userEvent.type(utils.getByLabelText(/password/i), value);
  const submitButton = screen.getByRole('button', {
    name: /save/i,
  });
  const clickSubmit = () => userEvent.click(submitButton);
  return {
    utils,
    changeFirstNameInput,
    changeLastNameInput,
    changeEmailInput,
    changePasswordInput,
    clickSubmit,
  };
};

describe('NewUserPage', () => {
  const server = setupServer(graphqlHandler);

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
    expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/last name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('should redirect to posts page after saving', async () => {
    const { utils, changeFirstNameInput, changeLastNameInput, changeEmailInput, changePasswordInput, clickSubmit } =
      setup();
    changeEmailInput(faker.internet.email());
    changeFirstNameInput(faker.random.word());
    changeLastNameInput(faker.random.word());
    changePasswordInput(faker.random.word());
    await clickSubmit();
    await waitForElementToBeRemoved(() => utils.queryByText('Loading...'));
    await waitFor(() => utils.findByText(/users/i));
  });
});
