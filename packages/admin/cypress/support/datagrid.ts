Cypress.Commands.add('clickEditButtonByRowName', (name: string) => {
  cy.getByTestId('MuiDataGrid-row').within(() => {
    cy.findByRole('button', { name: /edit/i }).click();
  });
});

Cypress.Commands.add('clickDeleteButtonByRowName', (name: string) => {
  cy.getByTestId('MuiDataGrid-row').within(() => {
    cy.findByRole('button', { name: /delete/i }).click();
  });
});
