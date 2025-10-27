<script setup lang="ts">
import { Button } from 'primevue';

const emit = defineEmits<{
  (e: 'menu-click', event: MouseEvent): void;
}>();

const onClick = (e: MouseEvent) => emit('menu-click', e);
</script>

<template>
  <div class="flex justify-end">
    <Button
      icon="pi pi-ellipsis-v"
      severity="secondary"
      rounded
      outlined
      class="p-button-sm"
      aria-label="Options"
      @click="onClick"
    />
    <slot />
  </div>
</template>
