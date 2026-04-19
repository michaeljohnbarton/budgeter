import { apiService } from "./apiService";

const TransactionUrl = "/Transaction";

export const transactionService = {
	create: (payload) => apiService.post(TransactionUrl, payload),
	getAll: () => apiService.get(TransactionUrl),
	update: (id, payload, patch = false) => {
		if (patch) {
			return apiService.patch(`${TransactionUrl}/${id}`, payload);
		}
		return apiService.put(`${TransactionUrl}/${id}`, payload);
	},
	delete: (id) => apiService.delete(`${TransactionUrl}/${id}`)
};