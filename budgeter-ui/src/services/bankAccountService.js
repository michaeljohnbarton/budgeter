import { apiService } from "./apiService";

const BankAccountUrl = "/BankAccount";

export const bankAccountService = {
	create: (payload) => apiService.post(BankAccountUrl, payload),
	getAll: () => apiService.get(BankAccountUrl),
	update: (id, payload) => apiService.put(`${BankAccountUrl}/${id}`, payload),
	delete: (id) => apiService.delete(`${BankAccountUrl}/${id}`)
};