// Mock PrimeVue components for Jest
export const Button = {
  name: 'Button',
  template: '<button><slot></slot></button>',
};

export const Dropdown = {
  name: 'Dropdown',
  template: '<select><slot></slot></select>',
  props: ['modelValue', 'options', 'placeholder', 'showClear'],
};

export const Card = {
  name: 'Card',
  template: '<div class="p-card"><slot></slot></div>',
};

export const Dialog = {
  name: 'Dialog',
  template: '<div v-if="visible"><slot></slot></div>',
  props: ['visible', 'header', 'modal'],
};

export const Menu = {
  name: 'Menu',
  template: '<div class="p-menu"><slot></slot></div>',
  props: ['model', 'popup'],
};

export const InputText = {
  name: 'InputText',
  template: '<input type="text" />',
  props: ['modelValue', 'placeholder', 'required'],
};

export const Calendar = {
  name: 'Calendar',
  template: '<input type="date" />',
  props: ['modelValue', 'dateFormat', 'showIcon'],
};

export const Menubar = {
  name: 'Menubar',
  template: '<div><slot name="start"></slot><slot name="end"></slot></div>',
  props: ['model'],
};

// Mock for primevue/editor
export const Editor = {
  name: 'Editor',
  template: '<div class="ql-editor"><slot></slot></div>',
  props: ['modelValue', 'editorStyle', 'placeholder'],
};

export default {
  Button,
  Dropdown,
  Card,
  Dialog,
  Menu,
  InputText,
  Calendar,
  Menubar,
};
