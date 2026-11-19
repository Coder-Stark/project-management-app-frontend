import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../shared/components/Button.jsx";
import ErrorBanner from "../../../shared/components/ErrorBanner.jsx";
import FormField from "../../../shared/components/FormField.jsx";
import Modal from "../../../shared/components/Modal.jsx";
import SelectField from "../../../shared/components/SelectField.jsx";
import TextAreaField from "../../../shared/components/TextAreaField.jsx";
import { DEFAULT_TASK_STATUS, TASK_STATUS_OPTIONS } from "../tasks.constants.js";
import { clearActionErrors, createTask, updateTask } from "../tasks.slice.js";
import { toDateInputValue } from "../utils/tasks.utils.js";
import { validateTask } from "../utils/tasks.validation.js";

// task === null means "create". A task object means "edit".
export default function TaskFormModal({ projectId, task, onClose, onSaved }) {
  const dispatch = useDispatch();
  const { isSaving, saveError, saveFieldErrors } = useSelector((state) => state.tasks);
  const isEditing = Boolean(task);

  const [values, setValues] = useState({
    title: task?.title ?? "",
    description: task?.description ?? "",
    status: task?.status ?? DEFAULT_TASK_STATUS,
    dueDate: toDateInputValue(task?.dueDate),
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

    const foundErrors = validateTask(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status,
      dueDate: values.dueDate || null, // an empty date input means "no due date"
    };

    submittingRef.current = true;
    try {
      const action = isEditing
        ? await dispatch(updateTask({ projectId, taskId: task.id, values: payload }))
        : await dispatch(createTask({ projectId, values: payload }));

      if (action.meta.requestStatus === "fulfilled") {
        onSaved(); // ask the page to reload the list
        onClose();
      }
    } finally {
      submittingRef.current = false;
    }
  }

  const shownErrors = { ...saveFieldErrors, ...errors };
  const hasFieldErrors = Object.keys(shownErrors).length > 0;

  return (
    <Modal title={isEditing ? "Edit task" : "New task"} onClose={onClose}>
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

        <div className="grid grid-cols-2 gap-3">
          <SelectField
            id="status"
            name="status"
            label="Status"
            options={TASK_STATUS_OPTIONS}
            value={values.status}
            onChange={handleChange}
            error={shownErrors.status}
          />

          <FormField
            id="dueDate"
            name="dueDate"
            type="date"
            label="Due date (optional)"
            value={values.dueDate}
            onChange={handleChange}
            error={shownErrors.dueDate}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" fullWidth={false} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" fullWidth={false} loading={isSaving}>
            {isEditing ? "Save changes" : "Add task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}