import { createContext, useContext, useState } from "react";

const TransactionModalContext = createContext();

export function TransactionModalProvider({ children }) {
	const [isOpen, setIsOpen] = useState(false);
	const [initialValues, setInitialValues] = useState({
		bankAccountId: 0,
		categoryId: 0,
		subcategoryId: 0,
		readonly: {
			bankAccount: false,
			category: false,
			subcategory: false
		}
	});

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

	const closeModal = () => {
		setIsOpen(false);
		// Reset after modal closes
		setTimeout(() => {
			setInitialValues({
				bankAccountId: 0,
				categoryId: 0,
				subcategoryId: 0,
				readonly: {
					bankAccount: false,
					category: false,
					subcategory: false
				}
			});
		}, 300); // Match modal animation duration
	};

	return (
		<TransactionModalContext.Provider value={{ isOpen, setIsOpen, initialValues, openModal, openModalForNewTransactionInSubcategory, closeModal }}>
			{children}
		</TransactionModalContext.Provider>
	);
}

export function useTransactionModal() {
	const context = useContext(TransactionModalContext);
	if (!context) throw new Error("useTransactionModal must be used within a TransactionModalProvider");
	return context;
}
