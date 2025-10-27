<!-- src/views/pages/TaskList.vue -->
<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useTaskStore } from '../../store/taskStore';
import TaskSortFilter from '../../components/TaskSortFilter.vue';
import TaskGrid from '../../components/TaskGrid.vue';

const store = useTaskStore();

onMounted(() => store.loadTasks());

const tasks = computed(() => store.tasks);

/** Filters and sorting selected from child */
const filters = ref({
  status: null,
  priority: null,
  sort: null,
});

/**
 * Compute filtered and sorted tasks
 */
const filteredAndSortedTasks = computed(() => {
  let result = [...tasks.value];

  if (filters.value.status) {
    result = result.filter((t) => t.status === filters.value.status);
  }

  if (filters.value.priority) {
    result = result.filter((t) => t.priority === filters.value.priority);
  }

  switch (filters.value.sort) {
    case 'title-asc':
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title-desc':
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'due-asc':
      result.sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''));
      break;
    case 'due-desc':
      result.sort((a, b) => (b.dueDate || '').localeCompare(a.dueDate || ''));
      break;
  }

  return result;
});
</script>

<template>
  <div class="hold">
    <h1>Task List</h1>

    <TaskSortFilter v-model="filters" />

    <TaskGrid :tasks="filteredAndSortedTasks" />
  </div>
</template>
