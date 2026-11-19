import { useState } from "react";
import Button from "../../../shared/components/Button.jsx";
import EmptyState from "../../../shared/components/EmptyState.jsx";
import ErrorBanner from "../../../shared/components/ErrorBanner.jsx";
import InlineLoader from "../../../shared/components/InlineLoader.jsx";
import { useTasks } from "../hooks/useTasks.js";
import DeleteTaskDialog from "./DeleteTaskDialog.jsx";
import TaskFormModal from "./TaskFormModal.jsx";
import TaskList from "./TaskList.jsx";

export default function ProjectTasks({ projectId }) {
  const { tasks, status, error, reload } = useTasks(projectId);

  // null means closed. { task: null } means "new", { task } means "edit".
  const [formState, setFormState] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const isLoading = (status === "idle" || status === "loading") && tasks.length === 0;
  const hasFailed = status === "failed";

  function renderContent() {
    if (isLoading) return <InlineLoader />;

    if (tasks.length === 0) {
      if (hasFailed) return null;
      return <EmptyState title="No tasks yet" message="Add the first task for this project." />;
    }

    return (
      <TaskList
        tasks={tasks}
        onEdit={(task) => setFormState({ task })}
        onDelete={(task) => setTaskToDelete(task)}
      />
    );
  }

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
        <Button type="button" fullWidth={false} onClick={() => setFormState({ task: null })}>
          Add task
        </Button>
      </div>

      {hasFailed && (
        <div className="mt-4 space-y-2">
          <ErrorBanner message={error} />
          <Button type="button" variant="secondary" fullWidth={false} onClick={reload}>
            Retry
          </Button>
        </div>
      )}

      {renderContent()}

      {formState && (
        <TaskFormModal
          projectId={projectId}
          task={formState.task}
          onClose={() => setFormState(null)}
          onSaved={reload}
        />
      )}

      {taskToDelete && (
        <DeleteTaskDialog
          projectId={projectId}
          task={taskToDelete}
          onClose={() => setTaskToDelete(null)}
          onDeleted={reload}
        />
      )}
    </section>
  );
}