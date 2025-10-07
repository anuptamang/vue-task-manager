// src/store/taskStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Task } from '../../generated/prisma';

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>([]);

  /**
   * Load tasks from backend API.
   */
  const loadTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      tasks.value = await res.json();
    } catch (err) {
      console.error('Error loading tasks:', err);
    }
  };

  /**
   * Add a new task to the database.
   */
  const addTask = async (
    task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
  ) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error('Failed to add task');
      const newTask: Task = await res.json();
      tasks.value.push(newTask);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  /**
   * Update an existing task in the database.
   */
  const updateTask = async (updated: Omit<Task, 'createdAt' | 'updatedAt'>) => {
    try {
      const { id, title, description, status, priority, dueDate } = updated;

      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status, priority, dueDate }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      const savedTask: Task = await res.json();
      const index = tasks.value.findIndex((t) => t.id === savedTask.id);
      if (index !== -1) tasks.value[index] = savedTask;
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  /**
   * Delete a task by ID in the database.
   */
  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      tasks.value = tasks.value.filter((t) => t.id !== id);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return { tasks, loadTasks, addTask, updateTask, deleteTask };
});
