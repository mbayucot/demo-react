// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(): Chainable<Element>;
    logout(): Chainable<Element>;
    createPost(title: string, body: string): Chainable<Element>;
    clickEditButtonByRowName(name: string): Chainable<Element>;
    clickDeleteButtonByRowName(name: string): Chainable<Element>;
    saveLocalStorageCache(): Chainable<Element>;
    restoreLocalStorageCache(): Chainable<Element>;
    clearLocalStorageCache(): Chainable<Element>;
    clickConfirmModalOkButton(): Chainable<Element>;
    searchByText(text: string): Chainable<Element>;
  }
}
