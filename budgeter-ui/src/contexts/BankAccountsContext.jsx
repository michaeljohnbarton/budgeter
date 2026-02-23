import { createContext, useContext, useState, useRef, useEffect } from "react";
import { LoadingContext } from "./LoadingContext";

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

			const response = await fetch("http://localhost:60060/api/BankAccount", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});

			if (!response.ok)
			{
				const responseData = await response.text();
				throw new Error(responseData || "Failed to create bank account");
			}

			await fetchBankAccounts({ force: true });
		} catch (err) {
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function fetchBankAccounts({ force = false } = {}) {
		if (hasFetched.current && !force) return;

		try {
			setLoading(LoadingType.FULLSCREEN);

			const response = await fetch("http://localhost:60060/api/BankAccount");
			if (!response.ok) throw new Error("Failed to fetch bank accounts");

			const data = await response.json();
			setBankAccounts(data);
			hasFetched.current = true;
		} catch (err) {
			setError(err.message === "Failed to fetch" ? "Could not connect to the API." : err.message);
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function updateBankAccount(bankAccountId, payload) {
		try {
			setLoading(LoadingType.OVERLAY);

			const response = await fetch(`http://localhost:60060/api/BankAccount/${bankAccountId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});

			if (!response.ok)
			{
				const responseData = await response.text();
				throw new Error(responseData || "Failed to update bank account");
			}

			await fetchBankAccounts({ force: true });
		} catch (err) {
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	async function deleteBankAccount(bankAccountId) {
		try {
			setLoading(LoadingType.OVERLAY);

			const response = await fetch(`http://localhost:60060/api/BankAccount/${bankAccountId}`, {
				method: "DELETE"
			});

			if (!response.ok)
			{
				const responseData = await response.text();
				throw new Error(responseData || "Failed to delete bank account");
			}

			await fetchBankAccounts({ force: true });
		} catch (err) {
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