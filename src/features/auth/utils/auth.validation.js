import { AUTH_RULES } from "../auth.constants.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getEmailError(email) {
  const value = email.trim();
  if (!value) return "Email is required";
  if (!EMAIL_PATTERN.test(value)) return "Enter a valid email address";
  return null;
}

export function validateLogin({ email, password }) {
  const errors = {};

  const emailError = getEmailError(email);
  if (emailError) errors.email = emailError;

  if (!password) errors.password = "Password is required";

  return errors;
}

export function validateSignup({ name, email, password }) {
  const errors = {};

  const cleanName = name.trim();
  if (!cleanName) {
    errors.name = "Name is required";
  } else if (cleanName.length < AUTH_RULES.NAME_MIN) {
    errors.name = `Name must be at least ${AUTH_RULES.NAME_MIN} characters`;
  } else if (cleanName.length > AUTH_RULES.NAME_MAX) {
    errors.name = `Name must be at most ${AUTH_RULES.NAME_MAX} characters`;
  }

  const emailError = getEmailError(email);
  if (emailError) errors.email = emailError;

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < AUTH_RULES.PASSWORD_MIN) {
    errors.password = `Password must be at least ${AUTH_RULES.PASSWORD_MIN} characters`;
  } else if (password.length > AUTH_RULES.PASSWORD_MAX) {
    errors.password = `Password must be at most ${AUTH_RULES.PASSWORD_MAX} characters`;
  }

  return errors;
}