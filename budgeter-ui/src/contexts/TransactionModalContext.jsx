import { createContext, useContext, useState } from "react";

const TransactionModalContext = createContext();

export function TransactionModalProvider({ children }) {
	const initialValuesTemplate = {
		transactionId: null,
		bankAccountId: 0,
		categoryId: 0,
		subcategoryId: 0,
		description: "",
		isCredit: false,
		amountCents: null,
		readonly: {
			bankAccount: false,
			category: false,
			subcategory: false
		}
	};

	const [isOpen, setIsOpen] = useState(false);
	const [initialValues, setInitialValues] = useState(initialValuesTemplate);

	const openModal = () => {
		setIsOpen(true);
	};

	const openModalForNewTransactionInSubcategory = (bankAccountId, categoryId, subcategoryId) => {
		setInitialValues({
			bankAccountId,
			categoryId,
			subcategoryId,
			readonly: {
				bankAccount: true,
				category: true,
				subcategory: true
			}
		});
		setIsOpen(true);
	};

	const openModalForExistingTransaction = (transaction) => {
		setInitialValues({
			transactionId: transaction.id,
			bankAccountId: transaction.bankAccountId,
			categoryId: transaction.categoryId,
			subcategoryId: transaction.subcategoryId,
			description: transaction.description,
			isCredit: transaction.isCredit,
			amountCents: transaction.amountCents,
			readonly: {
				bankAccount: true,
				category: true,
				subcategory: true
			}
		});
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		// Reset after modal closes
		setTimeout(() => {
			setInitialValues(initialValuesTemplate);
		}, 300); // Match modal animation duration
	};

	return (
		<TransactionModalContext.Provider value={{ isOpen, setIsOpen, initialValues, openModal, openModalForNewTransactionInSubcategory, openModalForExistingTransaction, closeModal }}>
			{children}
		</TransactionModalContext.Provider>
	);
}

export function useTransactionModal() {
	const context = useContext(TransactionModalContext);
	if (!context) throw new Error("useTransactionModal must be used within a TransactionModalProvider");
	return context;
}
