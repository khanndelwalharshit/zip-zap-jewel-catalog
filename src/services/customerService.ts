// src/services/customerService.ts

import { api } from "./api";

export const customerService = {
  getAll: async () => {
    return await api.get("/customers");
  },

  getById: async (id: string) => {
    return await api.get(`/customers/${id}`);
  },

  create: async (data: any) => {
    return await api.post("/customers", data);
  },

  update: async (id: string, data: any) => {
    return await api.put(`/customers/${id}`, data);
  },

  delete: async (id: string) => {
    return await api.delete(`/customers/${id}`);
  },
};
