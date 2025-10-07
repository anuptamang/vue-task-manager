// src/entry-server.ts
import { renderToString } from '@vue/server-renderer';
import { createApp } from './main';
import { createSSRRouter } from './router';

export async function render(url: string) {
  const { app } = createApp();
  const router = createSSRRouter();

  app.use(router);

  router.push(url);
  await router.isReady();

  const appHtml = await renderToString(app);

  return {
    head: '',
    html: appHtml,
  };
}
