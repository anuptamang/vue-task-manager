import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../views/layouts/DefaultLayout.vue';
import TaskList from '../views/pages/TaskList.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: TaskList, name: 'TaskList' },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
