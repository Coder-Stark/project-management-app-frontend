import api from "../../../shared/api/axiosClient.js";

export async function getTasks(projectId, filters) {
  const [sortBy, order] = filters.sort.split(":");
  const params = { sortBy, order };
  if (filters.status !== "all") params.status = filters.status;

  const { data } = await api.get(`/projects/${projectId}/tasks`, { params });
  return data.tasks;
}

export async function createTask(projectId, values) {
  const { data } = await api.post(`/projects/${projectId}/tasks`, values);
  return data.task;
}

export async function updateTask(projectId, taskId, values) {
  const { data } = await api.patch(`/projects/${projectId}/tasks/${taskId}`, values);
  return data.task;
}

export async function deleteTask(projectId, taskId) {
  await api.delete(`/projects/${projectId}/tasks/${taskId}`);
}