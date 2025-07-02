<!-- src/views/TaskList.vue -->
<template>
  <div>
    <h1>Task List</h1>
    <router-link to="/create">+ Create Task</router-link>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <strong>{{ task.title }}</strong> — {{ task.status }} ({{
          task.priority
        }})
        <router-link :to="`/edit/${task.id}`">Edit</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/store/taskStore';

const store = useTaskStore();
store.loadTasks();
const tasks = store.tasks;
</script>
