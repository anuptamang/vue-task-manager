// src/entry-client.ts
import { createApp } from './main';
import { createSSRRouter } from './router';

const { app } = createApp();
const router = createSSRRouter();

app.use(router);

router.isReady().then(() => {
  app.mount('#app', true);
});
