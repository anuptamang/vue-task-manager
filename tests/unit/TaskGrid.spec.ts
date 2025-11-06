import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import TaskGrid from '@/components/TaskGrid.vue';
import { baseTestTasks } from '../fixtures/testTasks';

describe('TaskGrid Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders task cards when tasks are provided', () => {
    const tasks = baseTestTasks.slice(0, 2);

    const wrapper = mount(TaskGrid, {
      props: {
        tasks,
      },
      global: {
        stubs: {
          TaskCard: {
            template: '<div class="task-card">{{ task.title }}</div>',
            props: ['task'],
          },
        },
      },
    });

    expect(wrapper.findAll('.task-card')).toHaveLength(2);
    expect(wrapper.text()).toContain('Test Task');
    expect(wrapper.text()).toContain('Alpha Task');
  });

  it('shows empty state when no tasks', () => {
    const wrapper = mount(TaskGrid, {
      props: {
        tasks: [],
      },
    });

    expect(wrapper.text()).toContain('No tasks!');
  });

  it('renders correct number of task cards', () => {
    const tasks = baseTestTasks;

    const wrapper = mount(TaskGrid, {
      props: {
        tasks,
      },
      global: {
        stubs: {
          TaskCard: {
            template: '<div class="task-card"></div>',
          },
        },
      },
    });

    expect(wrapper.findAll('.task-card')).toHaveLength(3);
  });
});
