import { apiService } from "./apiService";

const MonthUrl = "/Month";

export const monthService = {
	create: (payload) => apiService.post(MonthUrl, payload),
	getAll: () => apiService.get(MonthUrl),
	update: (id, payload) => apiService.put(`${MonthUrl}/${id}`, payload),
	delete: (id) => apiService.delete(`${MonthUrl}/${id}`)
};