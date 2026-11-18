import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authApi from "./api/auth.api.js";
import { getApiError } from "../../shared/utils/getApiError.js";
import { getToken } from "../../shared/utils/tokenStorage.js";

// Thunks: async functions. Redux Toolkit dispatches
// "auth/login/pending", then "auth/login/fulfilled" or "auth/login/rejected" for us.
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (values, { rejectWithValue }) => {
    try {
      return await authApi.signup(values); // becomes action.payload on success
    } catch (error) {
      return rejectWithValue(getApiError(error)); // becomes action.payload on failure
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      return await authApi.login(values);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  }
);

// Runs on app start when a token is saved. Asks the server who the token belongs to.
export const restoreSession = createAsyncThunk("auth/restore", async () => {
  const data = await authApi.getMe();
  return data.user;
});

const savedToken = getToken();

// The starting state of the auth slice.
const initialState = {
  user: null,
  token: savedToken,
  isRestoring: Boolean(savedToken), // true while we verify a saved token
  isSubmitting: false, // true while a login or signup request is running
  error: null,
  fieldErrors: {},
};

// Shared reducer helpers. "state" looks mutable, but Immer makes it safe.
function onSubmitStart(state) {
  state.isSubmitting = true;
  state.error = null;
  state.fieldErrors = {};
}

function onAuthSuccess(state, action) {
  state.isSubmitting = false;
  state.user = action.payload.user;
  state.token = action.payload.token;
}

function onSubmitFail(state, action) {
  state.isSubmitting = false;
  state.error = action.payload?.message || "Something went wrong. Please try again.";
  state.fieldErrors = action.payload?.fieldErrors || {};
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  // Normal reducers: createSlice makes an action creator for each one.
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isRestoring = false;
    },
    clearError(state) {
      state.error = null;
      state.fieldErrors = {};
    },
  },
  // Reducers for actions created elsewhere (here, by the thunks above).
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, onSubmitStart)
      .addCase(signupUser.fulfilled, onAuthSuccess)
      .addCase(signupUser.rejected, onSubmitFail)
      .addCase(loginUser.pending, onSubmitStart)
      .addCase(loginUser.fulfilled, onAuthSuccess)
      .addCase(loginUser.rejected, onSubmitFail)
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRestoring = false;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isRestoring = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;