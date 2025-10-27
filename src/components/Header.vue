<script setup lang="ts">
import { ref } from 'vue';
import { Menubar, Button } from 'primevue';

const props = defineProps<{
  appTitle?: string;
}>();

const emit = defineEmits<{
  (e: 'create-task'): void;
}>();

// Simple menu (you can expand or pass via props later if needed)
const menuItems = ref([{ label: 'Home', icon: 'pi pi-home', to: '/' }]);
</script>

<template>
  <Menubar :model="menuItems">
    <template #start>
      <h1 class="text-xl font-bold pr-[100px]">
        {{ props.appTitle ?? 'My Keep' }}
      </h1>
    </template>

    <template #item="{ item, props: slotProps }">
      <router-link
        v-if="item.to"
        v-slot="{ href, navigate }"
        :to="item.to"
        custom
      >
        <a :href="href" v-bind="slotProps.action" @click="navigate">
          <span :class="item.icon" class="mr-2" />
          <span>{{ item.label }}</span>
        </a>
      </router-link>

      <a v-else :href="item.url" v-bind="slotProps.action">
        <span :class="item.icon" class="mr-2" />
        <span>{{ item.label }}</span>
      </a>
    </template>

    <template #end>
      <Button
        label="Create Task"
        icon="pi pi-plus"
        @click="emit('create-task')"
      />
    </template>
  </Menubar>
</template>
