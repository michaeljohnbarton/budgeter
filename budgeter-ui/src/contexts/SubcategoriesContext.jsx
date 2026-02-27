import { createContext, useContext, useState, useRef, useEffect } from "react";
import { LoadingContext } from "./LoadingContext";

const SubcategoriesContext = createContext();

export function SubcategoriesProvider({ children }) {
	const { setLoading, LoadingType } = useContext(LoadingContext);

	const [subcategories, setSubcategories] = useState([]);

	const hasFetched = useRef(false);

	async function createSubcategory(payload) {
		try {
			setLoading(LoadingType.OVERLAY);

			const response = await fetch("http://localhost:60060/api/Subcategory", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});

			if (!response.ok)
			{
				const responseData = await response.text();
				throw new Error(responseData || "Failed to create subcategory");
			}

			await fetchSubcategories({ force: true });
		} catch (err) {
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function fetchSubcategories({ force = false } = {}) {
		if (hasFetched.current && !force) return;

		try {
			setLoading(LoadingType.FULLSCREEN);

			const response = await fetch("http://localhost:60060/api/Subcategory");
			if (!response.ok) throw new Error("Failed to fetch subcategories");

			const data = await response.json();
			setSubcategories(data);
			hasFetched.current = true;
		} catch (err) {
			setError(err.message === "Failed to fetch" ? "Could not connect to the API." : err.message);
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	useEffect(() => {
		fetchSubcategories();
	}, []);

	return (
		<SubcategoriesContext.Provider value={{ subcategories, createSubcategory }}>
			{children}
		</SubcategoriesContext.Provider>
	);
}

export function useSubcategories() {
	const context = useContext(SubcategoriesContext);
	if (!context) throw new Error("useSubcategories must be used within a SubcategoriesProvider");
	return context;
}