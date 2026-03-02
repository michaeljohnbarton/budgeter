import { createContext, useContext, useState, useRef, useEffect } from "react";
import { LoadingContext } from "./LoadingContext";
import { categoryService } from "../services/categoryService";
import { API_CONNECTION_ERROR_MESSAGE, API_CONNECTION_FAILED_MESSAGE } from "../constants/apiConstants";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
	const { setLoading, LoadingType } = useContext(LoadingContext);

	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);

	const [selectedCategoryId, setSelectedCategoryId] = useState(null);

	useEffect(() => {
		if (categories?.length && !selectedCategoryId) {
			setSelectedCategoryId(categories[0].id);
		}
	}, [categories, selectedCategoryId]);

	const hasFetched = useRef(false);

	async function createCategory(payload) {
		try {
			setLoading(LoadingType.OVERLAY);
			await categoryService.create(payload);
			await fetchCategories({ force: true });
		} catch (err) {
			if (err.message === API_CONNECTION_FAILED_MESSAGE) {
				setError(API_CONNECTION_ERROR_MESSAGE);
			}
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function fetchCategories({ force = false } = {}) {
		if (hasFetched.current && !force) return;

		try {
			setLoading(LoadingType.FULLSCREEN);
			setError(null);
			const data = await categoryService.getAll();
			setCategories(data);
			hasFetched.current = true;
		} catch (err) {
			setError(err.message === API_CONNECTION_FAILED_MESSAGE ? API_CONNECTION_ERROR_MESSAGE : err.message);
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function updateCategory(categoryId, payload) {
		try {
			setLoading(LoadingType.OVERLAY);
			await categoryService.update(categoryId, payload);
			await fetchCategories({ force: true });
		} catch (err) {
			if (err.message === API_CONNECTION_FAILED_MESSAGE) {
				setError(API_CONNECTION_ERROR_MESSAGE);
			}
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function deleteCategory(categoryId) {
		try {
			setLoading(LoadingType.OVERLAY);
			await categoryService.delete(categoryId);
			await fetchCategories({ force: true });
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
		fetchCategories();
	}, []);

	return (
		<CategoriesContext.Provider value={{ categories, error, createCategory, updateCategory, deleteCategory, selectedCategoryId, setSelectedCategoryId}}>
			{children}
		</CategoriesContext.Provider>
	);
}

export function useCategories() {
	const context = useContext(CategoriesContext);
	if (!context) throw new Error("useCategories must be used within a CategoriesProvider");
	return context;
}