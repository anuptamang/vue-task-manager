import { computed, type ComputedRef } from 'vue';
import type { TaskStatus, TaskPriority } from '../types/taskStatus';

export function useTaskLabels(
  status: ComputedRef<TaskStatus | string> | TaskStatus | string,
  priority: ComputedRef<TaskPriority | string> | TaskPriority | string,
) {
  const statusValue = computed(() => {
    const value =
      typeof status === 'object' && 'value' in status ? status.value : status;
    return value;
  });

  const priorityValue = computed(() => {
    const value =
      typeof priority === 'object' && 'value' in priority
        ? priority.value
        : priority;
    return value;
  });

  const statusLabel = computed(() => {
    switch (statusValue.value) {
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

  const statusSeverity = computed(() => {
    const status = statusValue.value;
    if (status === 'done') return 'success';
    if (status === 'in-progress') return 'warn';
    if (status === 'todo') return 'info';
    return 'secondary';
  });

  const priorityLabel = computed(() => {
    switch (priorityValue.value) {
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

  const prioritySeverity = computed(() => {
    switch (priorityValue.value) {
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

  return {
    statusLabel,
    statusSeverity,
    priorityLabel,
    prioritySeverity,
  };
}
