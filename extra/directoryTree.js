/*
src
 ┣ app
 ┃ ┣ layouts
 ┃ ┃ ┗ AppLayout.jsx
 ┃ ┣ routes
 ┃ ┃ ┣ AppRoutes.jsx
 ┃ ┃ ┣ GuestRoute.jsx
 ┃ ┃ ┗ ProtectedRoute.jsx
 ┃ ┣ providers.jsx
 ┃ ┗ store.js
 ┣ features
 ┃ ┣ auth
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ auth.api.js
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ AuthCard.jsx
 ┃ ┃ ┃ ┣ LoginForm.jsx
 ┃ ┃ ┃ ┗ SignupForm.jsx
 ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┗ useAuth.js
 ┃ ┃ ┣ pages
 ┃ ┃ ┃ ┣ LoginPage.jsx
 ┃ ┃ ┃ ┗ SignupPage.jsx
 ┃ ┃ ┣ utils
 ┃ ┃ ┃ ┗ auth.validation.js
 ┃ ┃ ┣ auth.constants.js
 ┃ ┃ ┗ auth.slice.js
 ┃ ┣ projects
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ projects.api.js
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ DeleteProjectDialog.jsx
 ┃ ┃ ┃ ┣ ProjectCard.jsx
 ┃ ┃ ┃ ┣ ProjectFormModal.jsx
 ┃ ┃ ┃ ┗ ProjectList.jsx
 ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┣ useProject.js
 ┃ ┃ ┃ ┗ useProjectsList.js
 ┃ ┃ ┣ pages
 ┃ ┃ ┃ ┣ ProjectDetailPage.jsx
 ┃ ┃ ┃ ┗ ProjectsPage.jsx
 ┃ ┃ ┣ utils
 ┃ ┃ ┃ ┗ projects.validation.js
 ┃ ┃ ┣ projects.constants.js
 ┃ ┃ ┗ projects.slice.js
 ┃ ┣ tasks
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ tasks.api.js
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ DeleteTaskDialog.jsx
 ┃ ┃ ┃ ┣ ProjectTasks.jsx
 ┃ ┃ ┃ ┣ TaskCard.jsx
 ┃ ┃ ┃ ┣ TaskFilterBar.jsx
 ┃ ┃ ┃ ┣ TaskFormModal.jsx
 ┃ ┃ ┃ ┣ TaskList.jsx
 ┃ ┃ ┃ ┗ TaskStatusBadge.jsx
 ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┗ useTasks.js
 ┃ ┃ ┣ utils
 ┃ ┃ ┃ ┣ tasks.utils.js
 ┃ ┃ ┃ ┗ tasks.validation.js
 ┃ ┃ ┣ tasks.constants.js
 ┃ ┃ ┗ tasks.slice.js
 ┃ ┗ .gitkeep
 ┣ shared
 ┃ ┣ api
 ┃ ┃ ┗ axiosClient.js
 ┃ ┣ components
 ┃ ┃ ┣ Button.jsx
 ┃ ┃ ┣ EmptyState.jsx
 ┃ ┃ ┣ ErrorBanner.jsx
 ┃ ┃ ┣ FormField.jsx
 ┃ ┃ ┣ FullPageLoader.jsx
 ┃ ┃ ┣ InlineLoader.jsx
 ┃ ┃ ┣ Modal.jsx
 ┃ ┃ ┣ SelectField.jsx
 ┃ ┃ ┗ TextAreaField.jsx
 ┃ ┣ styles
 ┃ ┃ ┗ index.css
 ┃ ┗ utils
 ┃ ┃ ┣ formatDate.js
 ┃ ┃ ┣ getApiError.js
 ┃ ┃ ┗ tokenStorage.js
 ┗ main.jsx
*/