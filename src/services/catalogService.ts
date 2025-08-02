import { api } from './api'

export interface Catalog {
  id: number
  name: string
  customerId: number
  customer?: {
    id: number
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateCatalogData {
  name: string
  customerId: number
}

export interface UpdateCatalogData {
  name?: string
  customerId?: number
}

export const catalogService = {
  async getAll(): Promise<{ success: boolean; data: Catalog[] }> {
    return api.get('/catalogs')
  },

  async getById(id: number): Promise<{ success: boolean; data: Catalog }> {
    return api.get(`/catalogs/${id}`)
  },

  async create(data: CreateCatalogData): Promise<{ success: boolean; data: Catalog }> {
    return api.post('/catalogs', data)
  },

  async update(id: number, data: UpdateCatalogData): Promise<{ success: boolean; data: Catalog }> {
    return api.put(`/catalogs/${id}`, data)
  },

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    return api.delete(`/catalogs/${id}`)
  },
}