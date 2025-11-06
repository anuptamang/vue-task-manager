# Test Data Fixtures

This directory contains centralized test data for both unit tests (Jest) and E2E tests (Cypress).

## Single Source of Truth

All test data is centralized in `testTasks.ts` to avoid conflicts and maintain consistency across test suites.

## Files

### `testTasks.ts`

**The single source of truth for all test task data.**

This TypeScript file exports:
- `baseTestTasks` - Base test tasks for most E2E and unit tests
- `filterSortTestTasks` - Tasks specifically designed for filtering and sorting tests
- `testTaskToJson()` - Helper to convert TestTask to JSON format (for API responses)
- `testTasksToJson()` - Helper to convert array of TestTask to JSON format

**Usage in Unit Tests:**
```typescript
import { baseTestTasks, filterSortTestTasks, testTaskToJson } from '../fixtures/testTasks';

// Use directly in tests
const tasks = baseTestTasks;

// Convert to JSON for API mocking
const tasksJson = testTasksToJson(baseTestTasks);
```

**Usage in E2E Tests:**
E2E tests use the JSON file `cypress/fixtures/tasks.json` which is generated from this centralized data.

### `generateCypressFixtures.ts`

Script to regenerate `cypress/fixtures/tasks.json` from the centralized test data.

**Usage:**
```bash
npm run test:sync-fixtures
```

This ensures the Cypress fixtures stay in sync with the centralized test data.

## Adding New Test Data

1. **Add to `testTasks.ts`**:
   - Add new test task arrays if needed for specific test scenarios
   - Always use the `TestTask` interface for type safety

2. **Update Cypress fixtures** (if needed):
   ```bash
   npm run test:sync-fixtures
   ```

3. **Import in test files**:
   ```typescript
   import { baseTestTasks, filterSortTestTasks } from '../fixtures/testTasks';
   ```

## Best Practices

✅ **DO:**
- Use centralized test data from `testTasks.ts`
- Import and reuse test data across test files
- Use helper functions (`testTaskToJson`) for format conversion
- Keep Cypress fixtures in sync using `test:sync-fixtures`

❌ **DON'T:**
- Create duplicate test data in individual test files
- Manually edit `cypress/fixtures/tasks.json` - use the sync script instead
- Create new test data arrays without adding them to `testTasks.ts`

## Example

```typescript
// ❌ Bad - Duplicate test data
it('should test something', () => {
  const tasks = [
    { id: '1', title: 'Test', ... },
    { id: '2', title: 'Test 2', ... },
  ];
});

// ✅ Good - Use centralized data
import { baseTestTasks } from '../fixtures/testTasks';

it('should test something', () => {
  const tasks = baseTestTasks;
});
```
