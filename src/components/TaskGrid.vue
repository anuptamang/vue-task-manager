<!-- src/components/TaskGrid.vue -->
<script setup lang="ts">
import TaskCard from './TaskCard/TaskCard.vue';

defineProps<{
  tasks: any[];
}>();
</script>

<template>
  <div class="pt-[20px]">
    <div v-if="tasks?.length > 0" class="columns-3">
      <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
    </div>

    <div v-else class="text-gray-500 py-10 columns-3">
      <p>No tasks!</p>
    </div>
  </div>
</template>
