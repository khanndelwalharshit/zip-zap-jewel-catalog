import { api } from './api'

export interface Product {
  id: number
  name: string
  description?: string
  price: number
  categoryId: number
  category?: {
    id: number
    name: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateProductData {
  name: string
  description?: string
  price: number
  categoryId: number
}

export interface UpdateProductData {
  name?: string
  description?: string
  price?: number
  categoryId?: number
}

export const productService = {
  async getAll(): Promise<{ success: boolean; data: Product[] }> {
    return api.get('/products')
  },

  async getById(id: number): Promise<{ success: boolean; data: Product }> {
    return api.get(`/products/${id}`)
  },

  async create(data: CreateProductData): Promise<{ success: boolean; data: Product }> {
    return api.post('/products', data)
  },

  async update(id: number, data: UpdateProductData): Promise<{ success: boolean; data: Product }> {
    return api.put(`/products/${id}`, data)
  },

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    return api.delete(`/products/${id}`)
  },
}