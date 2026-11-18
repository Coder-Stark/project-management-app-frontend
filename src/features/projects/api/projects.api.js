import api from "../../../shared/api/axiosClient.js";

export async function getProjects() {
  const { data } = await api.get("/projects");
  return data.projects;
}

export async function getProject(id) {
  const { data } = await api.get(`/projects/${id}`);
  return data.project;
}

export async function createProject(values) {
  const { data } = await api.post("/projects", values);
  return data.project;
}

export async function updateProject(id, values) {
  const { data } = await api.patch(`/projects/${id}`, values);
  return data.project;
}

export async function deleteProject(id) {
  await api.delete(`/projects/${id}`);
}