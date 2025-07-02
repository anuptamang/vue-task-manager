// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '@/views/TaskList.vue';
import TaskForm from '@/views/TaskForm.vue';

const routes = [
  { path: '/', name: 'TaskList', component: TaskList },
  { path: '/create', name: 'TaskCreate', component: TaskForm },
  { path: '/edit/:id', name: 'TaskEdit', component: TaskForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
