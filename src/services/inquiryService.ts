import { api } from './api'

export interface Inquiry {
  id: number
  message: string
  customerId: number
  customer?: {
    id: number
    name: string
    email: string
  }
  catalogId?: number
  catalog?: {
    id: number
    name: string
  }
  status: string
  createdAt: string
  updatedAt: string
}

export interface CreateInquiryData {
  message: string
  customerId: number
  catalogId?: number
}

export interface UpdateInquiryData {
  message?: string
  status?: string
  catalogId?: number
}

export const inquiryService = {
  async getAll(): Promise<{ success: boolean; data: Inquiry[] }> {
    return api.get('/inquiries')
  },

  async getById(id: number): Promise<{ success: boolean; data: Inquiry }> {
    return api.get(`/inquiries/${id}`)
  },

  async create(data: CreateInquiryData): Promise<{ success: boolean; data: Inquiry }> {
    return api.post('/inquiries', data)
  },

  async update(id: number, data: UpdateInquiryData): Promise<{ success: boolean; data: Inquiry }> {
    return api.put(`/inquiries/${id}`, data)
  },

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    return api.delete(`/inquiries/${id}`)
  },
}