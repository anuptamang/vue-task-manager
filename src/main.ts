// src/main.ts
import 'primeicons/primeicons.css';
import 'quill/dist/quill.snow.css';
import './style.css';

import { createSSRApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';
import { persistedState } from './plugins/persistedState';

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  pinia.use(persistedState);
  app.use(pinia);
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  });
  app.use(ConfirmationService);
  app.use(ToastService);
  app.use(DialogService);

  return { app };
}
