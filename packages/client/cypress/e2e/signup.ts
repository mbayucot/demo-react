// type definitions for Cypress object "cy"
/// <reference types="cypress" />
import faker from 'faker';

describe('Sign Up', () => {
  after(() => {
    cy.logout();
  });

  it('should sign up a new user', () => {
    cy.visit('/');
    cy.findByText(/sign up/i).click();
    cy.findByLabelText(/email address/i).type(faker.internet.email());
    cy.findByLabelText(/password/i).type(`${faker.internet.password()}!2`);
    cy.findByRole('button', { name: /create account/i }).click();
    cy.url().should('include', '/posts');
  });
});
