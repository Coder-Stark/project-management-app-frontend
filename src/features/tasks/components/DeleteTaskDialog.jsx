import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../shared/components/Button.jsx";
import ErrorBanner from "../../../shared/components/ErrorBanner.jsx";
import Modal from "../../../shared/components/Modal.jsx";
import { clearActionErrors, deleteTask } from "../tasks.slice.js";

export default function DeleteTaskDialog({ projectId, task, onClose, onDeleted }) {
  const dispatch = useDispatch();
  const { isDeleting, deleteError } = useSelector((state) => state.tasks);
  const deletingRef = useRef(false);

  useEffect(() => {
    dispatch(clearActionErrors());
  }, [dispatch]);

  async function handleDelete() {
    if (deletingRef.current) return;

    deletingRef.current = true;
    try {
      const action = await dispatch(deleteTask({ projectId, taskId: task.id }));
      if (action.meta.requestStatus === "fulfilled") {
        onDeleted();
        onClose();
      }
    } finally {
      deletingRef.current = false;
    }
  }

  return (
    <Modal title="Delete task?" onClose={onClose}>
      <div className="space-y-4">
        <ErrorBanner message={deleteError} />

        <p className="text-sm text-gray-600">
          You are about to delete{" "}
          <span className="break-words font-medium text-gray-900">{task.title}</span>. This
          cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            fullWidth={false}
            disabled={isDeleting}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            fullWidth={false}
            loading={isDeleting}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}