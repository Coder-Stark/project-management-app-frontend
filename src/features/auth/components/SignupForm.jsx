import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../shared/components/Button.jsx";
import ErrorBanner from "../../../shared/components/ErrorBanner.jsx";
import FormField from "../../../shared/components/FormField.jsx";
import { clearError, signupUser } from "../auth.slice.js";
import { validateSignup } from "../utils/auth.validation.js";

export default function SignupForm() {
  const dispatch = useDispatch();
  const { isSubmitting, error, fieldErrors } = useSelector((state) => state.auth);

  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const submittingRef = useRef(false);

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

    const foundErrors = validateSignup(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    submittingRef.current = true;
    try {
      await dispatch(
        signupUser({
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password,
        })
      );
    } finally {
      submittingRef.current = false;
    }
  }

  const shownErrors = { ...fieldErrors, ...errors };
  const hasFieldErrors = Object.keys(shownErrors).length > 0;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <ErrorBanner message={hasFieldErrors ? null : error} />

      <FormField
        id="name"
        name="name"
        type="text"
        label="Name"
        autoComplete="name"
        value={values.name}
        onChange={handleChange}
        error={shownErrors.name}
      />

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
        autoComplete="new-password"
        value={values.password}
        onChange={handleChange}
        error={shownErrors.password}
      />

      <Button type="submit" loading={isSubmitting}>
        Create account
      </Button>
    </form>
  );
}