import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import { store } from '../../app/store';
import { client } from '../../app/apolloClient';

export const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <ApolloProvider client={client}>
      <Provider store={store}>{ui}</Provider>
    </ApolloProvider>,
    { wrapper: BrowserRouter },
  );
};
