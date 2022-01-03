Cypress.Commands.add('login', () => {
  const users = Cypress.env('users');
  const { email, password } = users.client;

  cy.visit('/');
  cy.findByLabelText(/email address/i).type(email);
  cy.findByLabelText(/password/i).type(password);
  cy.findByRole('button', { name: /sign in/i }).click();
  cy.url().should('include', '/posts');
});

Cypress.Commands.add('logout', () => {
  cy.findByTestId('account-dropdown').click();
  cy.findByText(/logout/i).should('be.visible');
  cy.findByText(/logout/i).click();
});
