import { config } from '@vue/test-utils';

// Mock global fetch
global.fetch = jest.fn();

// Suppress console.error during tests for cleaner output
// (errors are still caught and handled, just not logged)
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

// Mock PrimeVue components
config.global.stubs = {
  ...config.global.stubs,
  Dropdown: true,
  Button: true,
  Card: true,
  Dialog: true,
  Menu: true,
  InputText: true,
  Calendar: true,
  Editor: true,
  Menubar: true,
};
