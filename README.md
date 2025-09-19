# 📝 My Keep – Vue Task Manager

A simple task manager built with **Vue 3 + Vite + Pinia + PrimeVue**.  
It allows you to create, edit, delete, filter, and sort tasks with a modern UI inspired by Google Keep.

---

## 🚀 Features

- **Task Management**
  - Create new tasks with title, description, status, priority, and due date.
  - Edit existing tasks with a dialog-based form.
  - Delete tasks with confirmation dialogs.

- **Filtering & Sorting**
  - Filter tasks by status (`Todo`, `In Progress`, `Done`).
  - Filter tasks by priority (`Low`, `Medium`, `High`).
  - Sort tasks by title or due date.

- **UI/UX**
  - Responsive layout with PrimeVue components.
  - Status and priority tags with severity colors.
  - Google Keep–style card layout (masonry grid).
  - Single global confirm dialog for all delete actions.
  - Persistent storage using **localStorage**.

---

## 📦 Tech Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) (state management)
- [PrimeVue](https://primevue.org/) (UI components)
- [PrimeIcons](https://primefaces.org/primeicons/) (icons)
- [Quill](https://quilljs.com/) (rich-text editor for task description)

---

## 🛠️ Project Setup

### 1. Clone repository
```bash
git clone https://github.com/your-username/my-keep.git
cd my-keep

### 2. With Docker

# Start development server in Docker
make dev

# Build production image
make build

# Run container with hot reload
make up

# Stop running container
make down

# View logs
make logs

# Open container shell
make bash

# Rebuild without cache
make no-cache
