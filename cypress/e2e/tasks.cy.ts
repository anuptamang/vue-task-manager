/**
 * Task Management E2E Tests
 *
 * This test suite uses @testing-library/cypress for robust, accessibility-focused selectors.
 * Testing Library queries prioritize user behavior over implementation details, making tests
 * more maintainable and less brittle.
 *
 * All selectors are centralized in cypress/support/selectors.ts for easy maintenance.
 *
 * Best Practices:
 * - Use centralized selectors from selectors.ts
 * - Use findByRole() for buttons, headings, dialogs, etc.
 * - Use findByLabelText() for form inputs
 * - Use findByText() for text content
 * - Use findByRole('combobox') for PrimeVue dropdowns
 * - Wait explicitly for async operations (cy.wait('@getTasks'))
 * - Use within() for scoped queries when needed
 */
import { selectors } from '../support/selectors';

describe('Task Management E2E', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/tasks', { fixture: 'tasks.json' }).as('getTasks');
    cy.intercept('POST', '/api/tasks', (req) => {
      const { title, description, status, priority, dueDate } = req.body;
      req.reply({
        statusCode: 200,
        body: {
          id: 'new-task-id',
          title,
          description,
          status,
          priority,
          dueDate,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    }).as('createTask');
    cy.intercept('PUT', '/api/tasks/*', (req) => {
      const taskId = req.url.split('/').pop();
      req.reply({
        statusCode: 200,
        body: {
          id: taskId,
          title: req.body.title,
          description: req.body.description || '',
          status: req.body.status,
          priority: req.body.priority,
          dueDate: req.body.dueDate || null,
          createdAt: new Date('2025-09-01T00:00:00.000Z').toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    }).as('updateTask');
    cy.intercept('DELETE', '/api/tasks/*', {
      statusCode: 200,
      body: { success: true },
    }).as('deleteTask');

    cy.visit('/');
    cy.wait('@getTasks');
  });

  it('should display task list page', () => {
    cy.findByRole('heading', { name: selectors.page.heading }).should(
      'be.visible',
    );
    cy.findByText(selectors.page.appTitle).should('be.visible');
    cy.findByRole('button', { name: selectors.buttons.createTask }).should(
      'be.visible',
    );
  });

  it('should display tasks from API', () => {
    cy.get(selectors.taskCard.card).should('have.length.at.least', 1);
    cy.findByText('Test Task').should('be.visible');
  });

  it('should create a new task', () => {
    cy.findByRole('button', { name: selectors.buttons.createTask }).click();
    cy.findByRole('dialog').should('be.visible');

    cy.findByLabelText(selectors.form.title).clear().type('New E2E Task');

    cy.get(selectors.taskCard.editor)
      .should('be.visible')
      .click()
      .type('This is a test description');

    cy.findByRole('dialog').within(() => {
      cy.get(selectors.form.statusId)
        .parent()
        .find(selectors.dropdown.combobox)
        .click({ force: true });
    });
    cy.get(selectors.dropdown.listbox, {
      timeout: selectors.dropdown.panelTimeout,
    }).should('be.visible');
    cy.findByRole('option', {
      name: selectors.filters.status.options.todo,
    }).click();

    cy.findByRole('dialog').within(() => {
      cy.get(selectors.form.priorityId)
        .parent()
        .find(selectors.dropdown.combobox)
        .click({ force: true });
    });
    cy.get(selectors.dropdown.listbox, {
      timeout: selectors.dropdown.panelTimeout,
    }).should('be.visible');
    cy.findByRole('option', {
      name: selectors.filters.priority.options.high,
    }).click();

    cy.findByRole('button', { name: selectors.buttons.create }).click({
      force: true,
    });

    cy.wait('@createTask');
    cy.get(selectors.dialog.dialog, {
      timeout: selectors.timeouts.dialog,
    }).should('not.exist');
    cy.findByText('New E2E Task').should('be.visible');
  });

  it('should edit a task', () => {
    cy.get(selectors.taskCard.card)
      .first()
      .within(() => {
        cy.findByRole('button', { name: selectors.buttons.options }).click();
      });

    cy.findByRole('menu').should('be.visible');
    cy.findByRole('menuitem', { name: selectors.menu.edit }).click();

    cy.findByRole('dialog', { name: selectors.dialog.edit }).should(
      'be.visible',
    );

    cy.findByLabelText(selectors.form.title).clear().type('Updated Task Title');

    cy.findByRole('button', { name: selectors.buttons.update }).click({
      force: true,
    });

    cy.wait('@updateTask');
    cy.get(selectors.dialog.dialog, {
      timeout: selectors.timeouts.dialog,
    }).should('not.exist');

    cy.get(selectors.taskCard.card, {
      timeout: selectors.timeouts.taskUpdate,
    })
      .contains(selectors.taskCard.title, 'Updated Task Title')
      .should('be.visible');
  });

  it('should delete a task', () => {
    cy.get(selectors.taskCard.card).then(($cards) => {
      const initialCount = $cards.length;

      cy.get(selectors.taskCard.card)
        .first()
        .within(() => {
          cy.findByRole('button', { name: selectors.buttons.options }).click();
        });

      cy.findByRole('menu').should('be.visible');
      cy.findByRole('menuitem', { name: selectors.menu.delete }).click();

      cy.findByRole('dialog', { name: selectors.dialog.delete }).should(
        'be.visible',
      );

      cy.findByRole('button', { name: selectors.buttons.delete }).click();

      cy.wait('@deleteTask');
      cy.get(selectors.taskCard.card).should('have.length', initialCount - 1);
    });
  });

  it('should filter tasks by status', () => {
    cy.findByRole('combobox', {
      name: selectors.filters.status.combobox,
    }).click();
    cy.get(selectors.dropdown.listbox, {
      timeout: selectors.dropdown.panelTimeout,
    }).should('be.visible');
    cy.findByRole('option', {
      name: selectors.filters.status.options.todo,
    }).click();
    cy.get(selectors.taskCard.card).should('have.length.at.least', 1);
  });

  it('should filter tasks by priority', () => {
    cy.findByRole('combobox', {
      name: selectors.filters.priority.combobox,
    }).click();
    cy.get(selectors.dropdown.listbox, {
      timeout: selectors.dropdown.panelTimeout,
    }).should('be.visible');
    cy.findByRole('option', {
      name: selectors.filters.priority.options.high,
    }).click();
    cy.get(selectors.taskCard.card).should('have.length.at.least', 1);
  });

  it('should sort tasks by title ascending', () => {
    cy.findByRole('combobox', {
      name: selectors.filters.sort.combobox,
    }).click();
    cy.get(selectors.dropdown.listbox, {
      timeout: selectors.dropdown.panelTimeout,
    }).should('be.visible');
    cy.findByRole('option', {
      name: selectors.filters.sort.options.titleAsc,
    }).click();
    cy.get(selectors.taskCard.card).first().should('be.visible');
  });

  it('should sort tasks by due date', () => {
    cy.findByRole('combobox', {
      name: selectors.filters.sort.combobox,
    }).click();
    cy.get(selectors.dropdown.listbox, {
      timeout: selectors.dropdown.panelTimeout,
    }).should('be.visible');
    cy.findByRole('option', {
      name: selectors.filters.sort.options.dueAsc,
    }).click();
    cy.get(selectors.taskCard.card).should('have.length.at.least', 1);
  });

  it('should clear all filters', () => {
    cy.findByRole('combobox', {
      name: selectors.filters.status.combobox,
    }).click();
    cy.get(selectors.dropdown.listbox, {
      timeout: selectors.dropdown.panelTimeout,
    }).should('be.visible');
    cy.findByRole('option', {
      name: selectors.filters.status.options.todo,
    }).click();

    cy.findByRole('button', { name: selectors.buttons.clearAll }).click();
    cy.get(selectors.taskCard.card).should('have.length.at.least', 1);
  });

  it('should show empty state when no tasks', () => {
    cy.intercept('GET', '/api/tasks', []).as('getEmptyTasks');
    cy.reload();
    cy.wait('@getEmptyTasks');
    cy.findByText(selectors.emptyState.message).should('be.visible');
  });
});
