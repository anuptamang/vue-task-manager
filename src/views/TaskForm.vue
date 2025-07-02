<!-- src/views/TaskForm.vue -->
<template>
  <div>
    <h1>{{ isEdit ? 'Edit' : 'Create' }} Task</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="task.title" placeholder="Title" required />
      <textarea v-model="task.description" placeholder="Description" required />
      <select v-model="task.status">
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <select v-model="task.priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input type="date" v-model="task.dueDate" required />
      <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useTaskStore, Task } from '@/store/taskStore';
import { v4 as uuidv4 } from 'uuid';

const store = useTaskStore();
const route = useRoute();
const router = useRouter();
const isEdit = route.name === 'TaskEdit';

const task = ref<Task>({
  id: '',
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
});

onMounted(() => {
  store.loadTasks();
  if (isEdit) {
    const existing = store.tasks.find((t) => t.id === route.params.id);
    if (existing) task.value = { ...existing };
  }
});

const handleSubmit = () => {
  if (isEdit) {
    store.updateTask(task.value);
  } else {
    task.value.id = uuidv4();
    store.addTask(task.value);
  }
  router.push('/');
};
</script>
