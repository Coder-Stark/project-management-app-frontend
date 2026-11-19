import { TASK_STATUS_OPTIONS } from "../tasks.constants.js";

const STYLES = {
  todo: "bg-gray-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
};

export default function TaskStatusBadge({ status }) {
  const option = TASK_STATUS_OPTIONS.find((item) => item.value === status);

  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${STYLES[status] ?? STYLES.todo}`}
    >
      {option?.label ?? status}
    </span>
  );
}