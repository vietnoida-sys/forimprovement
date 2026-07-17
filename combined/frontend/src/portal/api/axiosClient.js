import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("eduadmin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("eduadmin_token");
      localStorage.removeItem("eduadmin_user");
      if (!window.location.pathname.includes("/portal/login")) {
        alert(" please login again");
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
      }
    }
    return Promise.reject(err);
  }
);

export default api;

const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) ||
  "http://localhost:5000/api";

async function handle(res) {
  let body = null;
  try {
    body = await res.json();
  } catch {
    // no JSON body (e.g. on some error responses) — fine
  }
  if (!res.ok) {
    throw new Error(body?.message || `Request failed with status ${res.status}`);
  }
  return body;
}

export const cmsApi = {
  list: (resource) => fetch(`${API_BASE}/${resource}`).then(handle),
  create: (resource, data) =>
    fetch(`${API_BASE}/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handle),
  update: (resource, id, data) =>
    fetch(`${API_BASE}/${resource}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handle),
  remove: (resource, id) =>
    fetch(`${API_BASE}/${resource}/${id}`, { method: "DELETE" }).then(handle),
};