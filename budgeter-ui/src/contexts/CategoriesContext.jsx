import { createContext, useContext, useState } from "react";
import { LoadingContext } from "./LoadingContext";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
	const { setLoading, LoadingType } = useContext(LoadingContext);

	const [categories, setCategories] = useState([]);

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
		} catch (err) {
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	return (
		<CategoriesContext.Provider value={{ categories, createCategory }}>
			{children}
		</CategoriesContext.Provider>
	);
}

export function useCategories() {
	const context = useContext(CategoriesContext);
	if (!context) throw new Error("useCategories must be used within a CategoriesProvider");
	return context;
}