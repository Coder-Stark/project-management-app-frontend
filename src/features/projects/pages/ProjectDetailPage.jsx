import { Link, useParams } from "react-router-dom";
import InlineLoader from "../../../shared/components/InlineLoader.jsx";
import { formatDate } from "../../../shared/utils/formatDate.js";
import ProjectTasks from "../../tasks/components/ProjectTasks.jsx";
import { useProject } from "../hooks/useProject.js";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const { project, status, error } = useProject(projectId);

  const backLink = (
    <Link to="/projects" className="text-sm text-indigo-600 hover:underline">
      Back to projects
    </Link>
  );

  if (status === "failed") {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <h1 className="text-xl font-semibold text-gray-900">{error}</h1>
        <div className="mt-3">{backLink}</div>
      </div>
    );
  }

  // Wait until the project in Redux is the one in the URL.
  if (!project || project.id !== projectId) return <InlineLoader />;

  return (
    <div>
      {backLink}

      <div className="mt-3 rounded-lg bg-white p-6 shadow">
        <h1 className="break-words text-2xl font-semibold text-gray-900">{project.title}</h1>
        <p className="mt-2 whitespace-pre-line break-words text-sm text-gray-600">
          {project.description || "No description"}
        </p>
        <p className="mt-3 text-xs text-gray-500">Created {formatDate(project.createdAt)}</p>
      </div>

      <ProjectTasks projectId={project.id} />
    </div>
  );
}