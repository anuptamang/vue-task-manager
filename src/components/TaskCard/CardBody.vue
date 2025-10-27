<script setup lang="ts">
import { Tag } from 'primevue';

const props = defineProps<{
  status: 'todo' | 'in-progress' | 'done' | string;
  priorityLabel: string;
  prioritySeverity: 'secondary' | 'warn' | 'danger';
  formattedDueDate: string;
  description: string;
}>();
</script>

<template>
  <div>
    <p>
      <b>Status:</b> <span class="capitalize">{{ props.status }}</span>
    </p>

    <p class="flex items-center gap-2">
      <b>Priority:</b>
      <Tag
        :value="props.priorityLabel"
        :severity="props.prioritySeverity"
        class="ml-0"
      />
    </p>

    <p>
      <b>Due:</b> <span>{{ props.formattedDueDate }}</span>
    </p>

    <p><b>Description:</b></p>
    <div v-html="props.description" class="prose"></div>
  </div>
</template>
