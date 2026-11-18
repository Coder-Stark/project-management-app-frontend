import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../shared/components/Button.jsx";
import ErrorBanner from "../../../shared/components/ErrorBanner.jsx";
import FormField from "../../../shared/components/FormField.jsx";
import { clearError, loginUser } from "../auth.slice.js";
import { validateLogin } from "../utils/auth.validation.js";

export default function LoginForm() {
  const dispatch = useDispatch(); // lets this component send actions to the store
  // Read from the store. Server errors live in Redux, typed values live in local state.
  const { isSubmitting, error, fieldErrors } = useSelector((state) => state.auth);

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({}); // errors found by the browser-side check
  const submittingRef = useRef(false); // blocks a second submit before Redux updates

  // Clear any old server error when this form appears.
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submittingRef.current) return;

    const foundErrors = validateLogin(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    submittingRef.current = true;
    try {
      // dispatch returns a promise that resolves when the thunk finishes
      await dispatch(
        loginUser({ email: values.email.trim(), password: values.password })
      );
    } finally {
      submittingRef.current = false;
    }
  }

  // Browser-side errors win over server errors for the same field.
  const shownErrors = { ...fieldErrors, ...errors };
  const hasFieldErrors = Object.keys(shownErrors).length > 0;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <ErrorBanner message={hasFieldErrors ? null : error} />

      <FormField
        id="email"
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        value={values.email}
        onChange={handleChange}
        error={shownErrors.email}
      />

      <FormField
        id="password"
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        value={values.password}
        onChange={handleChange}
        error={shownErrors.password}
      />

      <Button type="submit" loading={isSubmitting}>
        Log in
      </Button>
    </form>
  );
}