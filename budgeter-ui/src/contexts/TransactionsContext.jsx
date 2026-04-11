import { createContext, useContext, useState, useRef, useEffect } from "react";
import { LoadingContext } from "./LoadingContext";
import { transactionService } from "../services/transactionService";
import { API_CONNECTION_ERROR_MESSAGE, API_CONNECTION_FAILED_MESSAGE } from "../constants/apiConstants";

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
	const { setLoading, LoadingType } = useContext(LoadingContext);

	const [transactions, setTransactions] = useState([]);
	const [error, setError] = useState(null);

	const hasFetched = useRef(false);

	async function createTransaction(payload) {
		try {
			setLoading(LoadingType.OVERLAY);
			await transactionService.create(payload);
			await fetchTransactions({ force: true });
		} catch (err) {
			if (err.message === API_CONNECTION_FAILED_MESSAGE) {
				setError(API_CONNECTION_ERROR_MESSAGE);
			}
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function fetchTransactions({ force = false } = {}) {
		if (hasFetched.current && !force) return;

		try {
			setLoading(LoadingType.FULLSCREEN);
			setError(null);
			const data = await transactionService.getAll();
			setTransactions(data);
			hasFetched.current = true;
		} catch (err) {
			setError(err.message === API_CONNECTION_FAILED_MESSAGE ? API_CONNECTION_ERROR_MESSAGE : err.message);
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function updateTransaction(transactionId, payload) {
		try {
			setLoading(LoadingType.OVERLAY);
			await transactionService.update(transactionId, payload);
			await fetchTransactions({ force: true });
		} catch (err) {
			if (err.message === API_CONNECTION_FAILED_MESSAGE) {
				setError(API_CONNECTION_ERROR_MESSAGE);
			}
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function deleteTransaction(transactionId) {
		try {
			setLoading(LoadingType.OVERLAY);
			await transactionService.delete(transactionId);
			await fetchTransactions({ force: true });
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
		fetchTransactions();
	}, [])

	return (
		<TransactionsContext.Provider value={{ transactions, error, createTransaction, updateTransaction, deleteTransaction }}>
			{children}
		</TransactionsContext.Provider>
	);
}

export function useTransactions() {
	const context = useContext(TransactionsContext);
	if (!context) throw new Error("useTransactions must be used within a TransactionsProvider");
	return context;
}