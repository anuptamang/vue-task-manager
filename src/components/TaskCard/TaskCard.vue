<script setup lang="ts">
import { computed, ref } from 'vue';
import { Card, Dialog, Menu, Button } from 'primevue';
import TaskCardForm from './TaskCardForm.vue';
import CardHeader from './CardHeader.vue';
import CardBody from './CardBody.vue';
import CardFooter from './CardFooter.vue';
import { useTaskStore } from '../../store/taskStore';
import type { Task } from '../../../generated/prisma';

const props = defineProps<{ task: Task }>();

const store = useTaskStore();

const menuRef = ref();
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const deleting = ref(false);
const editableTask = ref<Task>({ ...props.task });

/** menu actions */
const toggleMenu = (event: MouseEvent) => menuRef.value?.toggle(event);
const editTask = () => {
  editableTask.value = { ...props.task };
  dialogVisible.value = true;
};
const deleteTask = () => (deleteDialogVisible.value = true);
const confirmDelete = async () => {
  deleting.value = true;
  try {
    await store.deleteTask(props.task.id);
    deleteDialogVisible.value = false;
  } finally {
    deleting.value = false;
  }
};

const menuItems = [
  { label: 'Edit', icon: 'pi pi-pencil', command: editTask },
  { label: 'Delete', icon: 'pi pi-trash', command: deleteTask },
];

/** derived state */
const formattedDueDate = computed(() => {
  if (!props.task.dueDate) return '—';
  const date = new Date(props.task.dueDate);
  return date.toISOString().split('T')[0];
});
const now = new Date();
const dueDate = computed(() =>
  props.task.dueDate ? new Date(props.task.dueDate) : null,
);
const isPastDue = computed(
  () => !!dueDate.value && dueDate.value.getTime() < now.getTime(),
);
const isNearDue = computed(() => {
  if (!dueDate.value) return false;
  const diff = dueDate.value.getTime() - now.getTime();
  return diff > 0 && diff <= 24 * 60 * 60 * 1000;
});
const isDueSoonOrOverdue = computed(() => isNearDue.value || isPastDue.value);

const statusSeverity = computed(() => {
  if (props.task.status === 'done') return 'success';
  if (props.task.status === 'in-progress') return 'warn';
  if (isDueSoonOrOverdue.value && props.task.status === 'todo') return 'danger';
  if (props.task.status === 'todo') return 'info';
  return 'secondary';
});
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
const statusClass = computed(() => {
  if (props.task.status === 'done') return 'border border-green-400';
  if (props.task.status === 'in-progress') return 'border border-yellow-400';
  if (
    isDueSoonOrOverdue.value &&
    ['todo', 'in-progress'].includes(props.task.status)
  )
    return 'border border-red-500';
  if (props.task.status === 'todo') return 'border border-blue-400';
  return 'border border-gray-300';
});
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

<template>
  <Card
    class="shadow-md border-round surface-card mb-[20px] break-inside-avoid"
    :class="statusClass"
  >
    <template #title>
      <CardHeader
        :title="task.title"
        :status-label="statusLabel"
        :status-severity="statusSeverity"
        :show-due-flag="
          ['todo', 'in-progress'].includes(task.status) && isDueSoonOrOverdue
        "
        :due-flag-label="isPastDue ? 'Overdue' : 'Due Soon'"
      />
    </template>

    <template #content>
      <CardBody
        :status="task.status"
        :priority-label="priorityLabel"
        :priority-severity="prioritySeverity"
        :formatted-due-date="formattedDueDate"
        :description="task.description"
      />
    </template>

    <template #footer>
      <CardFooter @menu-click="toggleMenu">
        <Menu ref="menuRef" :model="menuItems" :popup="true" />
      </CardFooter>
    </template>
  </Card>

  <!-- Edit Dialog -->
  <Dialog
    v-model:visible="dialogVisible"
    :header="`Edit Task: ${task.title}`"
    modal
    style="width: 500px"
  >
    <TaskCardForm
      :task="editableTask"
      :isEdit="true"
      @cancel="dialogVisible = false"
    />
  </Dialog>

  <!-- Delete Dialog -->
  <Dialog
    v-model:visible="deleteDialogVisible"
    header="Confirm Delete"
    modal
    style="width: 400px"
  >
    <p>
      Are you sure you want to delete <strong>"{{ task.title }}"</strong>?
    </p>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        severity="secondary"
        @click="deleteDialogVisible = false"
        :disabled="deleting"
      />
      <Button
        label="Delete"
        icon="pi pi-trash"
        severity="danger"
        :loading="deleting"
        @click="confirmDelete"
      />
    </template>
  </Dialog>
</template>

<style>
/* Gray */
.border-gray-300 {
  border-color: #d1d5db;
}
.border-gray-400 {
  border-color: #9ca3af;
}
.border-gray-500 {
  border-color: #6b7280;
}
/* Red */
.border-red-400 {
  border-color: #f87171;
}
.border-red-500 {
  border-color: #ef4444;
}
/* Yellow */
.border-yellow-400 {
  border-color: #facc15;
}
.border-yellow-500 {
  border-color: #eab308;
}
/* Green */
.border-green-400 {
  border-color: #4ade80;
}
.border-green-500 {
  border-color: #22c55e;
}
/* Blue */
.border-blue-400 {
  border-color: #60a5fa;
}
.border-blue-500 {
  border-color: #3b82f6;
}
</style>
