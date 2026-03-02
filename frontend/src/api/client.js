import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

// Attach token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Redirect to login on 401 (only if not already on login page)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && window.location.pathname !== "/login") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// Auth
export const login = (data) => api.post("/auth/login", data);
export const getMe = () => api.get("/auth/me");

// Contacts
export const getContacts = () => api.get("/contacts");
export const getContact = (id) => api.get(`/contacts/${id}`);
export const createContact = (data) => api.post("/contacts", data);
export const updateContact = (id, data) => api.put(`/contacts/${id}`, data);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);

// Debts
export const getDebts = (params) => api.get("/debts", { params });
export const getDebt = (id) => api.get(`/debts/${id}`);
export const createDebt = (data) => api.post("/debts", data);
export const updateDebt = (id, data) => api.put(`/debts/${id}`, data);
export const deleteDebt = (id) => api.delete(`/debts/${id}`);

// Payments
export const addPayment = (debtId, data) => api.post(`/payments/debt/${debtId}`, data);
export const deletePayment = (debtId, paymentId) =>
  api.delete(`/payments/debt/${debtId}/payment/${paymentId}`);

// Reports
export const getSummary = () => api.get("/reports/summary");
export const getOverdue = () => api.get("/reports/overdue");
export const exportCSV = () => api.get("/reports/export", { responseType: "blob" });
