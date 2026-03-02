import { apiService } from "./apiService";

const BankAccountUrl = "/BankAccount";

export const bankAccountService = {
	getAll: () => apiService.get(BankAccountUrl),
	create: (payload) => apiService.post(BankAccountUrl, payload),
	update: (id, payload) => apiService.put(`${BankAccountUrl}/${id}`, payload),
	delete: (id) => apiService.delete(`${BankAccountUrl}/${id}`)
};