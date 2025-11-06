/**
 * Centralized Test Data for Unit and E2E Tests
 *
 * This is the single source of truth for all test task data.
 * All test files should import from here to avoid data conflicts.
 */

export interface TestTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Base test tasks - used for most E2E and unit tests
 */
export const baseTestTasks: TestTask[] = [
  {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date('2025-10-15T00:00:00.000Z'),
    createdAt: new Date('2025-09-01T00:00:00.000Z'),
    updatedAt: new Date('2025-09-01T00:00:00.000Z'),
  },
  {
    id: '2',
    title: 'Alpha Task',
    description: 'Another test task',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date('2025-10-20T00:00:00.000Z'),
    createdAt: new Date('2025-09-02T00:00:00.000Z'),
    updatedAt: new Date('2025-09-02T00:00:00.000Z'),
  },
  {
    id: '3',
    title: 'Bravo Task',
    description: 'Completed task',
    status: 'done',
    priority: 'low',
    dueDate: new Date('2025-09-18T00:00:00.000Z'),
    createdAt: new Date('2025-09-03T00:00:00.000Z'),
    updatedAt: new Date('2025-09-03T00:00:00.000Z'),
  },
];

/**
 * Tasks for filtering and sorting tests
 * Designed to test various filter/sort combinations
 */
export const filterSortTestTasks: TestTask[] = [
  {
    id: '1',
    title: 'Alpha',
    description: '',
    status: 'todo',
    priority: 'low',
    dueDate: new Date('2025-10-22T00:00:00.000Z'),
    createdAt: new Date('2025-09-01T00:00:00.000Z'),
    updatedAt: new Date('2025-09-01T00:00:00.000Z'),
  },
  {
    id: '2',
    title: 'Bravo',
    description: '',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date('2025-10-20T00:00:00.000Z'),
    createdAt: new Date('2025-09-02T00:00:00.000Z'),
    updatedAt: new Date('2025-09-02T00:00:00.000Z'),
  },
  {
    id: '3',
    title: 'Charlie',
    description: '',
    status: 'done',
    priority: 'medium',
    dueDate: new Date('2025-11-01T00:00:00.000Z'),
    createdAt: new Date('2025-09-03T00:00:00.000Z'),
    updatedAt: new Date('2025-09-03T00:00:00.000Z'),
  },
  {
    id: '4',
    title: 'Delta',
    description: '',
    status: 'todo',
    priority: 'high',
    dueDate: new Date('2025-09-18T00:00:00.000Z'),
    createdAt: new Date('2025-09-04T00:00:00.000Z'),
    updatedAt: new Date('2025-09-04T00:00:00.000Z'),
  },
];

/**
 * Helper function to convert TestTask to JSON format (for API responses)
 */
export function testTaskToJson(task: TestTask) {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate.toISOString(),
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  };
}

/**
 * Helper function to convert array of TestTask to JSON format
 */
export function testTasksToJson(tasks: TestTask[]) {
  return tasks.map(testTaskToJson);
}
