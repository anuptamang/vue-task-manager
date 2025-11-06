/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to wait for task API calls
       * @example cy.waitForTasks()
       */
      waitForTasks(): Chainable<void>;
      /**
       * Custom command to create a task via UI
       * @example cy.createTask({ title: 'Test', description: 'Desc', status: 'todo', priority: 'high' })
       */
      createTask(task: {
        title: string;
        description?: string;
        status?: string;
        priority?: string;
        dueDate?: string;
      }): Chainable<void>;
    }
  }
}

Cypress.Commands.add('waitForTasks', () => {
  cy.intercept('GET', '/api/tasks').as('getTasks');
  cy.wait('@getTasks');
});

Cypress.Commands.add(
  'createTask',
  ({
    title,
    description = '',
    status = 'todo',
    priority = 'medium',
    dueDate,
  }) => {
    cy.contains('button', 'Create Task').click();
    cy.get('input[placeholder*="title" i]').type(title);
    if (description) {
      cy.get('.ql-editor').type(description);
    }
    if (status) {
      cy.contains('Select status')
        .parent()
        .find('input')
        .click({ force: true });
      cy.get('.p-dropdown-item').contains(new RegExp(status, 'i')).click();
    }
    if (priority) {
      cy.contains('Select priority')
        .parent()
        .find('input')
        .click({ force: true });
      cy.get('.p-dropdown-item').contains(new RegExp(priority, 'i')).click();
    }
    cy.contains('button', /create|save/i).click();
  },
);

export {};
