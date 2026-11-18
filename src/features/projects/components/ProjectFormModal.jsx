import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../shared/components/Button.jsx";
import ErrorBanner from "../../../shared/components/ErrorBanner.jsx";
import FormField from "../../../shared/components/FormField.jsx";
import Modal from "../../../shared/components/Modal.jsx";
import TextAreaField from "../../../shared/components/TextAreaField.jsx";
import { clearActionErrors, createProject, updateProject } from "../projects.slice.js";
import { validateProject } from "../utils/projects.validation.js";

// project === null means "create". A project object means "edit".
export default function ProjectFormModal({ project, onClose }) {
  const dispatch = useDispatch();
  const { isSaving, saveError, saveFieldErrors } = useSelector((state) => state.projects);
  const isEditing = Boolean(project);

  const [values, setValues] = useState({
    title: project?.title ?? "",
    description: project?.description ?? "",
  });
  const [errors, setErrors] = useState({});
  const submittingRef = useRef(false);

  useEffect(() => {
    dispatch(clearActionErrors());
  }, [dispatch]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submittingRef.current) return;

    const foundErrors = validateProject(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
    };

    submittingRef.current = true;
    try {
      const action = isEditing
        ? await dispatch(updateProject({ id: project.id, values: payload }))
        : await dispatch(createProject(payload));

      // Close the popup only when the server accepted the change.
      if (action.meta.requestStatus === "fulfilled") onClose();
    } finally {
      submittingRef.current = false;
    }
  }

  const shownErrors = { ...saveFieldErrors, ...errors };
  const hasFieldErrors = Object.keys(shownErrors).length > 0;

  return (
    <Modal title={isEditing ? "Edit project" : "New project"} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <ErrorBanner message={hasFieldErrors ? null : saveError} />

        <FormField
          id="title"
          name="title"
          type="text"
          label="Title"
          value={values.title}
          onChange={handleChange}
          error={shownErrors.title}
        />

        <TextAreaField
          id="description"
          name="description"
          label="Description (optional)"
          value={values.description}
          onChange={handleChange}
          error={shownErrors.description}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" fullWidth={false} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" fullWidth={false} loading={isSaving}>
            {isEditing ? "Save changes" : "Create project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}