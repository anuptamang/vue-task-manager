/** * TaskCardForm Component * Handles creation and editing of tasks: * - Title,
description, status, priority, due date * Emits: * - `save` (Task) → when task
is saved * - `cancel` → when dialog is closed */

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Task } from '../../../generated/prisma';
import { useTaskStore } from '../../store/taskStore';

import { Button, Calendar, Dropdown, InputText } from 'primevue';
import Editor from 'primevue/editor';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../../constants/taskOptions';

const statusOptions = [...STATUS_OPTIONS];
const priorityOptions = [...PRIORITY_OPTIONS];

const props = defineProps<{
  task?: Task;
  isEdit?: boolean;
}>();

const emit = defineEmits<{
  (e: 'save', task: Task): void;
  (e: 'cancel'): void;
}>();

const store = useTaskStore();
const isEdit = props.isEdit === true;
const loading = ref(false);

const cloneTask = (task: Partial<Task>): Task => ({
  id: task.id ?? '',
  title: task.title ?? '',
  description: task.description ?? '',
  status: (task.status as Task['status']) ?? 'todo',
  priority: (task.priority as Task['priority']) ?? 'medium',
  dueDate: task.dueDate ? new Date(task.dueDate) : null,
  createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
  updatedAt: task.updatedAt ? new Date(task.updatedAt) : new Date(),
});

const localTask = ref<Task>(props.task ? cloneTask(props.task) : cloneTask({}));

onMounted(() => {
  if (isEdit && props.task) {
    localTask.value = cloneTask(props.task);
  }
});

const handleSubmit = async () => {
  loading.value = true;
  const payload = {
    ...localTask.value,
    dueDate: localTask.value.dueDate
      ? new Date(localTask.value.dueDate).toISOString()
      : null,
  };

  try {
    let saved: Task;
    if (props.isEdit) {
      saved = await store.updateTask(payload as Task);
    } else {
      saved = await store.addTask(
        payload as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
      );
    }
    emit('save', saved);
  } catch (err) {
    console.error('Failed to save task:', err);
  } finally {
    loading.value = false;
    emit('cancel');
  }
};

const handleCancel = () => emit('cancel');
</script>

<template>
  <div class="p-4">
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 max-w-md">
      <div>
        <label for="title" class="block mb-[10px] mt-[10px] font-medium"
          >Title</label
        >
        <InputText
          id="title"
          v-model="localTask.title"
          placeholder="Enter title"
          required
          class="w-full"
        />
      </div>

      <div>
        <label for="description" class="block mb-[10px] mt-[10px] font-medium"
          >Description</label
        >
        <Editor
          id="description"
          v-model="localTask.description"
          editorStyle="height: 200px"
          placeholder="Enter description"
          class="w-full"
        />
      </div>

      <div>
        <label for="status" class="block mb-[10px] mt-[10px] font-medium"
          >Status</label
        >
        <Dropdown
          id="status"
          v-model="localTask.status"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Select status"
          class="w-full"
        />
      </div>

      <div>
        <label for="priority" class="block mb-[10px] mt-[10px] font-medium"
          >Priority</label
        >
        <Dropdown
          id="priority"
          v-model="localTask.priority"
          :options="priorityOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Select priority"
          class="w-full"
        />
      </div>

      <div>
        <label for="dueDate" class="block mb-[10px] mt-[10px] font-medium"
          >Due Date</label
        >
        <Calendar
          id="dueDate"
          v-model="localTask.dueDate"
          dateFormat="yy-mm-dd"
          showIcon
          class="w-full"
        />
      </div>

      <div class="flex gap-[10px] pt-[20px]">
        <Button
          type="submit"
          :label="isEdit ? 'Update' : 'Create'"
          icon="pi pi-check"
          :loading="loading"
        />
        <Button
          label="Cancel"
          severity="secondary"
          icon="pi pi-times"
          @click="handleCancel"
          :disabled="loading"
        />
      </div>
    </form>
  </div>
</template>
