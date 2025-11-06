<script setup lang="ts">
import { computed } from 'vue';
import { Tag } from 'primevue';
import type { Task } from '../../../generated/prisma';
import { useTaskLabels } from '../../composables/useTaskLabels';
import { useTaskDates } from '../../composables/useTaskDates';

const props = defineProps<{
  task: Task;
}>();

const { statusLabel, priorityLabel, prioritySeverity } = useTaskLabels(
  computed(() => props.task.status),
  computed(() => props.task.priority),
);

const { formattedDueDate } = useTaskDates(
  computed(() => props.task.dueDate),
  computed(() => props.task.status),
);
</script>

<template>
  <div>
    <p>
      <b>Status:</b> <span class="capitalize">{{ statusLabel }}</span>
    </p>

    <p class="flex items-center gap-2">
      <b>Priority:</b>
      <Tag :value="priorityLabel" :severity="prioritySeverity" class="ml-0" />
    </p>

    <p>
      <b>Due:</b> <span>{{ formattedDueDate }}</span>
    </p>

    <p><b>Description:</b></p>
    <div v-html="task.description" class="prose"></div>
  </div>
</template>
