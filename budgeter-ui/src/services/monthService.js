import { apiService } from "./apiService";

const MonthUrl = "/Month";

export const monthService = {
	getAll: () => apiService.get(MonthUrl),
	create: (payload) => apiService.post(MonthUrl, payload),
	update: (id, payload) => apiService.put(`${MonthUrl}/${id}`, payload),
	delete: (id) => apiService.delete(`${MonthUrl}/${id}`)
};