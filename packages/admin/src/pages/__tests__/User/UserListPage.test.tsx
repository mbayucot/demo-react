import React from 'react';
import faker from 'faker';
import userEvent from '@testing-library/user-event';
import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { MemoryRouter, Route } from 'react-router-dom';
import { setupServer } from 'msw/node';

import { client } from '../../../app/apolloClient';
import UserListPage from '../../User/UserListPage';
import { graphqlHandler } from '../../../app/mockedGraphQLServer';

const setup = () => {
  const utils = render(
    <ApolloProvider client={client}>
      <MemoryRouter initialEntries={['/users']}>
        <UserListPage />
        <Route path="/users/new">
          <div>New User</div>
        </Route>
      </MemoryRouter>
    </ApolloProvider>,
  );
  return {
    utils,
  };
};

describe('UserListPage', () => {
  const server = setupServer(graphqlHandler);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should render buttons and grid', async () => {
    const { utils } = setup();
    await waitForElementToBeRemoved(() => utils.queryByText(/loading/i));
    const gridTable = utils.getByRole('grid');
    const gridUtils = within(gridTable);
    expect(await gridUtils.findByText(/add new/i)).toBeInTheDocument();
    expect(await gridUtils.findByText(/email/i)).toBeInTheDocument();
    expect(await gridUtils.findByText(/name/i)).toBeInTheDocument();
    expect(await gridUtils.findByText(/role/i)).toBeInTheDocument();
    expect(await gridUtils.getByTestId('searchfield')).toBeInTheDocument();
  });

  it('should redirect to form on add new click', async () => {
    const { utils } = setup();
    await waitForElementToBeRemoved(() => utils.queryByText(/loading/i));
    const addNewButton = screen.getByRole('button', {
      name: /add new/i,
    });
    await userEvent.click(addNewButton);
    expect(await utils.findByText(/new user/i)).toBeInTheDocument();
  });

  it('should search', async () => {
    const { utils } = setup();
    await waitForElementToBeRemoved(() => utils.queryByText(/loading/i));
    userEvent.type(screen.getByTestId('searchfield'), faker.lorem.word());
    await waitForElementToBeRemoved(() => utils.queryByText(/loading/i));
  });
});
