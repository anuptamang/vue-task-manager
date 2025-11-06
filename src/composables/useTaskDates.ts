import { computed, type ComputedRef } from 'vue';
import type { TaskStatus } from '../types/taskStatus';

export function useTaskDates(
  dueDate: ComputedRef<Date | string | null> | Date | string | null,
  status: ComputedRef<TaskStatus | string> | TaskStatus | string,
) {
  const dueDateValue = computed(() => {
    if (!dueDate) return null;
    const value =
      typeof dueDate === 'object' && 'value' in dueDate
        ? dueDate.value
        : dueDate;
    return value ? new Date(value) : null;
  });

  const statusValue = computed(() => {
    const value =
      typeof status === 'object' && 'value' in status ? status.value : status;
    return value;
  });

  const formattedDueDate = computed(() => {
    if (!dueDateValue.value) return '—';
    return dueDateValue.value.toISOString().split('T')[0];
  });

  const now = new Date();

  const isPastDue = computed(
    () => !!dueDateValue.value && dueDateValue.value.getTime() < now.getTime(),
  );

  const isNearDue = computed(() => {
    if (!dueDateValue.value) return false;
    const diff = dueDateValue.value.getTime() - now.getTime();
    return diff > 0 && diff <= 24 * 60 * 60 * 1000;
  });

  const isDueSoonOrOverdue = computed(() => isNearDue.value || isPastDue.value);

  const statusClass = computed(() => {
    const status = statusValue.value;
    if (status === 'done') return 'border border-green-400';
    if (status === 'in-progress') return 'border border-yellow-400';
    if (isDueSoonOrOverdue.value && ['todo', 'in-progress'].includes(status))
      return 'border border-red-500';
    if (status === 'todo') return 'border border-blue-400';
    return 'border border-gray-300';
  });

  const statusSeverity = computed(() => {
    const status = statusValue.value;
    if (status === 'done') return 'success';
    if (status === 'in-progress') return 'warn';
    if (isDueSoonOrOverdue.value && status === 'todo') return 'danger';
    if (status === 'todo') return 'info';
    return 'secondary';
  });

  return {
    formattedDueDate,
    isPastDue,
    isNearDue,
    isDueSoonOrOverdue,
    statusClass,
    statusSeverity,
  };
}
