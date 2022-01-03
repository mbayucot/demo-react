import React from 'react';
import { setupServer } from 'msw/node';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApolloProvider } from '@apollo/client';
import { MemoryRouter, Route } from 'react-router-dom';

import { client } from '../../../app/apolloClient';
import { graphqlHandler } from '../../../app/mockedGraphQLServer';
import HomePage from '../../Home/HomePage';

const setup = () => {
  const utils = render(
    <ApolloProvider client={client}>
      <MemoryRouter>
        <Route path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <div>sign in to account</div>
        </Route>
        <Route path="/signup">
          <div>create your account</div>
        </Route>
      </MemoryRouter>
    </ApolloProvider>,
  );
  return {
    utils,
  };
};

describe('HomePage', () => {
  const server = setupServer(graphqlHandler);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should render navigation bar', async () => {
    setup();
    expect(screen.getByText(/demo/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('render post cards and handle redirect', async () => {
    const { utils } = setup();
    expect(screen.getByTestId('post-cards')).toBeInTheDocument();

    await act(async () => {
      userEvent.click(utils.getByTestId('post-card-link'));
    });
    await waitFor(() => {
      expect(screen.getByTestId('post-detail')).toBeInTheDocument();
    });
  });
});
