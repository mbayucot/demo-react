// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Home', () => {
  it('should render post cards', () => {
    cy.visit('/');
    cy.getByTestId('post-cards').should('be.visible');
  });

  it('should redirect to post detail page on post click', () => {
    cy.getByTestId('post-card-link').click();
    cy.getByTestId('post-detail').should('be.visible');
  });

  it('should render post content and actions', () => {
    cy.getByTestId('post-content').should('be.visible');
    cy.getByTestId('post-actions').should('be.visible');
  });

  it('should show reactions on thumb icon click', () => {
    cy.getByTestId('post-reaction-selector').click();
    cy.getByTestId('post-reactions').should('be.visible');
  });

  it('should show comments on comment click', () => {
    cy.getByTestId('post-comment-toggle').click();
    cy.getByTestId('post-comments').should('be.visible');
  });
});
