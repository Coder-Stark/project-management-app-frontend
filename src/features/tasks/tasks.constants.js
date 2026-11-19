export const TASK_STATUS_OPTIONS = [
  { value: "todo", label: "To do" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
];

export const DEFAULT_TASK_STATUS = "todo";

export const TASK_RULES = {
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 1000,
};

export const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All statuses" },
  ...TASK_STATUS_OPTIONS,
];

export const SORT_OPTIONS = [
  { value: "createdAt:desc", label: "Newest first" },
  { value: "createdAt:asc", label: "Oldest first" },
  { value: "dueDate:asc", label: "Due date: soonest first" },
  { value: "dueDate:desc", label: "Due date: latest first" },
];

export const DEFAULT_FILTERS = { status: "all", sort: "createdAt:desc" };