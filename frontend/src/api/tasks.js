import { apiRequest } from './client';

export const getTasks = ({ status = 'all', page = 1, limit = 10, search = '' } = {}) => {
  const params = new URLSearchParams({
    status,
    page: String(page),
    limit: String(limit),
  });

  if (search.trim()) {
    params.set('search', search.trim());
  }

  return apiRequest(`/tasks?${params.toString()}`);
};

export const createTask = (payload) =>
  apiRequest('/tasks', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateTask = (id, payload) =>
  apiRequest(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteTask = (id) =>
  apiRequest(`/tasks/${id}`, {
    method: 'DELETE',
  });

export const toggleTask = (id) =>
  apiRequest(`/tasks/${id}/toggle`, {
    method: 'PATCH',
  });
