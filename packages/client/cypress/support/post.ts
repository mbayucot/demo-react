Cypress.Commands.add('createPost', (title: string, body: string) => {
  cy.findByRole('button', { name: /new post/i }).click();
  cy.findByText(/new post/i).should('be.visible');
  cy.wait(300);
  cy.findByLabelText(/title/i).type(title).wait(300);
  cy.findByLabelText(/body/i).type(body).wait(300);
  cy.findByRole('button', { name: /save/i }).click();
  cy.findByText(/new post/i).should('not.exist');
});
