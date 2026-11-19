// The server sends dates like "2026-12-05T00:00:00.000Z". Dates are stored as UTC midnight,
// so we format in UTC to keep the same calendar day everywhere.
export function formatDueDate(isoString) {
  return new Date(isoString).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// "2026-12-05T00:00:00.000Z" becomes "2026-12-05", the format a date input needs.
export function toDateInputValue(isoString) {
  return isoString ? isoString.slice(0, 10) : "";
}

export function isOverdue(task) {
  if (!task.dueDate || task.status === "done") return false;

  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in the user's time zone
  return task.dueDate.slice(0, 10) < today;
}