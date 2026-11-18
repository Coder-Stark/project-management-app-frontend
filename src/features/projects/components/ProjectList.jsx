import ProjectCard from "./ProjectCard.jsx";

export default function ProjectList({ projects, onEdit, onDelete }) {
  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}