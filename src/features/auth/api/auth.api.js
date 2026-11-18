import api from "../../../shared/api/axiosClient.js";

export async function signup(values) {
  const { data } = await api.post("/auth/signup", values);
  return data;
}

export async function login(values) {
  const { data } = await api.post("/auth/login", values);
  return data;
}

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data;
}