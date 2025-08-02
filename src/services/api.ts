const API_BASE_URL = 'http://localhost:5000/api'

export const api = {
  // Generic fetch function
  async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, defaultOptions)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // GET request
  async get(endpoint: string) {
    return this.fetch(endpoint)
  },

  // POST request
  async post(endpoint: string, data: any) {
    return this.fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // PUT request
  async put(endpoint: string, data: any) {
    return this.fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  // DELETE request
  async delete(endpoint: string) {
    return this.fetch(endpoint, {
      method: 'DELETE',
    })
  },
}