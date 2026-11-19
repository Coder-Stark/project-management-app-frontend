import { TASK_RULES, TASK_STATUS_OPTIONS } from "../tasks.constants.js";

export function validateTask({ title, description, status }) {
  const errors = {};

  const cleanTitle = title.trim();
  if (!cleanTitle) {
    errors.title = "Title is required";
  } else if (cleanTitle.length > TASK_RULES.TITLE_MAX) {
    errors.title = `Title must be at most ${TASK_RULES.TITLE_MAX} characters`;
  }

  if (description.trim().length > TASK_RULES.DESCRIPTION_MAX) {
    errors.description = `Description must be at most ${TASK_RULES.DESCRIPTION_MAX} characters`;
  }

  if (!TASK_STATUS_OPTIONS.some((option) => option.value === status)) {
    errors.status = "Choose a status";
  }

  return errors;
}