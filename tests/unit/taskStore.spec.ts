import { setActivePinia, createPinia } from 'pinia';
import { useTaskStore } from '@/store/taskStore';

describe('Task Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('adds a task', () => {
    const store = useTaskStore();
    store.addTask({
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      status: 'todo',
      priority: 'medium',
      dueDate: '2025-09-19',
    });
    expect(store.tasks.length).toBe(1);
  });

  it('updates a task', () => {
    const store = useTaskStore();
    const task = {
      id: '1',
      title: 'Old Title',
      description: 'Old',
      status: 'todo',
      priority: 'low',
      dueDate: '2025-09-19',
    };
    store.addTask(task);
    store.updateTask({ ...task, title: 'Updated Title' });
    expect(store.tasks[0].title).toBe('Updated Title');
  });

  it('deletes a task', () => {
    const store = useTaskStore();
    const task = {
      id: '1',
      title: 'Delete Me',
      description: 'Temp',
      status: 'todo',
      priority: 'high',
      dueDate: '2025-09-19',
    };
    store.addTask(task);
    store.deleteTask('1');
    expect(store.tasks.length).toBe(0);
  });
});
