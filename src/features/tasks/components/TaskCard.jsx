import { formatDueDate, isOverdue } from "../utils/tasks.utils.js";
import TaskStatusBadge from "./TaskStatusBadge.jsx";

export default function TaskCard({ task, onEdit, onDelete }) {
  const overdue = isOverdue(task);

  return (
    <li className="rounded-lg bg-white p-4 shadow">
      <div className="flex items-start justify-between gap-3">
        <h3 className="break-words font-medium text-gray-900">{task.title}</h3>
        <TaskStatusBadge status={task.status} />
      </div>

      {task.description && (
        <p className="mt-1 whitespace-pre-line break-words text-sm text-gray-600">
          {task.description}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between">
        <span className={`text-xs ${overdue ? "font-medium text-red-600" : "text-gray-500"}`}>
          {task.dueDate
            ? `${overdue ? "Overdue: " : "Due "}${formatDueDate(task.dueDate)}`
            : "No due date"}
        </span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="text-sm text-indigo-600 hover:underline"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(task)}
            className="text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}