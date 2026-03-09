import { createContext, useContext, useState, useRef, useEffect } from "react";
import { LoadingContext } from "./LoadingContext";
import { monthlyBalanceService } from "../services/monthlyBalanceService";
import { API_CONNECTION_ERROR_MESSAGE, API_CONNECTION_FAILED_MESSAGE } from "../constants/apiConstants";

const MonthlyBalancesContext = createContext();

export function MonthlyBalancesProvider({ children }) {
	const { setLoading, LoadingType } = useContext(LoadingContext);

	const [monthlyBalances, setMonthlyBalances] = useState([]);
	const [error, setError] = useState(null);

	const hasFetched = useRef(false);

	async function fetchMonthlyBalances({ force = false } = {}) {
		if (hasFetched.current && !force) return;

		try {
			setLoading(LoadingType.FULLSCREEN);
			setError(null);
			const data = await monthlyBalanceService.getAll();
			setMonthlyBalances(data);
			hasFetched.current = true;
		} catch (err) {
			setError(err.message === API_CONNECTION_FAILED_MESSAGE ? API_CONNECTION_ERROR_MESSAGE : err.message);
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	useEffect(() => {
		fetchMonthlyBalances();
	}, []);

	return (
		<MonthlyBalancesContext.Provider value={{ monthlyBalances, error, fetchMonthlyBalances }}>
			{children}
		</MonthlyBalancesContext.Provider>
	);
}

export function useMonthlyBalances() {
	const context = useContext(MonthlyBalancesContext);
	if (!context) throw new Error("useMonthlyBalances must be used within a MonthlyBalancesProvider");
	return context;
}