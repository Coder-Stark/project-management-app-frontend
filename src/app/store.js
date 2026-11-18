import { configureStore } from "@reduxjs/toolkit";
import authReducer, { logout } from "../features/auth/auth.slice.js";
import { registerUnauthorizedHandler } from "../shared/api/axiosClient.js";
import { saveToken, clearToken } from "../shared/utils/tokenStorage.js";

// The store. Each key under "reducer" becomes a key in state: state.auth
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Keep localStorage in sync with the token in the store.
// This runs after every dispatch, but only writes when the token changed.
let lastToken = store.getState().auth.token;

store.subscribe(() => {
  const { token } = store.getState().auth;
  if (token === lastToken) return;

  lastToken = token;
  if (token) saveToken(token);
  else clearToken();
});

// If any request that carried a token gets a 401, log the user out.
registerUnauthorizedHandler(() => store.dispatch(logout()));