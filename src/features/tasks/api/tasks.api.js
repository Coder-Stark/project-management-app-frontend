import api from "../../../shared/api/axiosClient.js";

export async function getTasks(projectId) {
  const { data } = await api.get(`/projects/${projectId}/tasks`);
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