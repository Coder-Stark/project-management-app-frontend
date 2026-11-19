import TaskCard from "./TaskCard.jsx";

export default function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <ul className="mt-4 space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}