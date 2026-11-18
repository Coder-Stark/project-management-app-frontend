import { PROJECT_RULES } from "../projects.constants.js";

export function validateProject({ title, description }) {
  const errors = {};

  const cleanTitle = title.trim();
  if (!cleanTitle) {
    errors.title = "Title is required";
  } else if (cleanTitle.length > PROJECT_RULES.TITLE_MAX) {
    errors.title = `Title must be at most ${PROJECT_RULES.TITLE_MAX} characters`;
  }

  if (description.trim().length > PROJECT_RULES.DESCRIPTION_MAX) {
    errors.description = `Description must be at most ${PROJECT_RULES.DESCRIPTION_MAX} characters`;
  }

  return errors;
}