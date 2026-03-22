import { apiService } from "./apiService";

const TransactionUrl = "/Transaction";

export const transactionService = {
	create: (payload) => apiService.post(TransactionUrl, payload)
};