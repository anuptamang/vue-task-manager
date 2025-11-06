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
- [Prisma](https://www.prisma.io/) (ORM for database interactions)
- [PostgreSQL](https://www.prisma.io/postgres) (Prisma cloud database)

---

## 🛠️ Project Setup

```bash
### 1. Clone repository
git clone https://github.com/anuptamang/vue-task-manager.git

### 2. With Docker
Start Docker Desktop

# Run container with hot reload
make up

# Stop running container
make down

### 2. Without Docker
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

### 3. Run tests
npm run test:unit          # Unit tests (Jest)
npm run test:e2e           # E2E tests (Cypress - interactive)
npm run test:e2e:run       # E2E tests (Cypress - headless)
npm test                   # Run all tests

### 4. Code Quality
npm run lint               # ESLint check
npm run format             # Prettier format

---

## 🔒 Git Hooks (Automatic Code Quality)

The project uses **Husky** and **lint-staged** to automatically ensure code quality:

### Pre-Commit Hook
- Automatically runs **ESLint** (with auto-fix) on staged files
- Automatically runs **Prettier** formatting on staged files
- Only processes changed files (fast!)
- Blocks commit if unfixable errors exist

### Pre-Push Hook
- Automatically runs **unit tests** before pushing
- Blocks push if tests fail

```
