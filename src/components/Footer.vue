<script setup lang="ts">
const props = defineProps<{
  appName?: string;
  year?: number;
}>();
</script>

<template>
  <footer class="text-center text-sm text-gray-600 py-3">
    <p>
      &copy; {{ props.year ?? new Date().getFullYear() }}
      {{ props.appName ?? 'My Keep' }}
    </p>
  </footer>
</template>
