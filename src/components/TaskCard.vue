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
            v-if="
              ['todo', 'in-progress'].includes(task.status) &&
              isDueSoonOrOverdue
            "
            severity="danger"
            :value="isPastDue ? 'Overdue' : 'Due Soon'"
          />
        </div>
      </div>
    </template>

    <template #content>
      <p>
        <b>Status:</b> <span class="capitalize">{{ task.status }}</span>
      </p>
      <p>
        <b>Priority:</b>
        <Tag :value="priorityLabel" :severity="prioritySeverity" class="ml-2" />
      </p>
      <p>
        <b>Due:</b> <span>{{ formattedDueDate }}</span>
      </p>
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

  <!-- Edit Dialog -->
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
      @cancel="dialogVisible = false"
    />
  </Dialog>

  <!-- Custom Delete Dialog -->
  <Dialog
    v-model:visible="deleteDialogVisible"
    header="Confirm Delete"
    modal
    style="width: 400px"
  >
    <p>
      Are you sure you want to delete
      <strong>"{{ task.title }}"</strong>?
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

<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import Menu from 'primevue/menu';
import Tag from 'primevue/tag';
import { computed, ref } from 'vue';
import TaskCardForm from '../components/TaskCardForm.vue';
import { useTaskStore } from '../store/taskStore';
import type { Task } from '../store/taskStore';

const props = defineProps<{ task: Task }>();
const store = useTaskStore();

const menuRef = ref();
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const deleting = ref(false);

const editableTask = ref<Task>({ ...props.task });

const toggleMenu = (event: MouseEvent) => {
  menuRef.value.toggle(event);
};

const editTask = () => {
  editableTask.value = { ...props.task };
  dialogVisible.value = true;
};

// Open delete dialog
const deleteTask = () => {
  deleteDialogVisible.value = true;
};

// Actually delete
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

/** Date / status computed props... (same as before) **/
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
  () => dueDate.value && dueDate.value.getTime() < now.getTime(),
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
  if (props.task.status === 'done') return 'border-green-400';
  if (props.task.status === 'in-progress') return 'border-yellow-400';
  if (
    isDueSoonOrOverdue.value &&
    ['todo', 'in-progress'].includes(props.task.status)
  )
    return 'border-red-500';
  if (props.task.status === 'todo') return 'border-blue-400';
  return 'border-gray-300';
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
