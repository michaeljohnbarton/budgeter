import { apiService } from "./apiService";

const CategoryUrl = "/Category";

export const categoryService = {
	create: (payload) => apiService.post(CategoryUrl, payload),
	getAll: () => apiService.get(CategoryUrl),
	update: (id, payload) => apiService.put(`${CategoryUrl}/${id}`, payload),
	delete: (id) => apiService.delete(`${CategoryUrl}/${id}`)
};