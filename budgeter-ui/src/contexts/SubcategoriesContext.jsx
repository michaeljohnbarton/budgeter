import { createContext, useContext, useState, useRef, useEffect } from "react";
import { LoadingContext } from "./LoadingContext";
import { subcategoryService } from "../services/subcategoryService";
import { monthlyBalanceService } from "../services/monthlyBalanceService";
import { API_CONNECTION_ERROR_MESSAGE, API_CONNECTION_FAILED_MESSAGE } from "../constants/apiConstants";
import { useMonthlyBalances } from "./MonthlyBalancesContext";

const SubcategoriesContext = createContext();

export function SubcategoriesProvider({ children }) {
	const { setLoading, LoadingType } = useContext(LoadingContext);
	const { fetchMonthlyBalances } = useMonthlyBalances();

	const [subcategories, setSubcategories] = useState([]);
	const [error, setError] = useState(null);

	const hasFetched = useRef(false);

	async function createSubcategory(payload, defaultBudgetedAmountCents) {
		try {
			setLoading(LoadingType.OVERLAY);
			const data = await subcategoryService.create(payload);

			try {
				if(defaultBudgetedAmountCents !== null && defaultBudgetedAmountCents !== undefined) {
					await monthlyBalanceService.create({
						monthId: 0, // Represents default balance
						subcategoryId: data.id,
						budgetedAmountCents: defaultBudgetedAmountCents || null,
						actualAmountCents: 0
					});
				}
			}
			catch (err) {
				throw new Error(`Subcategory created but failed to set default budgeted amount\nMessage: ${err.message}`);
			}
			finally {
				await fetchSubcategories({ force: true });
				await fetchMonthlyBalances({ force: true });
			}
		} catch (err) {
			if (err.message === API_CONNECTION_FAILED_MESSAGE) {
				setError(API_CONNECTION_ERROR_MESSAGE);
			}
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function fetchSubcategories({ force = false } = {}) {
		if (hasFetched.current && !force) return;

		try {
			setLoading(LoadingType.FULLSCREEN);
			setError(null);
			const data = await subcategoryService.getAll();
			setSubcategories(data);
			hasFetched.current = true;
		} catch (err) {
			setError(err.message === API_CONNECTION_FAILED_MESSAGE ? API_CONNECTION_ERROR_MESSAGE : err.message);
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function updateSubcategory(subcategoryId, payload, defaultMonthlyBalance, defaultBudgetedAmountCents) {
		try {
			setLoading(LoadingType.OVERLAY);
			await subcategoryService.update(subcategoryId, payload);

			try {
				if(defaultBudgetedAmountCents !== null && defaultBudgetedAmountCents !== undefined) {
					if(defaultMonthlyBalance) {
						await monthlyBalanceService.update(defaultMonthlyBalance.id, {
							budgetedAmountCents: defaultBudgetedAmountCents,
							actualAmountCents: defaultMonthlyBalance.actualAmountCents || 0
						});
					}
					else {
						await monthlyBalanceService.create({
							monthId: 0, // Represents default balance
							subcategoryId: subcategoryId,
							budgetedAmountCents: defaultBudgetedAmountCents,
							actualAmountCents: 0
						});
					}
				}
			}
			catch (err) {
				throw new Error(`Subcategory updated but failed to update default budgeted amount\nMessage: ${err.message}`);
			}
			finally {
				await fetchSubcategories({ force: true });
				await fetchMonthlyBalances({ force: true });
			}
		} catch (err) {
			if (err.message === API_CONNECTION_FAILED_MESSAGE) {
				setError(API_CONNECTION_ERROR_MESSAGE);
			}
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function deleteSubcategory(subcategoryId) {
		try {
			setLoading(LoadingType.OVERLAY);
			await subcategoryService.delete(subcategoryId);
			await fetchSubcategories({ force: true });
		} catch (err) {
			if (err.message === API_CONNECTION_FAILED_MESSAGE) {
				setError(API_CONNECTION_ERROR_MESSAGE);
			}
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	useEffect(() => {
		fetchSubcategories();
	}, []);

	return (
		<SubcategoriesContext.Provider value={{ subcategories, error, createSubcategory, updateSubcategory, deleteSubcategory }}>
			{children}
		</SubcategoriesContext.Provider>
	);
}

export function useSubcategories() {
	const context = useContext(SubcategoriesContext);
	if (!context) throw new Error("useSubcategories must be used within a SubcategoriesProvider");
	return context;
}