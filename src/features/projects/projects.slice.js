import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as projectsApi from "./api/projects.api.js";
import { logout } from "../auth/auth.slice.js";
import { getApiError } from "../../shared/utils/getApiError.js";

const DEFAULT_ERROR = "Something went wrong. Please try again.";

// Loads the list of my projects.
export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await projectsApi.getProjects();
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  }
);

// Loads one project for the project page.
export const fetchProject = createAsyncThunk(
  "projects/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      return await projectsApi.getProject(id);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/create",
  async (values, { rejectWithValue }) => {
    try {
      return await projectsApi.createProject(values);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      return await projectsApi.updateProject(id, values);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id, { rejectWithValue }) => {
    try {
      await projectsApi.deleteProject(id);
      return id; // the reducer needs the id to remove the item from the list
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  }
);

const initialState = {
  items: [], // the project list
  listStatus: "idle", // idle | loading | succeeded | failed
  listError: null,

  current: null, // the project shown on the project page
  currentStatus: "idle",
  currentError: null,

  isSaving: false, // create or edit request running
  saveError: null,
  saveFieldErrors: {},

  isDeleting: false,
  deleteError: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // Called when a popup opens, so old errors do not show up again.
    clearActionErrors(state) {
      state.saveError = null;
      state.saveFieldErrors = {};
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // List
      .addCase(fetchProjects.pending, (state) => {
        state.listStatus = "loading";
        state.listError = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.listStatus = "failed";
        state.listError = action.payload?.message || DEFAULT_ERROR;
      })

      // One project
      .addCase(fetchProject.pending, (state) => {
        state.currentStatus = "loading";
        state.currentError = null;
        state.current = null;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.currentStatus = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        const status = action.payload?.status;
        state.currentStatus = "failed";
        // 404 means missing or not mine. 400 means a malformed id in the URL.
        state.currentError =
          status === 404 || status === 400
            ? "Project not found"
            : action.payload?.message || DEFAULT_ERROR;
      })

      // Create and edit share the same saving flags
      .addCase(createProject.pending, onSaveStart)
      .addCase(updateProject.pending, onSaveStart)
      .addCase(createProject.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items.unshift(action.payload); // newest first, same as the server
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        if (state.current?.id === action.payload.id) state.current = action.payload;
      })
      .addCase(createProject.rejected, onSaveFail)
      .addCase(updateProject.rejected, onSaveFail)

      // Delete
      .addCase(deleteProject.pending, (state) => {
        state.isDeleting = true;
        state.deleteError = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isDeleting = false;
        state.deleteError = action.payload?.message || DEFAULT_ERROR;
      })

      // This slice listens to an action from the auth slice.
      // On logout, forget everything so the next user starts clean.
      .addCase(logout, () => initialState);
  },
});

function onSaveStart(state) {
  state.isSaving = true;
  state.saveError = null;
  state.saveFieldErrors = {};
}

function onSaveFail(state, action) {
  state.isSaving = false;
  state.saveError = action.payload?.message || DEFAULT_ERROR;
  state.saveFieldErrors = action.payload?.fieldErrors || {};
}

export const { clearActionErrors } = projectsSlice.actions;
export default projectsSlice.reducer;