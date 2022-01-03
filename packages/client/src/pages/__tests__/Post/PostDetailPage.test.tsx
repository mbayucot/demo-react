import React from 'react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import { render, screen, act } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { MemoryRouter, Route } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store, persistor } from '../../../app/store';
import { client } from '../../../app/apolloClient';
import { graphqlHandler } from '../../../app/mockedGraphQLServer';
import PostDetailPage from '../../Post/PostDetailPage';

const setup = () => {
  const utils = render(
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <MemoryRouter initialEntries={['/post/hello-world']}>
            <Route path="/post/:slug">
              <PostDetailPage />
            </Route>
          </MemoryRouter>
        </ApolloProvider>
      </Provider>
    </PersistGate>,
  );
  return {
    utils,
  };
};

describe('PostDetailPage', () => {
  const server = setupServer(graphqlHandler);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should render post content and actions', async () => {
    setup();
    expect(screen.getByTestId('post-detail')).toBeInTheDocument();
    expect(screen.getByTestId('post-content')).toBeInTheDocument();
    expect(screen.getByTestId('post-actions')).toBeInTheDocument();
  });

  it('show reactions on thumb icon click', async () => {
    const { utils } = setup();
    await act(async () => {
      userEvent.click(utils.getByTestId('post-reaction-selector'));
    });
    expect(screen.getByTestId('post-reactions')).toBeInTheDocument();
  });

  it('should show comments on comment click', async () => {
    const { utils } = setup();
    await act(async () => {
      userEvent.click(utils.getByTestId('post-comment-toggle'));
    });
    expect(screen.getByTestId('post-comments')).toBeInTheDocument();
  });

  it('should save comments on comment input', async () => {
    const { utils } = setup();
    const comments = faker.random.word();
    userEvent.type(utils.getByPlaceholderText(/write a comment.../i), `${comments}{enter}`);
    expect(screen.findByText(comments)).toBeInTheDocument();
  });
});
