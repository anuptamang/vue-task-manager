<!-- src/components/TaskFilters.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import { Button, Dropdown } from 'primevue';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../constants/taskOptions';

const statusOptions = [...STATUS_OPTIONS];
const priorityOptions = [...PRIORITY_OPTIONS];

const modelValue = defineModel<{
  status: string | null;
  priority: string | null;
  sort: string | null;
}>({
  default: { status: null, priority: null, sort: null },
});

const selectedStatus = ref<string | null>(modelValue.value.status);
const selectedPriority = ref<string | null>(modelValue.value.priority);
const sortOption = ref<string | null>(modelValue.value.sort);

const sortOptions = [
  { label: 'Title (A–Z)', value: 'title-asc' },
  { label: 'Title (Z–A)', value: 'title-desc' },
  { label: 'Due Date (Earliest)', value: 'due-asc' },
  { label: 'Due Date (Latest)', value: 'due-desc' },
];

watch([selectedStatus, selectedPriority, sortOption], () => {
  modelValue.value = {
    status: selectedStatus.value,
    priority: selectedPriority.value,
    sort: sortOption.value,
  };
});

const clearAll = () => {
  selectedStatus.value = null;
  selectedPriority.value = null;
  sortOption.value = null;
  modelValue.value = { status: null, priority: null, sort: null };
};
</script>

<template>
  <div class="flex flex-wrap gap-[12px] mb-6 items-center" data-testid="task-sort-filter">
    <Dropdown
      v-model="selectedStatus"
      :options="statusOptions"
      optionLabel="label"
      optionValue="value"
      placeholder="Filter by Status"
      class="w-48"
      showClear
      data-testid="filter-status"
    />

    <Dropdown
      v-model="selectedPriority"
      :options="priorityOptions"
      optionLabel="label"
      optionValue="value"
      placeholder="Filter by Priority"
      class="w-48"
      showClear
      data-testid="filter-priority"
    />

    <Dropdown
      v-model="sortOption"
      :options="sortOptions"
      optionLabel="label"
      optionValue="value"
      placeholder="Sort By"
      class="w-48"
      data-testid="sort-by"
    />

    <Button
      label="Clear All"
      severity="secondary"
      icon="pi pi-times"
      @click="clearAll"
      data-testid="clear-filters"
    />
  </div>
</template>
