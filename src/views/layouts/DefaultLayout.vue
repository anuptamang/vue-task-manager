<script setup lang="ts">
import { ref } from 'vue';
import { Divider, Dialog } from 'primevue';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import TaskCardForm from '../../components/TaskCard/TaskCardForm.vue';
import { useTaskStore } from '../../store/taskStore';
import type { Task } from '../../../generated/prisma';
import { v4 as uuidv4 } from 'uuid';

const store = useTaskStore();
const currentYear = new Date().getFullYear();
const dialogVisible = ref(false);

const task = ref<Task>({
  id: '',
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: null,
});

const createTask = () => {
  task.value = {
    id: '',
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: null,
  };
  dialogVisible.value = true;
};

const saveTask = (newTask: Task) => {
  newTask.id = uuidv4();
  store.addTask(newTask);
  dialogVisible.value = false;
};
</script>

<template>
  <div class="app-layout w-[992px] px-5 mx-auto">
    <Header appTitle="My Keep" @create-task="createTask" />

    <main class="pt-[30px]">
      <router-view />
    </main>

    <Divider />

    <Footer :year="currentYear" appName="My Keep" />
  </div>

  <Dialog
    v-model:visible="dialogVisible"
    header="Create Task"
    modal
    style="width: 500px"
  >
    <TaskCardForm
      :task="task"
      :isEdit="false"
      @save="saveTask"
      @cancel="dialogVisible = false"
    />
  </Dialog>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
</style>
