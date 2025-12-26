import { createContext, useContext, useEffect, useRef, useState } from "react";
import { LoadingContext } from "./LoadingContext";

const MonthsContext = createContext();

export function MonthsProvider({ children }) {
	const { setLoading } = useContext(LoadingContext);

	const [months, setMonths] = useState([]);
	const [error, setError] = useState(null);

	const hasFetched = useRef(false);

	async function fetchMonths({ force = false } = {}) {
		if (hasFetched.current && !force) return;

		try {
			setLoading(true);
			setError(null);

			const response = await fetch("http://localhost:60060/api/Month");
			if (!response.ok) throw new Error("Failed to fetch months");

			const data = await response.json();
			setMonths(data);
			hasFetched.current = true;
		} catch (err) {
			setError(err.message === "Failed to fetch" ? "Could not connect to the API." : err.message);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchMonths();
	}, []);

	return (
		<MonthsContext.Provider value={{ months, error, fetchMonths }}>
			{children}
		</MonthsContext.Provider>
	);
}

export function useMonths() {
	const context = useContext(MonthsContext);
	if (!context) throw new Error("useMonths must be used within a MonthsProvider");
	return context;
}