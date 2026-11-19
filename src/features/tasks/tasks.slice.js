import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as tasksApi from "./api/tasks.api.js";
import { logout } from "../auth/auth.slice.js";
import { getApiError } from "../../shared/utils/getApiError.js";

const DEFAULT_ERROR = "Something went wrong. Please try again.";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async ({ projectId }, { rejectWithValue }) => {
    try {
      return await tasksApi.getTasks(projectId);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async ({ projectId, values }, { rejectWithValue }) => {
    try {
      return await tasksApi.createTask(projectId, values);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ projectId, taskId, values }, { rejectWithValue }) => {
    try {
      return await tasksApi.updateTask(projectId, taskId, values);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async ({ projectId, taskId }, { rejectWithValue }) => {
    try {
      await tasksApi.deleteTask(projectId, taskId);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  }
);

const initialState = {
  items: [], // the task list of one project
  projectId: null, // which project the items belong to
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  lastRequestId: null, // used to ignore old responses

  isSaving: false,
  saveError: null,
  saveFieldErrors: {},

  isDeleting: false,
  deleteError: null,
};

function onSaveStart(state) {
  state.isSaving = true;
  state.saveError = null;
  state.saveFieldErrors = {};
}

function onSaveSuccess(state) {
  state.isSaving = false;
}

function onSaveFail(state, action) {
  state.isSaving = false;
  state.saveError = action.payload?.message || DEFAULT_ERROR;
  state.saveFieldErrors = action.payload?.fieldErrors || {};
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearActionErrors(state) {
      state.saveError = null;
      state.saveFieldErrors = {};
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // List
      .addCase(fetchTasks.pending, (state, action) => {
        const { projectId } = action.meta.arg;
        if (state.projectId !== projectId) state.items = []; // different project, drop old tasks
        state.projectId = projectId;
        state.status = "loading";
        state.error = null;
        state.lastRequestId = action.meta.requestId;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        if (action.meta.requestId !== state.lastRequestId) return; // an older response
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        if (action.meta.requestId !== state.lastRequestId) return;
        state.status = "failed";
        state.error = action.payload?.message || DEFAULT_ERROR;
      })

      // Create and edit share the saving flags. The list is reloaded by the page afterwards.
      .addCase(createTask.pending, onSaveStart)
      .addCase(updateTask.pending, onSaveStart)
      .addCase(createTask.fulfilled, onSaveSuccess)
      .addCase(updateTask.fulfilled, onSaveSuccess)
      .addCase(createTask.rejected, onSaveFail)
      .addCase(updateTask.rejected, onSaveFail)

      // Delete
      .addCase(deleteTask.pending, (state) => {
        state.isDeleting = true;
        state.deleteError = null;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isDeleting = false;
        state.deleteError = action.payload?.message || DEFAULT_ERROR;
      })

      .addCase(logout, () => initialState);
  },
});

export const { clearActionErrors } = tasksSlice.actions;
export default tasksSlice.reducer;