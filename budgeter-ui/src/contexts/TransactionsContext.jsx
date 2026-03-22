import { createContext, useContext, useState } from "react";
import { LoadingContext } from "./LoadingContext";
import { transactionService } from "../services/transactionService";
import { API_CONNECTION_ERROR_MESSAGE, API_CONNECTION_FAILED_MESSAGE } from "../constants/apiConstants";

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
	const { setLoading, LoadingType } = useContext(LoadingContext);

	const [error, setError] = useState(null);

	async function createTransaction(payload) {
		try {
			setLoading(LoadingType.OVERLAY);
			await transactionService.create(payload);
		} catch (err) {
			if (err.message === API_CONNECTION_FAILED_MESSAGE) {
				setError(API_CONNECTION_ERROR_MESSAGE);
			}
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	return (
		<TransactionsContext.Provider value={{ error, createTransaction }}>
			{children}
		</TransactionsContext.Provider>
	);
}

export function useTransactions() {
	const context = useContext(TransactionsContext);
	if (!context) throw new Error("useTransactions must be used within a TransactionsProvider");
	return context;
}