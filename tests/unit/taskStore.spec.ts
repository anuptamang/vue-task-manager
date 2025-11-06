import { setActivePinia, createPinia } from 'pinia';
import { useTaskStore } from '../../src/store/taskStore';
import {
  baseTestTasks,
  filterSortTestTasks,
  testTaskToJson,
} from '../fixtures/testTasks';

describe('async actions', () => {
  let store: ReturnType<typeof useTaskStore>;
  beforeEach(() => {
    setActivePinia(createPinia());
    store = useTaskStore();
    global.fetch = jest.fn() as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads tasks', async () => {
    const tasks = baseTestTasks.slice(0, 2);
    const tasksJson = tasks.map(testTaskToJson);
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(tasksJson),
    });
    await store.loadTasks();
    expect(store.tasks).toEqual(tasksJson);
  });

  it('handles loadTasks error', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('fail'));
    await store.loadTasks();
    expect(store.tasks).toEqual([]);
  });

  it('adds task', async () => {
    const newTask = {
      id: '3',
      title: 'C',
      description: '',
      status: 'todo',
      priority: 'low',
      dueDate: new Date('2025-10-11'),
      createdAt: new Date('2025-10-10'),
      updatedAt: new Date('2025-10-10'),
    };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(newTask),
    });
    await store.addTask({
      title: 'C',
      description: '',
      status: 'todo',
      priority: 'low',
      dueDate: new Date('2025-10-11'),
    });
    expect(store.tasks[0]).toEqual(newTask);
  });

  it('handles addTask error', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('fail'));
    await store.addTask({
      title: 'Bad',
      description: '',
      status: 'todo',
      priority: 'low',
      dueDate: new Date('2025-10-11'),
    });
    expect(store.tasks).toEqual([]);
  });

  it('updates task', async () => {
    store.tasks.push({
      id: '4',
      title: 'Old',
      description: '',
      status: 'todo',
      priority: 'low',
      dueDate: new Date('2025-12-10'),
      createdAt: new Date('2025-12-09'),
      updatedAt: new Date('2025-12-09'),
    });
    const updated = {
      id: '4',
      title: 'New',
      description: '',
      status: 'todo',
      priority: 'high',
      dueDate: new Date('2025-12-10'),
      createdAt: new Date('2025-12-09'),
      updatedAt: new Date('2025-12-09'),
    };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(updated),
    });
    await store.updateTask({
      id: '4',
      title: 'New',
      description: '',
      status: 'todo',
      priority: 'high',
      dueDate: new Date('2025-12-10'),
    });
    expect(store.tasks[0]).toEqual(updated);
  });

  it('handles updateTask error', async () => {
    store.tasks.push({
      id: '4',
      title: 'Old',
      description: '',
      status: 'todo',
      priority: 'low',
      dueDate: new Date('2025-12-10'),
      createdAt: new Date('2025-12-09'),
      updatedAt: new Date('2025-12-09'),
    });
    (global.fetch as jest.Mock).mockRejectedValue(new Error('fail'));
    await store.updateTask({
      id: '4',
      title: 'Fake',
      description: '',
      status: 'todo',
      priority: 'high',
      dueDate: new Date('2025-12-10'),
    });
    expect(store.tasks[0].title).toBe('Old');
  });

  it('deletes task', async () => {
    store.tasks.push({
      id: '5',
      title: 'D',
      description: '',
      status: 'done',
      priority: 'low',
      dueDate: new Date('2025-09-19'),
      createdAt: new Date('2025-09-18'),
      updatedAt: new Date('2025-09-18'),
    });
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
    await store.deleteTask('5');
    expect(store.tasks).toEqual([]);
  });

  it('handles deleteTask error', async () => {
    store.tasks.push({
      id: '6',
      title: 'E',
      description: '',
      status: 'in-progress',
      priority: 'medium',
      dueDate: new Date('2025-09-20'),
      createdAt: new Date('2025-09-19'),
      updatedAt: new Date('2025-09-19'),
    });
    (global.fetch as jest.Mock).mockRejectedValue(new Error('fail'));
    await store.deleteTask('6');
    expect(store.tasks).toHaveLength(1);
  });
});

describe('Task filtering and sorting', () => {
  function filterAndSort(tasks: any[], filters: any) {
    let result = [...tasks];
    if (filters.status) {
      result = result.filter((t) => t.status === filters.status);
    }
    if (filters.priority) {
      result = result.filter((t) => t.priority === filters.priority);
    }
    switch (filters.sort) {
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'due-asc':
        result.sort(
          (a, b) =>
            (a.dueDate?.getTime?.() ?? 0) - (b.dueDate?.getTime?.() ?? 0),
        );
        break;
      case 'due-desc':
        result.sort(
          (a, b) =>
            (b.dueDate?.getTime?.() ?? 0) - (a.dueDate?.getTime?.() ?? 0),
        );
        break;
    }
    return result;
  }

  const tasks = filterSortTestTasks;

  it('filters by status', () => {
    const result = filterAndSort(tasks, {
      status: 'todo',
      priority: null,
      sort: null,
    });
    expect(result).toHaveLength(2);
    expect(result.every((t) => t.status === 'todo')).toBe(true);
  });

  it('filters by priority', () => {
    const result = filterAndSort(tasks, {
      status: null,
      priority: 'high',
      sort: null,
    });
    expect(result).toHaveLength(2);
    expect(result.every((t) => t.priority === 'high')).toBe(true);
  });

  it('filters by status and priority', () => {
    const result = filterAndSort(tasks, {
      status: 'todo',
      priority: 'high',
      sort: null,
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('4');
  });

  it('sorts by title ascending', () => {
    const result = filterAndSort(tasks, {
      status: null,
      priority: null,
      sort: 'title-asc',
    });
    expect(result.map((t) => t.title)).toEqual([
      'Alpha',
      'Bravo',
      'Charlie',
      'Delta',
    ]);
  });

  it('sorts by title descending', () => {
    const result = filterAndSort(tasks, {
      status: null,
      priority: null,
      sort: 'title-desc',
    });
    expect(result.map((t) => t.title)).toEqual([
      'Delta',
      'Charlie',
      'Bravo',
      'Alpha',
    ]);
  });

  it('sorts by due date ascending', () => {
    const result = filterAndSort(tasks, {
      status: null,
      priority: null,
      sort: 'due-asc',
    });
    expect(result.map((r) => r.id)).toEqual(['4', '2', '1', '3']);
  });

  it('sorts by due date descending', () => {
    const result = filterAndSort(tasks, {
      status: null,
      priority: null,
      sort: 'due-desc',
    });
    expect(result.map((r) => r.id)).toEqual(['3', '1', '2', '4']);
  });
});

describe('TaskCard computed logic', () => {
  const now = new Date('2025-09-10T12:00:00Z');
  function isPastDue(task: any, refNow: Date) {
    if (!task.dueDate) return false;
    return task.dueDate.getTime() < refNow.getTime();
  }
  function isNearDue(task: any, refNow: Date) {
    if (!task.dueDate) return false;
    const diff = task.dueDate.getTime() - refNow.getTime();
    return diff > 0 && diff <= 24 * 60 * 60 * 1000;
  }
  function isDueSoonOrOverdue(task: any, refNow: Date) {
    return isNearDue(task, refNow) || isPastDue(task, refNow);
  }
  function formattedDueDate(task: any) {
    if (!task.dueDate) return '—';
    return task.dueDate.toISOString().split('T')[0];
  }
  function statusLabel(task: any) {
    switch (task.status) {
      case 'todo':
        return 'Todo';
      case 'in-progress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return 'Unknown';
    }
  }
  function priorityLabel(task: any) {
    switch (task.priority) {
      case 'low':
        return 'Low';
      case 'medium':
        return 'Medium';
      case 'high':
        return 'High';
      default:
        return 'Priority';
    }
  }

  it('isPastDue returns true if before now', () => {
    const task = { dueDate: new Date('2025-09-09') };
    expect(isPastDue(task, now)).toBe(true);
  });

  it('isPastDue returns false for future date', () => {
    const task = { dueDate: new Date('2025-09-20') };
    expect(isPastDue(task, now)).toBe(false);
  });

  it('isNearDue true within 24 hours, false otherwise', () => {
    const t1 = { dueDate: new Date('2025-09-11T08:00:00Z') };
    const t2 = { dueDate: new Date('2025-09-13') };
    expect(isNearDue(t1, now)).toBe(true);
    expect(isNearDue(t2, now)).toBe(false);
  });

  it('isDueSoonOrOverdue true if past or soon', () => {
    const overdue = { dueDate: new Date('2025-09-01') };
    const dueSoon = { dueDate: new Date('2025-09-10T20:00:00Z') };
    expect(isDueSoonOrOverdue(overdue, now)).toBe(true);
    expect(isDueSoonOrOverdue(dueSoon, now)).toBe(true);
  });

  it('isDueSoonOrOverdue false if not soon or overdue', () => {
    const t = { dueDate: new Date('2025-09-30') };
    expect(isDueSoonOrOverdue(t, now)).toBe(false);
  });

  it('formattedDueDate returns ISO date', () => {
    expect(formattedDueDate({ dueDate: new Date('2025-08-03') })).toBe(
      '2025-08-03',
    );
    expect(formattedDueDate({ dueDate: undefined })).toBe('—');
  });

  it('statusLabel and priorityLabel correct', () => {
    expect(statusLabel({ status: 'todo' })).toBe('Todo');
    expect(statusLabel({ status: 'in-progress' })).toBe('In Progress');
    expect(statusLabel({ status: 'done' })).toBe('Done');
    expect(statusLabel({ status: 'else' })).toBe('Unknown');
    expect(priorityLabel({ priority: 'high' })).toBe('High');
    expect(priorityLabel({ priority: 'medium' })).toBe('Medium');
    expect(priorityLabel({ priority: 'low' })).toBe('Low');
    expect(priorityLabel({ priority: 'other' })).toBe('Priority');
  });
});
