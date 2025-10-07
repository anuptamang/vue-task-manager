// src/views/pages/TaskList.vue
<template>
  <div class="hold">
    <h1>Task List</h1>

    <div class="flex flex-wrap gap-[12px] mb-6 items-center">
      <Dropdown
        v-model="selectedStatus"
        :options="statusOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Filter by Status"
        class="w-48"
        showClear
      />

      <Dropdown
        v-model="selectedPriority"
        :options="priorityOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Filter by Priority"
        class="w-48"
        showClear
      />

      <Dropdown
        v-model="sortOption"
        :options="sortOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Sort By"
        class="w-48"
      />

      <Button
        label="Clear All"
        severity="secondary"
        icon="pi pi-times"
        @click="clearAllFilters"
      />
    </div>

    <div class="pt-[20px]">
      <div v-if="filteredAndSortedTasks?.length > 0" class="columns-3">
        <TaskCard
          v-for="task in filteredAndSortedTasks"
          :key="task.id"
          :task="task"
        />
      </div>

      <div v-else class="text-gray-500 py-10 columns-3">
        <div class="">
          <p>No tasks!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '../../store/taskStore';
import TaskCard from '../../components/TaskCard.vue';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

const store = useTaskStore();

onMounted(() => {
  store.loadTasks();
});

/** Reactive list of tasks from Pinia store */
const tasks = computed(() => store.tasks);

/** Selected status filter */
const selectedStatus = ref<string | null>(null);

/** Selected priority filter */
const selectedPriority = ref<string | null>(null);

/** Selected sorting option */
const sortOption = ref<string | null>(null);

const statusOptions = [
  { label: 'Todo', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Done', value: 'done' },
];

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

const sortOptions = [
  { label: 'Title (A–Z)', value: 'title-asc' },
  { label: 'Title (Z–A)', value: 'title-desc' },
  { label: 'Due Date (Earliest)', value: 'due-asc' },
  { label: 'Due Date (Latest)', value: 'due-desc' },
];

/**
 * Filter and sort tasks based on status, priority, and sort options.
 */
const filteredAndSortedTasks = computed(() => {
  let result = [...tasks.value];

  if (selectedStatus.value) {
    result = result.filter((t) => t.status === selectedStatus.value);
  }

  if (selectedPriority.value) {
    result = result.filter((t) => t.priority === selectedPriority.value);
  }

  if (sortOption.value) {
    switch (sortOption.value) {
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
  }

  return result;
});

/** Clear all filters and sorting */
const clearAllFilters = () => {
  selectedStatus.value = null;
  selectedPriority.value = null;
  sortOption.value = null;
};
</script>
