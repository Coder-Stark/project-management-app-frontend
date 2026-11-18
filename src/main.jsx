import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./shared/styles/index.css"
import AppProviders from "./app/providers.jsx";
import AppRoutes from "./app/routes/AppRoutes.jsx";
import { store } from "./app/store.js";
import { restoreSession } from "./features/auth/auth.slice.js";

if (store.getState().auth.token) {
  store.dispatch(restoreSession());
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  </StrictMode>
)
