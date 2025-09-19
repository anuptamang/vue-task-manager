<template>
  <div class="app-layout w-[992px] px-5 mx-auto">
    <Menubar :model="menuItems">
      <template #start>
        <h1 class="text-xl font-bold pr-[100px]">My Keep</h1>
      </template>

      <template #item="{ item, props }">
        <router-link
          v-if="item.to"
          v-slot="{ href, navigate }"
          :to="item.to"
          custom
        >
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" class="mr-2" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>

        <a v-else :href="item.url" v-bind="props.action">
          <span :class="item.icon" class="mr-2" />
          <span>{{ item.label }}</span>
        </a>
      </template>
    </Menubar>

    <main class="pt-[30px]">
      <router-view />
    </main>

    <Divider />
    <footer class="text-center text-sm text-gray-600 py-3">
      <p>&copy; {{ currentYear }} My Keep</p>
    </footer>
  </div>

  <Dialog v-model:visible="dialogVisible" header="Create Task" modal style="width: 500px">
    <TaskCardForm
      :task="task"
      :isEdit="false"
      @save="saveTask"
      @cancel="dialogVisible = false"
    />
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Menubar from 'primevue/menubar';
import Divider from 'primevue/divider';
import Dialog from 'primevue/dialog';
import TaskCardForm from '../../components/TaskCardForm.vue';
import { useTaskStore, type Task } from '../../store/taskStore';
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

const menuItems = ref([
  { label: 'Home', icon: 'pi pi-home', to: '/' },
  { label: 'Create Task', icon: 'pi pi-plus', command: createTask },
]);
</script>

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
