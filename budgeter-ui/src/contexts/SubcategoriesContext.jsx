import { createContext, useContext, useState, useRef, useEffect } from "react";
import { LoadingContext } from "./LoadingContext";
import { subcategoryService } from "../services/subcategoryService";
import { API_CONNECTION_ERROR_MESSAGE, API_CONNECTION_FAILED_MESSAGE } from "../constants/apiConstants";

const SubcategoriesContext = createContext();

export function SubcategoriesProvider({ children }) {
	const { setLoading, LoadingType } = useContext(LoadingContext);

	const [subcategories, setSubcategories] = useState([]);
	const [error, setError] = useState(null);

	const hasFetched = useRef(false);

	async function createSubcategory(payload) {
		try {
			setLoading(LoadingType.OVERLAY);
			await subcategoryService.create(payload);
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

	async function updateSubcategory(subcategoryId, payload) {
		try {
			setLoading(LoadingType.OVERLAY);
			await subcategoryService.update(subcategoryId, payload);
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