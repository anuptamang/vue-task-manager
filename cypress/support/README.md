# Cypress Support Files

This directory contains support files for Cypress E2E tests.

## Files

### `selectors.ts`

**Centralized E2E test selectors** - Single source of truth for all selectors used in E2E tests.

This file organizes all selectors by component/page area:
- **Page elements** - Headings, titles, etc.
- **Buttons** - All button labels/text
- **Form fields** - Input labels and IDs
- **Task cards** - Card selectors and internal elements
- **Dialogs** - Dialog selectors and names
- **Menu items** - Menu option labels
- **Filters and sorting** - Filter/sort comboboxes and options
- **Dropdowns** - Generic dropdown selectors
- **Timeouts** - Centralized timeout values
- **Empty state** - Empty state message selectors

**Benefits:**
- ✅ Easy to update selectors when UI changes
- ✅ No need to modify test logic when selectors change
- ✅ Consistent selectors across all tests
- ✅ Better maintainability

**Usage:**
```typescript
import { selectors } from '../support/selectors';

// Use selectors in tests
cy.findByRole('button', { name: selectors.buttons.createTask }).click();
cy.findByLabelText(selectors.form.title).type('New Task');
cy.get(selectors.taskCard.card).should('have.length.at.least', 1);
```

### `commands.ts`

Custom Cypress commands for reusable test actions.

### `e2e.ts`

E2E support file that:
- Imports `@testing-library/cypress/add-commands`
- Loads custom commands
- Exports selectors for use in tests

## Best Practices

1. **Always use centralized selectors** - Don't use inline selectors in test files
2. **Update selectors.ts when UI changes** - Keep selectors in sync with the UI
3. **Use descriptive selector names** - Make it clear what each selector targets
4. **Group related selectors** - Organize by component/page area

## Adding New Selectors

When adding new UI elements that need to be tested:

1. Add the selector to `selectors.ts` in the appropriate section
2. Use the selector in your test file
3. Update this README if needed

**Example:**
```typescript
// In selectors.ts
export const selectors = {
  // ... existing selectors
  newComponent: {
    button: 'New Button Label',
    input: 'Input Label',
  },
};

// In test file
cy.findByRole('button', { name: selectors.newComponent.button }).click();
```
