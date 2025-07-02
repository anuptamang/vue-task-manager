import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

const TestComponent = {
  template: '<button @click="count++">{{ count }}</button>',
  setup() {
    const count = ref(0);
    return { count };
  },
};

describe('TestComponent', () => {
  it('increments count when clicked', async () => {
    const wrapper = mount(TestComponent);
    expect(wrapper.text()).toContain('0');
    await wrapper.trigger('click');
    expect(wrapper.text()).toContain('1');
  });
});
