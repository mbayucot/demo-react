import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApolloProvider } from '@apollo/client';
import { MemoryRouter, Route } from 'react-router-dom';
import { setupServer } from 'msw/node';

import { client } from '../../../app/apolloClient';
import EditUserPage from '../../User/EditUserPage';
import { graphqlHandler } from '../../../app/mockedGraphQLServer';

const setup = () => {
  const utils = render(
    <ApolloProvider client={client}>
      <MemoryRouter initialEntries={['/users/1/edit']}>
        <Route path="/users/:id/edit">
          <EditUserPage />
        </Route>
        <Route path="/users">
          <div>Users</div>
        </Route>
      </MemoryRouter>
    </ApolloProvider>,
  );
  return {
    utils,
  };
};

describe('EditUserPage', () => {
  const server = setupServer(graphqlHandler);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should redirect to users page after saving', async () => {
    const { utils } = setup();
    await waitForElementToBeRemoved(() => utils.queryByText(/loading/i));

    const firstName = utils.getByLabelText(/first name/i) as HTMLInputElement;
    const lastName = utils.getByLabelText(/last name/i) as HTMLInputElement;
    const email = utils.getByLabelText(/email/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', {
      name: /save/i,
    });

    expect(firstName.value).not.toBeNull();
    expect(lastName.value).not.toBeNull();
    expect(email.value).not.toBeNull();
    await userEvent.click(submitButton);
    await waitForElementToBeRemoved(() => utils.queryByText('Loading...'));
    await waitFor(() => utils.findByText(/users/i));
  });
});
