import { mount } from '@vue/test-utils';
import TaskSortFilter from '@/components/TaskSortFilter.vue';

describe('TaskSortFilter Component', () => {
  it('renders filter component', () => {
    const wrapper = mount(TaskSortFilter, {
      global: {
        stubs: {
          Dropdown: {
            template: '<select><option>{{ placeholder }}</option></select>',
            props: ['modelValue', 'options', 'placeholder'],
            emits: ['update:modelValue'],
          },
          Button: {
            template: '<button><slot></slot></button>',
          },
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findAll('select')).toHaveLength(3);
    expect(wrapper.findAll('button')).toHaveLength(1);
  });

  it('renders clear all button', () => {
    const wrapper = mount(TaskSortFilter, {
      global: {
        stubs: {
          Dropdown: true,
          Button: {
            template: '<button><slot></slot></button>',
            name: 'Button',
          },
        },
      },
    });
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
  });

  it('has three dropdowns for filters', () => {
    const wrapper = mount(TaskSortFilter, {
      global: {
        stubs: {
          Dropdown: true,
          Button: true,
        },
      },
    });
    expect(wrapper.findAllComponents({ name: 'Dropdown' })).toHaveLength(3);
    expect(wrapper.findComponent({ name: 'Button' })).toBeTruthy();
  });
});
