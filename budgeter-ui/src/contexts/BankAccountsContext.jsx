import { createContext, useContext, useState, useRef, useEffect } from "react";
import { LoadingContext } from "./LoadingContext";
import { bankAccountService } from "../services/bankAccountService";
import { sortByRankThenName } from "../utils/sortUtils";
import { API_CONNECTION_ERROR_MESSAGE, API_CONNECTION_FAILED_MESSAGE } from "../constants/apiConstants";

const BankAccountsContext = createContext();

export function BankAccountsProvider({ children }) {
	const { setLoading, LoadingType } = useContext(LoadingContext);

	const [bankAccounts, setBankAccounts] = useState([]);
	const [error, setError] = useState(null);
	const [selectedBankAccountId, setSelectedBankAccountId] = useState(null);

	useEffect(() => {
		if (bankAccounts?.length && !selectedBankAccountId) {
			setSelectedBankAccountId(bankAccounts[0].id);
		}
	}, [bankAccounts, selectedBankAccountId]);

	const hasFetched = useRef(false);

	async function createBankAccount(payload) {
		try {
			setLoading(LoadingType.OVERLAY);
			await bankAccountService.create(payload);
			await fetchBankAccounts({ force: true });
		} catch (err) {
			if (err.message === API_CONNECTION_FAILED_MESSAGE) {
				setError(API_CONNECTION_ERROR_MESSAGE);
			}
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function fetchBankAccounts({ force = false } = {}) {
		if (hasFetched.current && !force) return;

		try {
			setLoading(LoadingType.FULLSCREEN);
			setError(null);
			const data = await bankAccountService.getAll();
			const sortedData = sortByRankThenName(data);
			setBankAccounts(sortedData);
			hasFetched.current = true;
		} catch (err) {
			setError(err.message === API_CONNECTION_FAILED_MESSAGE ? API_CONNECTION_ERROR_MESSAGE : err.message);
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function updateBankAccount(bankAccountId, payload) {
		try {
			setLoading(LoadingType.OVERLAY);
			await bankAccountService.update(bankAccountId, payload);
			await fetchBankAccounts({ force: true });
		} catch (err) {
			if (err.message === API_CONNECTION_FAILED_MESSAGE) {
				setError(API_CONNECTION_ERROR_MESSAGE);
			}
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function deleteBankAccount(bankAccountId) {
		try {
			setLoading(LoadingType.OVERLAY);
			await bankAccountService.delete(bankAccountId);
			await fetchBankAccounts({ force: true });
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
		fetchBankAccounts();
	}, []);

	return (
		<BankAccountsContext.Provider value={{ bankAccounts, error, createBankAccount, updateBankAccount, deleteBankAccount, selectedBankAccountId, setSelectedBankAccountId }}>
			{children}
		</BankAccountsContext.Provider>
	);
}

export function useBankAccounts() {
	const context = useContext(BankAccountsContext);
	if (!context) throw new Error("useBankAccounts must be used within a BankAccountsProvider");
	return context;
}