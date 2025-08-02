import { api } from './api'

export interface User {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserData {
  name: string
  email: string
  role?: string
}

export interface UpdateUserData {
  name?: string
  email?: string
  role?: string
}

export const userService = {
  // Get all users
  async getAll(): Promise<{ success: boolean; data: User[] }> {
    return api.get('/users')
  },

  // Get user by ID
  async getById(id: number): Promise<{ success: boolean; data: User }> {
    return api.get(`/users/${id}`)
  },

  // Create new user
  async create(data: CreateUserData): Promise<{ success: boolean; data: User }> {
    return api.post('/users', data)
  },

  // Update user
  async update(id: number, data: UpdateUserData): Promise<{ success: boolean; data: User }> {
    return api.put(`/users/${id}`, data)
  },

  // Delete user
  async delete(id: number): Promise<{ success: boolean; message: string }> {
    return api.delete(`/users/${id}`)
  },
}