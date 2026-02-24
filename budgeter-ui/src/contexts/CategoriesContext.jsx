import { createContext, useContext, useState, useRef, useEffect } from "react";
import { LoadingContext } from "./LoadingContext";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
	const { setLoading, LoadingType } = useContext(LoadingContext);

	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);

	const hasFetched = useRef(false);

	async function createCategory(payload) {
		try {
			setLoading(LoadingType.OVERLAY);

			const response = await fetch("http://localhost:60060/api/Category", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});

			if (!response.ok)
			{
				const responseData = await response.text();
				throw new Error(responseData || "Failed to create category");
			}

			await fetchCategories({ force: true });
		} catch (err) {
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function fetchCategories({ force = false } = {}) {
		if (hasFetched.current && !force) return;

		try {
			setLoading(LoadingType.FULLSCREEN);

			const response = await fetch("http://localhost:60060/api/Category");
			if (!response.ok) throw new Error("Failed to fetch categories");

			const data = await response.json();
			setCategories(data);
			hasFetched.current = true;
		} catch (err) {
			setError(err.message === "Failed to fetch" ? "Could not connect to the API." : err.message);
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function updateCategory(categoryId, payload) {
		try {
			setLoading(LoadingType.OVERLAY);

			const response = await fetch(`http://localhost:60060/api/Category/${categoryId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});

			if (!response.ok)
			{
				const responseData = await response.text();
				throw new Error(responseData || "Failed to update category");
			}

			await fetchCategories({ force: true });
		} catch (err) {
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<CategoriesContext.Provider value={{ categories, error, createCategory, updateCategory }}>
			{children}
		</CategoriesContext.Provider>
	);
}

export function useCategories() {
	const context = useContext(CategoriesContext);
	if (!context) throw new Error("useCategories must be used within a CategoriesProvider");
	return context;
}