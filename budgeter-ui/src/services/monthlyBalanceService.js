import { apiService } from "./apiService";

const MonthlyBalanceUrl = "/MonthlyBalance";

export const monthlyBalanceService = {
	create: (payload) => apiService.post(MonthlyBalanceUrl, payload),
	getAll: () => apiService.get(MonthlyBalanceUrl)
};