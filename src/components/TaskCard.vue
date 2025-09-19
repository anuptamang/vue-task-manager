/** 
 * TaskCard Component
 * Displays a single task inside a PrimeVue Card with:
 * - Title, status, priority, due date, description
 * - Context menu with Edit + Delete
 * - Edit opens dialog with TaskCardForm
 */
<template>
  <Card
    class="shadow-md border-round surface-card mb-[20px] break-inside-avoid"
    :class="statusClass"
  >
    <template #title>
      <div class="w-full">
        <strong class="capitalize block mb-[10px]">{{ task.title }}</strong>

        <div class="flex gap-[8px]">
          <Tag :value="statusLabel" :severity="statusSeverity" />
          <Tag
            v-if="['todo', 'in-progress'].includes(task.status) && isDueSoonOrOverdue"
            severity="danger"
            :value="isPastDue ? 'Overdue' : 'Due Soon'"
          />
        </div>
      </div>
    </template>

    <template #content>
      <p><b>Status:</b> <span class="capitalize">{{ task.status }}</span></p>
      <p>
        <b>Priority:</b>
        <Tag :value="priorityLabel" :severity="prioritySeverity" class="ml-2" />
      </p>
      <p><b>Due:</b> <span>{{ formattedDueDate }}</span></p>
      <p><b>Description:</b></p>
      <div v-html="task.description" class="prose"></div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <Button
          icon="pi pi-ellipsis-v"
          severity="secondary"
          rounded
          outlined
          class="p-button-sm"
          aria-label="Options"
          @click="toggleMenu"
        />
        <Menu ref="menuRef" :model="menuItems" :popup="true" />
      </div>
    </template>
  </Card>

  <Dialog
    v-model:visible="dialogVisible"
    :header="`Edit Task: ${task.title}`"
    modal
    style="width: 500px"
  >
    <TaskCardForm
      :task="editableTask"
      name="TaskEdit"
      :isEdit="true"
      @save="saveEdit"
      @cancel="dialogVisible = false"
    />
  </Dialog>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import Menu from 'primevue/menu';
import Tag from 'primevue/tag';
import { useConfirm } from 'primevue/useconfirm';
import { computed, ref } from 'vue';
import TaskCardForm from '../components/TaskCardForm.vue';
import { useTaskStore } from '../store/taskStore';
import type { Task } from '../store/taskStore';

const props = defineProps<{ task: Task }>();
const store = useTaskStore();
const confirm = useConfirm();

const menuRef = ref();
const dialogVisible = ref(false);

/** Editable copy of the task */
const editableTask = ref<Task>({ ...props.task });

/** 
 * Open context menu.
 * @param {MouseEvent} event - Menu toggle event
 */
const toggleMenu = (event: MouseEvent) => {
  menuRef.value.toggle(event);
};

/** 
 * Open edit dialog with current task prefilled. 
 */
const editTask = () => {
  editableTask.value = { ...props.task };
  dialogVisible.value = true;
};

/**
 * Save task changes and update store.
 */
const saveEdit = () => {
  store.updateTask(editableTask.value);
  dialogVisible.value = false;
};

/**
 * Show confirmation and delete task from store.
 */
const deleteTask = () => {
  confirm.require({
    message: `Are you sure you want to delete "${props.task.title}"?`,
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    accept: () => store.deleteTask(props.task.id),
  });
};

/** Menu options */
const menuItems = [
  { label: 'Edit', icon: 'pi pi-pencil', command: editTask },
  { label: 'Delete', icon: 'pi pi-trash', command: deleteTask },
];

/** Formatted due date (YYYY-MM-DD) */
const formattedDueDate = computed(() => {
  if (!props.task.dueDate) return '—';
  const date = new Date(props.task.dueDate);
  return date.toISOString().split('T')[0];
});

const now = new Date();
/** Parsed due date */
const dueDate = computed(() =>
  props.task.dueDate ? new Date(props.task.dueDate) : null
);

/** Whether task is overdue */
const isPastDue = computed(
  () => dueDate.value && dueDate.value.getTime() < now.getTime()
);

/** Whether task is due within 24h */
const isNearDue = computed(() => {
  if (!dueDate.value) return false;
  const diff = dueDate.value.getTime() - now.getTime();
  return diff > 0 && diff <= 24 * 60 * 60 * 1000;
});

/** Whether task is near due or overdue */
const isDueSoonOrOverdue = computed(
  () => isNearDue.value || isPastDue.value
);

/** Severity style for task status */
const statusSeverity = computed(() => {
  if (props.task.status === 'done') return 'success';
  if (props.task.status === 'in-progress') return 'warn';
  if (isDueSoonOrOverdue.value && props.task.status === 'todo') return 'danger';
  if (props.task.status === 'todo') return 'info';
  return 'secondary';
});

/** Label for task status */
const statusLabel = computed(() => {
  switch (props.task.status) {
    case 'todo':
      return 'Todo';
    case 'in-progress':
      return 'In Progress';
    case 'done':
      return 'Done';
    default:
      return 'Unknown';
  }
});

/** CSS border class for status */
const statusClass = computed(() => {
  if (props.task.status === 'done') return 'border-green-400';
  if (props.task.status === 'in-progress') return 'border-yellow-400';
  if (isDueSoonOrOverdue.value && ['todo', 'in-progress'].includes(props.task.status))
    return 'border-red-500';
  if (props.task.status === 'todo') return 'border-blue-400';
  return 'border-gray-300';
});

/** Severity style for priority */
const prioritySeverity = computed(() => {
  switch (props.task.priority) {
    case 'low':
      return 'secondary';
    case 'medium':
      return 'warn';
    case 'high':
      return 'danger';
    default:
      return 'secondary';
  }
});

/** Label for task priority */
const priorityLabel = computed(() => {
  switch (props.task.priority) {
    case 'low':
      return 'Low';
    case 'medium':
      return 'Medium';
    case 'high':
      return 'High';
    default:
      return 'Priority';
  }
});
</script>

<style scoped>
.Card {
  border: 2px solid transparent;
}
.border-green-400 {
  border: 2px solid #22c55e !important;
}
.border-yellow-400 {
  border: 2px solid #facc15 !important;
}
.border-blue-400 {
  border: 2px solid #3b82f6 !important;
}
.border-red-500 {
  border: 2px solid #ef4444 !important;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
}
</style>
