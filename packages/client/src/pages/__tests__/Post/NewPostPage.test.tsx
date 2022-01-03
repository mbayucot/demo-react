import React from 'react';
import faker from 'faker';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { render, screen, act, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { MemoryRouter, Route } from 'react-router-dom';

import { client } from '../../../app/apolloClient';
import { graphqlHandler } from '../../../app/mockedGraphQLServer';
import NewPostPage from '../../Post/NewPostPage';

const setup = () => {
  const utils = render(
    <ApolloProvider client={client}>
      <MemoryRouter initialEntries={['/my/initial/route']}>
        <NewPostPage />
        <Route path="/posts">
          <div>Posts</div>
        </Route>
      </MemoryRouter>
    </ApolloProvider>,
  );
  const title = utils.getByLabelText(/title/i) as HTMLInputElement;
  const changeTitleInput = (value: string) => userEvent.type(utils.getByLabelText(/title/i), value);
  const changeBodyInput = (value: string) => userEvent.type(utils.getByLabelText(/body/i), value);
  const submitButton = screen.getByRole('button', {
    name: /save/i,
  });
  const clickSubmit = () => userEvent.click(submitButton);
  return {
    utils,
    title,
    changeTitleInput,
    changeBodyInput,
    clickSubmit,
  };
};

describe('NewPostPage', () => {
  const server = setupServer(graphqlHandler);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should redirect to posts page if valid parameters', async () => {
    const { utils, changeTitleInput, changeBodyInput, clickSubmit, title } = setup();
    changeTitleInput('john');
    changeBodyInput(faker.random.word());
    await clickSubmit();
    await waitForElementToBeRemoved(() => utils.queryByText('Loading...'));
    await waitFor(() => utils.findByText(/posts/i));
  });

  it('should show validation errors', async () => {
    const { clickSubmit } = setup();
    await act(async () => {
      await clickSubmit();
    });
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/body is required/i)).toBeInTheDocument();
  });
});
