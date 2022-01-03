import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import { FlagsProvider } from 'flagged';

import App from './App';
import { store, persistor } from './app/store';
import { client } from './app/apolloClient';

ReactDOM.render(
  <ApolloProvider client={client}>
    <FlagsProvider features={{ subscription: true }}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <App />
          </Provider>
        </PersistGate>
      </BrowserRouter>
    </FlagsProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
