// src/store/taskStore.ts
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

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>([]);

  const loadTasks = () => {
    const saved = localStorage.getItem('tasks');
    if (saved) tasks.value = JSON.parse(saved);
  };

  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
  };

  const addTask = (task: Task) => {
    tasks.value.push(task);
    saveTasks();
  };

  const updateTask = (updated: Task) => {
    const index = tasks.value.findIndex((t) => t.id === updated.id);
    if (index !== -1) {
      tasks.value[index] = updated;
      saveTasks();
    }
  };

  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter((t) => t.id !== id);
    saveTasks();
  };

  return { tasks, loadTasks, addTask, updateTask, deleteTask };
});
