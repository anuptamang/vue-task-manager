### **Vue Task Manager**

The goal is to build a task management application with Vue 3\. The app will allow users to create, view, edit, and delete tasks. Each task will have a title, description, status, priority, and due date. This project will be an opportunity to practice with the Composition API, Pinia for state management, TypeScript, and various project management tools.

**Key Project Requirements:**

1. **Frontend Framework**: Vue 3 with Composition API
2. **State Management**: Pinia
3. **Formatting and Linting**: Prettier and ESLint
4. **Version Control Hooks**: Husky for pre-commit hooks
5. **Containerization**: Docker
6. **Task Automation**: Makefile for running scripts
7. **Static Typing**: TypeScript
8. **Testing**: Jest for unit tests and Cypress for end-to-end tests

---

### **Detailed Requirements and Steps**

#### **1\. Project Setup**

- **Initialize the project** with Vite, configuring it for TypeScript.
- **Install and configure Pinia** for state management.
- Set up **ESLint** and **Prettier** with recommended Vue and TypeScript configurations.
- Use **Husky** to add a pre-commit hook that runs ESLint and Prettier checks.
- Add **JSDoc comments** throughout the codebase for documentation.

#### **2\. Feature Requirements**

- **Task List View**:
  - Display a list of tasks with basic details: title, status, due date, and priority.
  - Include sorting and filtering options for task status and priority.
- **Task Management**:
  - A form to create a new task with fields for title, description, status, priority, and due date.
  - Functionality to edit existing tasks.
  - Deletion of tasks with a confirmation dialog.
- **Task Status**:
  - Implement task status management with three options: **To Do**, **In Progress**, and **Completed**.
  - Use Pinia to manage state and synchronize tasks across the application.
- **Task Filtering and Sorting**:
  - Allow users to filter tasks by status (e.g., show only completed tasks).
  - Enable sorting of tasks by priority or due date.
- **Due Date Alerts**:
  - Highlight tasks due soon (e.g., within the next 24 hours) to give users a visual reminder.

#### **3\. Technical Requirements**

- **TypeScript**:
  - Use TypeScript for type safety, creating interfaces for each key feature (e.g., Task, User).
  - Define types for Pinia store, component props, and API responses.
- **Testing**:
  - Write unit tests with **Jest** for key components, such as the task creation form and task list.
  - Use **Cypress** for end-to-end testing to verify flows like creating, editing, and deleting tasks.
- **Formatting and Linting**:
  - Configure ESLint and Prettier to enforce coding standards and consistent formatting.
  - Use **Husky** to run linting and formatting checks on pre-commit.

#### **4\. Environment Configuration**

- **Environment Variables**:
  - Configure environment variables for API base URLs and keys, using .env files.
- **Docker**:
  - Create a Dockerfile and docker-compose.yml for containerization.
  - The Docker setup should install dependencies, build the project, and run the application.
- **Makefile**:
  - Write a Makefile with tasks for running common commands.

#### **5\. Documentation**

- Add a README.md with project setup instructions, feature descriptions, and usage guides.
- Document key functions and components with **JSDoc** comments to describe their purpose and parameters.

#### **6\. Deployment**

- **Docker Deployment**: Ensure the Docker setup allows for easy deployment.
- **Production Build**: Write instructions for building and deploying the production version, leveraging vite build.

---

### **Evaluation Criteria**

1. **Code Quality**: Consistency, readability, and adherence to Vue and TypeScript best practices.
2. **Functionality**: Completeness of features (task management, filtering, sorting).
3. **Project Structure**: Proper organization with modular and reusable components.
4. **Testing**: Coverage of unit tests and E2E tests to verify core functionality.
5. **Tool Usage**: Correct implementation of Docker, Makefile, ESLint, Prettier, and Husky.
6. **Documentation**: Clear instructions in README.md and JSDoc for key functions.
