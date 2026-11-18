import { Link } from "react-router-dom";
import { formatDate } from "../../../shared/utils/formatDate.js";

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <li className="flex flex-col justify-between rounded-lg bg-white p-4 shadow">
      <div>
        <Link
          to={`/projects/${project.id}`}
          className="break-words text-lg font-semibold text-gray-900 hover:text-indigo-600"
        >
          {project.title}
        </Link>
        <p className="mt-1 line-clamp-3 break-words text-sm text-gray-600">
          {project.description || "No description"}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-500">Created {formatDate(project.createdAt)}</span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onEdit(project)}
            className="text-sm text-indigo-600 hover:underline"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(project)}
            className="text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}