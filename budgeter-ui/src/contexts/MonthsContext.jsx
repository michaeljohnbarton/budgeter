import { createContext, useContext, useEffect, useRef, useState } from "react";
import { LoadingContext } from "./LoadingContext";

const MonthsContext = createContext();

export function MonthsProvider({ children }) {
	const { setLoading, LoadingType } = useContext(LoadingContext);

	const [months, setMonths] = useState([]);
	const [error, setError] = useState(null);

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

			const response = await fetch("http://localhost:60060/api/Month", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});

			if (!response.ok)
			{
				const responseData = await response.text();
				throw new Error(responseData || "Failed to create month");
			}

			await fetchMonths({ force: true });
		} catch (err) {
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

			const response = await fetch("http://localhost:60060/api/Month");
			if (!response.ok) throw new Error("Failed to fetch months");

			const data = await response.json();
			setMonths(data);
			hasFetched.current = true;
		} catch (err) {
			setError(err.message === "Failed to fetch" ? "Could not connect to the API." : err.message);
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function updateMonth(monthId, payload) {
		try {
			setLoading(LoadingType.OVERLAY);

			const response = await fetch(`http://localhost:60060/api/Month/${monthId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});

			if (!response.ok)
			{
				const responseData = await response.text();
				throw new Error(responseData || "Failed to update month");
			}

			await fetchMonths({ force: true });
		} catch (err) {
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function deleteMonth(monthId) {
		try {
			setLoading(LoadingType.OVERLAY);

			const response = await fetch(`http://localhost:60060/api/Month/${monthId}`, {
				method: "DELETE"
			});

			if (!response.ok)
			{
				const responseData = await response.text();
				throw new Error(responseData || "Failed to delete month");
			}

			await fetchMonths({ force: true });
		} catch (err) {
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	useEffect(() => {
		fetchMonths();
	}, []);

	return (
		<MonthsContext.Provider value={{ months, error, monthMap, createMonth, updateMonth, deleteMonth }}>
			{children}
		</MonthsContext.Provider>
	);
}

export function useMonths() {
	const context = useContext(MonthsContext);
	if (!context) throw new Error("useMonths must be used within a MonthsProvider");
	return context;
}