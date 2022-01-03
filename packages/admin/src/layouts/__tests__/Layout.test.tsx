import React, { FC } from 'react';
import faker from 'faker';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import { User } from '@demo/shared';

import { store } from '../../app/store';
import { AbilityContext, defineAbilityFor } from '../../app/casl';
import { client } from '../../app/apolloClient';
import { handlers } from '../../pages/User/__mocks__/auth';
import Layout from '../private/Layout';

export const admin: User = {
  id: '1',
  email: faker.internet.email(),
  role: 'Admin',
};

export const editor: User = {
  id: '2',
  email: faker.internet.email(),
  role: 'Editor',
};

const setup = (user: User) => {
  const ability = defineAbilityFor(user);
  const MyComponent: FC = () => {
    return <p>My Component</p>;
  };
  const utils = render(
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <AbilityContext.Provider value={ability}>
            <Switch>
              <Route path="/">
                <p>landing page</p>
              </Route>
            </Switch>
            <Layout>
              <MyComponent />
            </Layout>
          </AbilityContext.Provider>
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
    setup(admin);
    expect(screen.getByText('My Component')).toBeInTheDocument();
  });

  it('should render admin menu', async () => {
    setup(admin);
    expect(screen.getByText(/posts/i)).toBeInTheDocument();
    expect(screen.getByText(/users/i)).toBeInTheDocument();
  });

  it('should render editor menu', async () => {
    setup(editor);
    expect(screen.getByText(/posts/i)).toBeInTheDocument();
  });

  it('should render account menu', async () => {
    const { clickAccountMenu } = setup(admin);

    clickAccountMenu();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('should handle sign out', async () => {
    const { utils, clickAccountMenu } = setup(editor);
    clickAccountMenu();
    await act(async () => {
      userEvent.click(utils.getByText(/logout/i));
    });
    await waitFor(() => {
      expect(screen.getByText('landing page')).toBeInTheDocument();
    });
  });
});
