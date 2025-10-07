// src/plugins/persistedState.ts
import type { PiniaPluginContext } from 'pinia';

export function persistedState({ store }: PiniaPluginContext) {
  if (typeof window === 'undefined') return; // skip on server

  const saved = localStorage.getItem(store.$id);
  if (saved) {
    store.$patch(JSON.parse(saved));
  }

  store.$subscribe((_, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state));
  });
}
