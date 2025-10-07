// src/router/index.ts

import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from 'vue-router';
import DefaultLayout from '../views/layouts/DefaultLayout.vue';
import TaskList from '../views/pages/TaskList.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [{ path: '', component: TaskList, name: 'TaskList' }],
  },
];

// factory function → new instance per request
export function createSSRRouter() {
  const isServer = typeof window === 'undefined';

  return createRouter({
    history: isServer ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}
