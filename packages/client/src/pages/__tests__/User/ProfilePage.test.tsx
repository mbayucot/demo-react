import React from 'react';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';

import { client } from '../../../app/apolloClient';
import { graphqlHandler } from '../../../app/mockedGraphQLServer';
import ProfilePage from '../../User/Profile/ProfilePage';

const setup = () => {
  const utils = render(
    <ApolloProvider client={client}>
      <ProfilePage />
    </ApolloProvider>,
  );
  return {
    utils,
  };
};

describe('ProfilePage', () => {
  const server = setupServer(graphqlHandler);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should show profile info', async () => {
    const { utils } = setup();
    await waitForElementToBeRemoved(() => utils.queryByText(/loading/i));

    const email = utils.getByLabelText(/email/i) as HTMLInputElement;
    const firstName = utils.getByLabelText(/first name/i) as HTMLInputElement;
    const lastName = utils.getByLabelText(/last name/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', {
      name: /update profile/i,
    });

    expect(email.value).not.toBeNull();
    expect(firstName.value).not.toBeNull();
    expect(lastName.value).not.toBeNull();
    await userEvent.click(submitButton);
    await waitForElementToBeRemoved(() => utils.queryByText(/loading/i));
  });
});
