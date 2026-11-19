# Mini Project Manager: Frontend

React web app for a small project management tool. Users sign up and log in, manage their own projects, and manage tasks inside each project (create, edit, delete, filter and sort).

- Backend repository: `<backend-repo-url>`
- Deployed app (optional): `<deployed-frontend-url>`

## Tech stack

| Part | Technology |
|---|---|
| UI | React with Vite |
| State management | Redux Toolkit and React Redux |
| Routing | React Router |
| HTTP | Axios |
| Styling | Tailwind CSS 4 |

## Run the whole project (backend and frontend)

The backend and the frontend are two separate repositories. Start the backend first.

| Step | Where | Commands | Result |
|---|---|---|---|
| 1 | `backend` | `npm install`, then `npm run dev` | API on `http://localhost:8080` |
| 2 | `frontend` (this repo) | `npm install`, then `npm run dev` | App on `http://localhost:5173` |
| 3 | Browser | Open `http://localhost:5173` | Sign up, then create projects and tasks |

The backend's `CLIENT_URL` must be `http://localhost:5173`, the exact address of this app. See the backend README for its setup.

## Frontend setup

### Prerequisites

- Node.js 20.19 or newer, and npm
- The backend running (see the backend README)

### Steps

1. Clone the repository and install packages:

   ```bash
   git clone <frontend-repo-url>
   cd frontend
   npm install
   ```

2. Create your env file from the example:

   ```bash
   # macOS or Linux
   cp .env.example .env

   # Windows PowerShell
   Copy-Item .env.example .env
   ```

3. Check `VITE_API_URL` in `.env`. It must point to your backend and end with `/api`:

   ```dotenv
   VITE_API_URL=http://localhost:8080/api
   ```

   For a deployed backend, use its address instead, for example `https://<your-backend-url>/api`.

4. Start the app:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173`.

### Environment variables

Sample file: `.env.example`

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Yes | Base URL of the backend API, including `/api` |

Vite reads `.env` only when it starts, so restart `npm run dev` after changing it. For a production build, the value is baked in at build time.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server |
| `npm run build` | Creates a production build in `dist` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |

## Using the app

1. Sign up with a name, email and a password of at least 8 characters.
2. Create a project with "New project".
3. Click a project title to open it, then use "Add task".
4. Use the Status and Sort dropdowns above the task list to filter and sort.
5. Use Edit and Delete on projects and tasks. Use "Log out" in the header.

Pages:

| Path | Who can open it | Page |
|---|---|---|
| `/login` | Logged-out users | Log in |
| `/signup` | Logged-out users | Sign up |
| `/projects` | Logged-in users | List of my projects |
| `/projects/:projectId` | Logged-in users | One project with its tasks |
| anything else | everyone | Redirects to `/projects` |

## Implementation notes

- **Structure**: feature folders (`auth`, `projects`, `tasks`) with `api`, `components`, `hooks`, `pages` and `utils`. Server calls live only in the `api` files, data loading in hooks, and pages compose components.
- **Redux**: one slice per feature, registered in `src/app/store.js`.

  | Slice | What it holds |
  |---|---|
  | `auth` | user, token, restoring and submitting flags, server errors |
  | `projects` | project list, the open project, loading and saving flags |
  | `tasks` | task list of the open project, loading and saving flags |

  API calls are `createAsyncThunk` thunks. The projects and tasks slices reset when the user logs out.
- **Login state**: the token is saved in `localStorage` by one subscriber in `store.js`. On app start, a saved token is checked with `GET /auth/me` before any page is shown.
- **Axios**: one instance adds `Authorization: Bearer <token>` to every request. A `401` on a request that sent a token logs the user out.
- **Route protection**: `ProtectedRoute` and `GuestRoute` redirect by login state. This is only a convenience. The backend enforces the real protection.
- **Filter and sort**: done by the server through query parameters. The tasks list is reloaded after every change, so it always matches the chosen filter and sort. The selected filter lives in component state and resets when you leave the project page.
- **Forms**: input is checked with friendly messages before sending, using the same limits as the backend. Errors from the server are shown under the right field. A ref blocks double submits.
- **Dates**: due dates are shown in UTC so a date never moves by a day in other time zones. A task is shown as overdue when its due date is before today and it is not done.
- **Every screen** has loading, empty and error states.

## Known limitations

- No automated tests. Each screen was verified by hand with click-through steps.
- The token is kept in `localStorage`. This is simple, but scripts on the page can read it. HttpOnly cookies are the safer alternative.
- No refresh tokens, pagination or search.
- Filters are not saved in the URL, so a refresh resets them.

## Project structure

```
src
├── app
│   ├── layouts
│   │   └── AppLayout.jsx
│   ├── routes
│   │   ├── AppRoutes.jsx
│   │   ├── GuestRoute.jsx
│   │   └── ProtectedRoute.jsx
│   ├── providers.jsx
│   └── store.js
├── features
│   ├── auth
│   │   ├── api, components, hooks, pages, utils
│   │   ├── auth.constants.js
│   │   └── auth.slice.js
│   ├── projects
│   │   ├── api, components, hooks, pages, utils
│   │   ├── projects.constants.js
│   │   └── projects.slice.js
│   └── tasks
│       ├── api, components, hooks, utils
│       ├── tasks.constants.js
│       └── tasks.slice.js
├── shared
│   ├── api            (axiosClient.js)
│   ├── components     (Button, FormField, TextAreaField, SelectField, Modal, EmptyState, ErrorBanner, InlineLoader, FullPageLoader)
│   ├── styles         (index.css)
│   └── utils          (formatDate.js, getApiError.js, tokenStorage.js)
└── main.jsx
```

## Deployment (optional)

Example with Netlify:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Environment variable | `VITE_API_URL` = `https://<your-backend-url>/api` |

The file `public/_redirects` makes page refreshes work on Netlify. After the frontend is deployed, set the backend's `CLIENT_URL` to the exact frontend address. Because Vite bakes env values into the build, redeploy the frontend after changing `VITE_API_URL`.

## How I built it

I built the backend first, then the frontend in the same phases, and checked each phase by hand before moving on.

| Phase | What I did |
|---|---|
| 2b. Setup | `npm create vite@latest . -- --template react`. Removed the demo files. `npm install tailwindcss @tailwindcss/vite`, added the Tailwind plugin to `vite.config.js` and `@import "tailwindcss";` to `index.css`. Created the `app`, `features` and `shared` folders. |
| 2c. Auth | `npm install @reduxjs/toolkit react-redux react-router-dom axios`. Added the store, the `auth` slice, login and signup pages, the Axios client with the token header, and the protected and guest routes. |
| 3b. Projects | Added the `projects` slice, the project list with a create and edit popup, a delete confirmation and the project page. |
| 4b. Tasks | Added the `tasks` slice and the tasks section on the project page with create, edit and delete. |
| 5b. Filter and sort | Added the filter bar. The selected values are sent to the backend as query parameters. |
| 6. Docs | Wrote this README and `.env.example`. |