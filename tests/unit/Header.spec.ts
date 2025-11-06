import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import Header from '@/components/Header.vue';

describe('Header Component', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
  });

  beforeEach(async () => {
    await router.push('/');
  });

  it('renders component with app title prop', () => {
    const wrapper = mount(Header, {
      props: {
        appTitle: 'My Keep',
      },
      global: {
        plugins: [router],
        stubs: {
          Menubar: {
            template:
              '<div><slot name="start"></slot><slot name="end"></slot></div>',
          },
          Button: true,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect((wrapper.props() as { appTitle?: string }).appTitle).toBe('My Keep');
  });

  it('renders create task button', () => {
    const wrapper = mount(Header, {
      props: {
        appTitle: 'My Keep',
      },
      global: {
        plugins: [router],
        stubs: {
          Menubar: {
            template:
              '<div><slot name="start"></slot><slot name="end"></slot></div>',
          },
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

  it('emits create-task event when button is clicked', async () => {
    const wrapper = mount(Header, {
      props: {
        appTitle: 'My Keep',
      },
      global: {
        plugins: [router],
        stubs: {
          Menubar: {
            template:
              '<div><slot name="start"></slot><slot name="end"></slot></div>',
          },
          Button: {
            template:
              '<button @click="$emit(\'click\')"><slot></slot></button>',
          },
        },
      },
    });

    const createButton = wrapper.find('button');
    await createButton.trigger('click');
    expect(wrapper.emitted('create-task')).toBeTruthy();
  });
});
