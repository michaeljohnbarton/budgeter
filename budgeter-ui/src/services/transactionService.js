import { apiService } from "./apiService";

const TransactionUrl = "/Transaction";

export const transactionService = {
	create: (payload) => apiService.post(TransactionUrl, payload),
	getAll: () => apiService.get(TransactionUrl),
	update: (id, payload) => apiService.put(`${TransactionUrl}/${id}`, payload),
	delete: (id) => apiService.delete(`${TransactionUrl}/${id}`)
};