import { apiClient } from '@/shared/api';

export const userApi = {
  async getAll() {
    const response = await apiClient.get('/users');
    return response.data;
  },
  
  async getById(id) {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
  
  async create(userData) {
    const response = await apiClient.post('/users', userData);
    return response.data;
  },
  
  async update(id, userData) {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  },
  
  async delete(id) {
    await apiClient.delete(`/users/${id}`);
  }
};