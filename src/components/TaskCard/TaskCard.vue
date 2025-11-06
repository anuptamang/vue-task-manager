<script setup lang="ts">
import { computed, ref } from 'vue';
import { Card, Dialog, Menu, Button } from 'primevue';
import TaskCardForm from './TaskCardForm.vue';
import CardHeader from './CardHeader.vue';
import CardBody from './CardBody.vue';
import CardFooter from './CardFooter.vue';
import { useTaskStore } from '../../store/taskStore';
import type { Task } from '../../../generated/prisma';
import { useTaskLabels } from '../../composables/useTaskLabels';
import { useTaskDates } from '../../composables/useTaskDates';
import { useDialog } from '../../composables/useDialog';

const props = defineProps<{ task: Task }>();

const store = useTaskStore();

const menuRef = ref();
const editDialog = useDialog();
const deleteDialog = useDialog();
const deleting = ref(false);
const editableTask = ref<Task>({ ...props.task });

const toggleMenu = (event: MouseEvent) => menuRef.value?.toggle(event);
const editTask = () => {
  editableTask.value = { ...props.task };
  editDialog.open();
};
const deleteTask = () => deleteDialog.open();
const confirmDelete = async () => {
  deleting.value = true;
  try {
    await store.deleteTask(props.task.id);
    deleteDialog.close();
  } finally {
    deleting.value = false;
  }
};

const menuItems = [
  { label: 'Edit', icon: 'pi pi-pencil', command: editTask },
  { label: 'Delete', icon: 'pi pi-trash', command: deleteTask },
];

const { statusLabel, statusSeverity } = useTaskLabels(
  computed(() => props.task.status),
  computed(() => props.task.priority),
);

const {
  isDueSoonOrOverdue,
  isPastDue,
  statusClass,
  statusSeverity: dynamicStatusSeverity,
} = useTaskDates(
  computed(() => props.task.dueDate),
  computed(() => props.task.status),
);

const finalStatusSeverity = computed(
  () => dynamicStatusSeverity.value || statusSeverity.value,
);
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
        :status-severity="finalStatusSeverity"
        :show-due-flag="
          ['todo', 'in-progress'].includes(task.status) && isDueSoonOrOverdue
        "
        :due-flag-label="isPastDue ? 'Overdue' : 'Due Soon'"
      />
    </template>

    <template #content>
      <CardBody :task="task" />
    </template>

    <template #footer>
      <CardFooter @menu-click="toggleMenu">
        <Menu ref="menuRef" :model="menuItems" :popup="true" />
      </CardFooter>
    </template>
  </Card>

  <!-- Edit Dialog -->
  <Dialog
    v-model:visible="editDialog.visible.value"
    :header="`Edit Task: ${task.title}`"
    modal
    style="width: 500px"
  >
    <TaskCardForm
      :task="editableTask"
      :isEdit="true"
      @cancel="editDialog.close"
    />
  </Dialog>

  <!-- Delete Dialog -->
  <Dialog
    v-model:visible="deleteDialog.visible.value"
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
        :disabled="deleting"
        @click="deleteDialog.close"
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
