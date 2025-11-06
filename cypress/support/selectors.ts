/**
 * Centralized E2E Test Selectors
 *
 * This file contains all selectors used in E2E tests.
 * This centralization makes it easy to update selectors when UI changes,
 * without modifying the test logic itself.
 *
 * Usage:
 * ```typescript
 * import { selectors } from '../support/selectors';
 * cy.findByRole('button', { name: selectors.buttons.createTask }).click();
 * ```
 */

export const selectors = {
  // Page elements
  page: {
    heading: 'Task List',
    appTitle: 'My Keep',
  },

  // Buttons
  buttons: {
    createTask: 'Create Task',
    update: 'Update',
    create: 'Create',
    delete: 'Delete',
    cancel: 'Cancel',
    clearAll: /clear all/i,
    options: 'Options',
  },

  // Form fields
  form: {
    title: 'Title',
    description: 'Description',
    status: 'Status',
    priority: 'Priority',
    dueDate: 'Due Date',
    // Form field IDs (for PrimeVue dropdowns in dialogs)
    statusId: '#status',
    priorityId: '#priority',
  },

  // Task cards
  taskCard: {
    // CSS selector for PrimeVue Card component
    card: '.p-card',
    // Selector for task title within card
    title: 'strong',
    // Selector for Quill editor (description field)
    editor: '.ql-editor',
  },

  // Dialogs
  dialog: {
    // Generic dialog selector
    dialog: '.p-dialog',
    // Dialog names/aria-labels
    edit: /edit task/i,
    delete: 'Confirm Delete',
  },

  // Menu items
  menu: {
    edit: 'Edit',
    delete: 'Delete',
  },

  // Filters and sorting
  filters: {
    status: {
      combobox: 'Filter by Status',
      options: {
        todo: 'Todo',
        inProgress: 'In Progress',
        done: 'Done',
      },
    },
    priority: {
      combobox: 'Filter by Priority',
      options: {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
      },
    },
    sort: {
      combobox: 'Sort By',
      options: {
        titleAsc: 'Title (A–Z)',
        titleDesc: 'Title (Z–A)',
        dueAsc: 'Due Date (Earliest)',
        dueDesc: 'Due Date (Latest)',
      },
    },
  },

  // Dropdowns (PrimeVue components)
  dropdown: {
    // Role selector for listbox
    listbox: '[role="listbox"]',
    // Role selector for combobox
    combobox: '[role="combobox"]',
    // Timeout for dropdown panel to appear
    panelTimeout: 5000,
  },

  // Timeouts
  timeouts: {
    dialog: 10000,
    taskUpdate: 5000,
    dropdown: 5000,
  },

  // Empty state
  emptyState: {
    message: /no tasks/i,
  },
} as const;

/**
 * Helper function to get a task card by index
 */
export function getTaskCard(index: number = 0) {
  return cy.get(selectors.taskCard.card).eq(index);
}

/**
 * Helper function to get the first task card
 */
export function getFirstTaskCard() {
  return cy.get(selectors.taskCard.card).first();
}

/**
 * Helper function to wait for dropdown panel to appear
 */
export function waitForDropdownPanel() {
  return cy
    .get(selectors.dropdown.listbox, {
      timeout: selectors.dropdown.panelTimeout,
    })
    .should('be.visible');
}

/**
 * Helper function to select an option from a dropdown
 */
export function selectDropdownOption(optionName: string) {
  waitForDropdownPanel();
  cy.findByRole('option', { name: optionName }).click();
}

/**
 * Helper function to wait for dialog to close
 */
export function waitForDialogClose() {
  return cy
    .get(selectors.dialog.dialog, {
      timeout: selectors.timeouts.dialog,
    })
    .should('not.exist');
}
