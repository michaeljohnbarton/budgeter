import { createContext, useContext, useState } from "react";
import { LoadingContext } from "./LoadingContext";

const BankAccountsContext = createContext();

export function BankAccountsProvider({ children }) {
	const { setLoading, LoadingType } = useContext(LoadingContext);

	const [bankAccounts, setBankAccounts] = useState([]);
	const [error, setError] = useState(null);

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
		} catch (err) {
			throw err;
		} finally {
			setLoading(LoadingType.NONE);
		}
	}

	return (
		<BankAccountsContext.Provider value={{ bankAccounts, error, createBankAccount }}>
			{children}
		</BankAccountsContext.Provider>
	);
}

export function useBankAccounts() {
	const context = useContext(BankAccountsContext);
	if (!context) throw new Error("useBankAccounts must be used within a BankAccountsProvider");
	return context;
}