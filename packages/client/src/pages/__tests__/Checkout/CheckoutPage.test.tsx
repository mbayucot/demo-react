import React from 'react';
import { render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { MemoryRouter, Route } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store, persistor } from '../../../app/store';
import { client } from '../../../app/apolloClient';
import { graphqlHandler } from '../../../app/mockedGraphQLServer';
import CheckoutPage from '../../Checkout/CheckoutPage';

const setup = () => {
  const utils = render(
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <MemoryRouter initialEntries={['/checkout']}>
            <Route path="/checkout">
              <CheckoutPage />
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

describe('CheckoutPage', () => {
  const server = setupServer(graphqlHandler);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should render stripe credit card info', async () => {
    setup();
    expect(screen.getByText(/card details/i)).toBeInTheDocument();
    expect(screen.getByText(/confirm order/i)).toBeInTheDocument();
  });
});
