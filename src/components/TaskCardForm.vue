/**
 * TaskCardForm Component
 * Handles creation and editing of tasks:
 * - Title, description, status, priority, due date
 * Emits:
 * - `save` (Task) → when task is saved
 * - `cancel` → when dialog is closed
 */
<template>
  <div class="p-4">
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 max-w-md">
      <div>
        <label for="title" class="block mb-[10px] mt-[10px] font-medium">Title</label>
        <InputText
          id="title"
          v-model="localTask.title"
          placeholder="Enter title"
          required
          class="w-full"
        />
      </div>

      <div>
        <label for="description" class="block mb-[10px] mt-[10px] font-medium">Description</label>
        <Editor
          id="description"
          v-model="localTask.description"
          editorStyle="height: 200px"
          placeholder="Enter description"
          class="w-full"
        />
      </div>

      <div>
        <label for="status" class="block mb-[10px] mt-[10px] font-medium">Status</label>
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
        <label for="priority" class="block mb-[10px] mt-[10px] font-medium">Priority</label>
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
        <label for="dueDate" class="block mb-[10px] mt-[10px] font-medium">Due Date</label>
        <Calendar
          id="dueDate"
          v-model="localTask.dueDate"
          dateFormat="yy-mm-dd"
          showIcon
          class="w-full"
        />
      </div>

      <div class="flex gap-[10px] pt-[20px]">
        <Button type="submit" :label="isEdit ? 'Update' : 'Create'" icon="pi pi-check" />
        <Button label="Cancel" severity="secondary" icon="pi pi-times" @click="handleCancel" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { onMounted, ref } from 'vue';
import type { Task } from '../store/taskStore';
import { useTaskStore } from '../store/taskStore';

import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Editor from 'primevue/editor';
import InputText from 'primevue/inputtext';

/**
 * Props for TaskCardForm
 */
const props = defineProps<{
  task?: Task;
  isEdit?: boolean;
}>();

/**
 * Events emitted by TaskCardForm
 */
const emit = defineEmits<{
  (e: 'save', task: Task): void;
  (e: 'cancel'): void;
}>();

const store = useTaskStore();

const isEdit = props.isEdit === true;

/**
 * Deep clone of a Task to avoid mutating props.
 * @param {Task} task - Task to clone
 * @returns {Task} - Cloned task
 */
const cloneTask = (task: Task): Task => ({
  ...task,
  dueDate: task.dueDate ? new Date(task.dueDate) : null,
});

/**
 * Local editable copy of task
 */
const localTask = ref<Task>(
  props.task
    ? cloneTask(props.task)
    : {
        id: '',
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        dueDate: null,
      }
);

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

onMounted(() => {
  store.loadTasks();
  if (isEdit && props.task) {
    localTask.value = cloneTask(props.task);
  }
});

/**
 * Save task (update or create)
 */
const handleSubmit = async () => {
  const saveTask: Task = {
    ...localTask.value,
    dueDate: localTask.value.dueDate
      ? new Date(localTask.value.dueDate).toISOString()
      : null,
  };

  try {
    if (props.isEdit) {
      await store.updateTask(saveTask);
    } else {
      saveTask.id = uuidv4();
      await store.addTask(saveTask);
    }

    emit('cancel');
  } catch (err) {
    console.error('Failed to save task:', err);
  }
};

/**
 * Cancel and close form
 */
const handleCancel = () => {
  emit('cancel');
};
</script>
