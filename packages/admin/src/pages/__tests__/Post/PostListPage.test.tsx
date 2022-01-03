import React from 'react';
import { setupServer } from 'msw/node';
import faker from 'faker';
import userEvent from '@testing-library/user-event';
import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { MemoryRouter, Route } from 'react-router-dom';

import { client } from '../../../app/apolloClient';
import PostListPage from '../../Post/PostListPage';
import { graphqlHandler } from '../../../app/mockedGraphQLServer';

const setup = () => {
  const utils = render(
    <ApolloProvider client={client}>
      <MemoryRouter initialEntries={['/posts']}>
        <PostListPage />
        <Route path="/posts/new">
          <div>New Post</div>
        </Route>
      </MemoryRouter>
    </ApolloProvider>,
  );
  return {
    utils,
  };
};

describe('PostListPage', () => {
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
    expect(await gridUtils.findByText(/title/i)).toBeInTheDocument();
    expect(await gridUtils.findByText(/full name/i)).toBeInTheDocument();
    expect(await gridUtils.getByTestId('searchfield')).toBeInTheDocument();
  });

  it('should redirect to form on add new click', async () => {
    const { utils } = setup();
    await waitForElementToBeRemoved(() => utils.queryByText(/loading/i));
    const addNewButton = screen.getByRole('button', {
      name: /add new/i,
    });
    await userEvent.click(addNewButton);
    expect(await utils.findByText(/new post/i)).toBeInTheDocument();
    await screen.findByTitle(/go to next page/i);
  });

  it('should search', async () => {
    const { utils } = setup();
    await waitForElementToBeRemoved(() => utils.queryByText(/loading/i));
    userEvent.type(screen.getByTestId('searchfield'), faker.lorem.word());
    await waitForElementToBeRemoved(() => utils.queryByText(/loading/i));
  });
});
