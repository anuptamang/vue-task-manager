<script setup lang="ts">
import { Tag } from 'primevue';

const props = defineProps<{
  title: string;
  statusLabel: string;
  statusSeverity: 'success' | 'warn' | 'danger' | 'info' | 'secondary';
  showDueFlag?: boolean;
  dueFlagLabel?: string;
}>();
</script>

<template>
  <div class="w-full">
    <strong class="capitalize block mb-[10px]">{{ props.title }}</strong>

    <div class="flex gap-[8px]">
      <Tag :value="props.statusLabel" :severity="props.statusSeverity" />
      <Tag
        v-if="props.showDueFlag"
        severity="danger"
        :value="props.dueFlagLabel || 'Due Soon'"
      />
    </div>
  </div>
</template>
