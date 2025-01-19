import { api } from './api';

var Route = import.meta.env.VITE_A
export const busService = {
  getAll: () => api.get(Route),
  create: (data) => api.post(Route, data),
  delete: (id) => api.delete(`${Route}/${id}`),
  update: (id, data) => api.put(`${Route}/${id}`, data),
};