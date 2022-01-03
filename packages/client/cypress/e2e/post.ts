// type definitions for Cypress object "cy"
/// <reference types="cypress" />
import faker from 'faker';

describe('Post', () => {
  let title: string;
  let body: string;
  let newTitle: string;

  before(() => {
    title = faker.lorem.word();
    body = faker.lorem.word();
    newTitle = faker.lorem.word();

    cy.clearLocalStorageCache();
    cy.login();
  });

  after(() => {
    cy.logout();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('token');
    cy.restoreLocalStorageCache();
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });

  it('should navigate to posts page', () => {
    cy.get('nav').findByRole('link', { title: /posts/i }).click();
    cy.findByRole('heading', { title: /posts/i }).should('be.visible');
    cy.get('table').should('be.visible');
    cy.visit('/posts');
  });

  it('should create a new post', () => {
    cy.createPost(title, body);
  });

  it('should update a post', () => {
    cy.clickEditButtonByRowtitle(title);

    cy.findByText(/edit post/i).should('be.visible');
    cy.findByLabelText(/title/i).should('have.value', title);
    cy.findByLabelText(/body/i).should('have.value', title);
    cy.findByLabelText(/title/i).clear().type(newTitle);
    cy.findByRole('button', { name: /save/i }).click();

    //cy.findByRole('dialog').should('not.exist');
  });

  it('should delete a post', () => {
    cy.searchByText(newTitle);
    cy.clickDeleteButtonByRowtitle(newTitle);
    cy.clickConfirmModalOkButton();
    cy.findByText(newTitle).should('not.exist');
  });

  it('should search a post', () => {
    cy.searchByText(title);
    cy.get('table').contains('tr', title).should('be.visible');
  });

  it('should update a post', () => {
    cy.clickEditButtonByRowtitle(title);
    cy.findByRole('dialog').within(() => {
      cy.findByText(/edit post/i).should('be.visible');
      cy.findByLabelText(/title/i).should('have.value', title);
      cy.findByLabelText(/title/i).clear().type(newTitle);
      cy.findByRole('button', { title: /save/i }).click();
    });
    cy.findByText(/edit post/i).should('not.exist');
  });

  it('should delete a post', () => {
    cy.searchByText(newTitle);
    cy.clickDeleteButtonByRowtitle(newTitle);
    cy.clickConfirmModalOkButton();
    cy.findByText(newTitle).should('not.exist');
  });
});
