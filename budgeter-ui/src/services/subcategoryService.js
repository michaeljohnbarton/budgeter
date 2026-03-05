import { apiService } from "./apiService";

const SubcategoryUrl = "/Subcategory";

export const subcategoryService = {
	getAll: () => apiService.get(SubcategoryUrl),
	create: (payload) => apiService.postWithResponse(SubcategoryUrl, payload),
	update: (id, payload) => apiService.put(`${SubcategoryUrl}/${id}`, payload),
	delete: (id) => apiService.delete(`${SubcategoryUrl}/${id}`)
};