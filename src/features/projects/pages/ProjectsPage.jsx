import { useState } from "react";
import Button from "../../../shared/components/Button.jsx";
import EmptyState from "../../../shared/components/EmptyState.jsx";
import ErrorBanner from "../../../shared/components/ErrorBanner.jsx";
import InlineLoader from "../../../shared/components/InlineLoader.jsx";
import DeleteProjectDialog from "../components/DeleteProjectDialog.jsx";
import ProjectFormModal from "../components/ProjectFormModal.jsx";
import ProjectList from "../components/ProjectList.jsx";
import { useProjectsList } from "../hooks/useProjectsList.js";

export default function ProjectsPage() {
  const { projects, status, error, reload } = useProjectsList();

  // null means the popup is closed. { project: null } means "new", { project } means "edit".
  const [formState, setFormState] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const isLoading = (status === "idle" || status === "loading") && projects.length === 0;
  const hasFailed = status === "failed";

  function renderContent() {
    if (isLoading) return <InlineLoader />;

    if (projects.length === 0) {
      if (hasFailed) return null;
      return (
        <EmptyState
          title="No projects yet"
          message="Create your first project to get started."
        >
          <Button fullWidth={false} onClick={() => setFormState({ project: null })}>
            New project
          </Button>
        </EmptyState>
      );
    }

    return (
      <ProjectList
        projects={projects}
        onEdit={(project) => setFormState({ project })}
        onDelete={(project) => setProjectToDelete(project)}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Your projects</h1>
        <Button type="button" fullWidth={false} onClick={() => setFormState({ project: null })}>
          New project
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
        <ProjectFormModal project={formState.project} onClose={() => setFormState(null)} />
      )}

      {projectToDelete && (
        <DeleteProjectDialog
          project={projectToDelete}
          onClose={() => setProjectToDelete(null)}
        />
      )}
    </div>
  );
}