import { api } from './api'

export interface Category {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface CreateCategoryData {
  name: string
}

export interface UpdateCategoryData {
  name?: string
}

export const categoryService = {
  async getAll(): Promise<{ success: boolean; data: Category[] }> {
    return api.get('/categories')
  },

  async getById(id: number): Promise<{ success: boolean; data: Category }> {
    return api.get(`/categories/${id}`)
  },

  async create(data: CreateCategoryData): Promise<{ success: boolean; data: Category }> {
    return api.post('/categories', data)
  },

  async update(id: number, data: UpdateCategoryData): Promise<{ success: boolean; data: Category }> {
    return api.put(`/categories/${id}`, data)
  },

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    return api.delete(`/categories/${id}`)
  },
}