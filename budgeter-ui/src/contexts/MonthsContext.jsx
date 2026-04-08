import { createContext, useContext, useEffect, useRef, useState } from "react";
import { LoadingContext } from "./LoadingContext";
import { monthService } from "../services/monthService";
import { API_CONNECTION_ERROR_MESSAGE, API_CONNECTION_FAILED_MESSAGE } from "../constants/apiConstants";

const MonthsContext = createContext();

export function MonthsProvider({ children }) {
	const { setLoading, LoadingType } = useContext(LoadingContext);

	const [months, setMonths] = useState([]);
	const [error, setError] = useState(null);
	const [selectedMonthId, setSelectedMonthId] = useState('');

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonthNumber = currentDate.getMonth() + 1;

	useEffect(() => {
		if (months.length === 0 || selectedMonthId !== '') return;
		const current = months.find(m => m.monthNumber === currentMonthNumber && m.year === currentYear);
		setSelectedMonthId(current?.id || months[0].id);
	}, [months, selectedMonthId, currentMonthNumber, currentYear]);

	const monthMap = [
		{ number: 1, name: "January" },
		{ number: 2, name: "February" },
		{ number: 3, name: "March" },
		{ number: 4, name: "April" },
		{ number: 5, name: "May" },
		{ number: 6, name: "June" },
		{ number: 7, name: "July" },
		{ number: 8, name: "August" },
		{ number: 9, name: "September" },
		{ number: 10, name: "October" },
		{ number: 11, name: "November" },
		{ number: 12, name: "December" }
	]

	const hasFetched = useRef(false);

	async function createMonth(payload) {
		try {
			setLoading(LoadingType.OVERLAY);
			await monthService.create(payload);
			await fetchMonths({ force: true });
		} catch (err) {
			if (err.message === API_CONNECTION_FAILED_MESSAGE) {
				setError(API_CONNECTION_ERROR_MESSAGE);
			}
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function fetchMonths({ force = false } = {}) {
		if (hasFetched.current && !force) return;

		try {
			setLoading(LoadingType.FULLSCREEN);
			setError(null);
			const data = await monthService.getAll();
			setMonths(data);
			hasFetched.current = true;
		} catch (err) {
			setError(err.message === API_CONNECTION_FAILED_MESSAGE ? API_CONNECTION_ERROR_MESSAGE : err.message);
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function updateMonth(monthId, payload) {
		try {
			setLoading(LoadingType.OVERLAY);
			await monthService.update(monthId, payload);
			await fetchMonths({ force: true });
		} catch (err) {
			if (err.message === API_CONNECTION_FAILED_MESSAGE) {
				setError(API_CONNECTION_ERROR_MESSAGE);
			}
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function deleteMonth(monthId) {
		try {
			setLoading(LoadingType.OVERLAY);
			await monthService.delete(monthId);
			await fetchMonths({ force: true });
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
		fetchMonths();
	}, []);

	return (
		<MonthsContext.Provider value={{ months, error, monthMap, createMonth, updateMonth, deleteMonth, selectedMonthId, setSelectedMonthId }}>
			{children}
		</MonthsContext.Provider>
	);
}

export function useMonths() {
	const context = useContext(MonthsContext);
	if (!context) throw new Error("useMonths must be used within a MonthsProvider");
	return context;
}