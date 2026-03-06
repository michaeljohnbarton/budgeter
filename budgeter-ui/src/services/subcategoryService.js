import { apiService } from "./apiService";

const SubcategoryUrl = "/Subcategory";

export const subcategoryService = {
	create: (payload) => apiService.postWithResponse(SubcategoryUrl, payload),
	getAll: () => apiService.get(SubcategoryUrl),
	update: (id, payload) => apiService.put(`${SubcategoryUrl}/${id}`, payload),
	delete: (id) => apiService.delete(`${SubcategoryUrl}/${id}`)
};