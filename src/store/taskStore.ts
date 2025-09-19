import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

/**
 * Pinia store for managing tasks (CRUD + localStorage persistence).
 */
export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>([]);

  /**
   * Load tasks from localStorage into the store.
   */
  const loadTasks = () => {
    const saved = localStorage.getItem('tasks');
    if (saved) tasks.value = JSON.parse(saved);
  };

  /**
   * Save current tasks to localStorage.
   */
  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
  };

  /**
   * Add a new task to the store.
   * @param {Task} task - Task object to add
   */
  const addTask = (task: Task) => {
    tasks.value.push(task);
    saveTasks();
  };

  /**
   * Update an existing task in the store.
   * @param {Task} updated - Task with updated values
   */
  const updateTask = (updated: Task) => {
    const index = tasks.value.findIndex((t) => t.id === updated.id);
    if (index !== -1) {
      tasks.value[index] = updated;
      saveTasks();
    }
  };

  /**
   * Delete a task by ID.
   * @param {string} id - Task ID to delete
   */
  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter((t) => t.id !== id);
    saveTasks();
  };

  return { tasks, loadTasks, addTask, updateTask, deleteTask };
});
