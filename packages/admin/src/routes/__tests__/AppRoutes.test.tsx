import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../../App';

describe('AppRoutes', () => {
  it('should navigate to a bad page', async () => {
    renderWithRouter(<App />, { route: '/something-that-does-not-match' });
    expect(await screen.findByText(/Oops! That page can’t be found./i)).toBeInTheDocument();
  });
});
