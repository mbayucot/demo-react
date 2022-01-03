import React, { FC } from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import { store } from '../../app/store';
import Layout from '../private/Layout';
import { client } from '../../app/apolloClient';
import { handlers } from '../../pages/__mocks__/auth';

const setup = () => {
  const MyComponent: FC = () => {
    return <p>My Component</p>;
  };
  const utils = render(
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Switch>
            <Route path="/">
              <p>landing page</p>
            </Route>
          </Switch>
          <Layout>
            <MyComponent />
          </Layout>
        </ApolloProvider>
      </Provider>
    </BrowserRouter>,
  );
  const accountMenu = utils.getByTestId('account-dropdown') as HTMLButtonElement;
  const clickAccountMenu = () => userEvent.click(accountMenu);
  return { utils, clickAccountMenu };
};

describe('Layout', () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should wrap a class component', () => {
    setup();
    expect(screen.getByText('My Component')).toBeInTheDocument();
  });

  it('should render author menu', async () => {
    setup();
    expect(screen.getByText(/posts/i)).toBeInTheDocument();
  });

  it('should render account menu', async () => {
    const { clickAccountMenu } = setup();

    clickAccountMenu();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('should handle sign out', async () => {
    const { utils, clickAccountMenu } = setup();
    clickAccountMenu();
    await act(async () => {
      userEvent.click(utils.getByText(/logout/i));
    });
    await waitFor(() => {
      expect(screen.getByText('landing page')).toBeInTheDocument();
    });
  });
});
