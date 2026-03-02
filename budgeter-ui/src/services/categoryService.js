import { apiService } from "./apiService";

const CategoryUrl = "/Category";

export const categoryService = {
	getAll: () => apiService.get(CategoryUrl),
	create: (payload) => apiService.post(CategoryUrl, payload),
	update: (id, payload) => apiService.put(`${CategoryUrl}/${id}`, payload),
	delete: (id) => apiService.delete(`${CategoryUrl}/${id}`)
};