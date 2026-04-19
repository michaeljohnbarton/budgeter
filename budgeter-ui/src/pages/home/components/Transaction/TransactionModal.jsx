import styles from '../../../../styles/ModalForm.module.css';
import Modal from "../../../../commonComponents/modal/Modal";
import { useState, useEffect } from 'react';
import { useBankAccounts } from '../../../../contexts/BankAccountsContext';
import { useCategories } from '../../../../contexts/CategoriesContext';
import { useSubcategories } from '../../../../contexts/SubcategoriesContext';
import { useTransactions } from '../../../../contexts/TransactionsContext';
import { useTransactionModal } from '../../../../contexts/TransactionModalContext';
import { useMonths } from '../../../../contexts/MonthsContext';
import CurrencyField from '../../../../commonComponents/currencyField/CurrencyField';
import { toast } from 'react-toastify';

function TransactionModal() {
	const { bankAccounts } = useBankAccounts();
	const { categories } = useCategories();
	const { subcategories } = useSubcategories();
	const { createTransaction, updateTransaction } = useTransactions();
	const { isOpen, closeModal, initialValues } = useTransactionModal();
	const { selectedMonthId } = useMonths();

	// As of the commit this comment was added, there is no path to opening the modal in edit mode any longer
	// but leaving for now in case we want to add that back.
	const isEditMode = initialValues.transactionId !== null;
	const title = isEditMode ? "Edit Transaction" : "Add Transaction";

	const [selectedBankAccountId, setSelectedBankAccountId] = useState(0);

	var categoriesForSelectedBankAccount = categories.filter(c => c.bankAccountId === selectedBankAccountId);
	const [selectedCategoryId, setSelectedCategoryId] = useState(0);

	var subcategoriesForSelectedCategory = subcategories.filter(sc => sc.categoryId === selectedCategoryId && sc.hasTransactions);
	const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(0);

	// Initialize form with context values when modal opens
	useEffect(() => {
		if (isOpen && initialValues.bankAccountId !== 0) {
			setSelectedBankAccountId(initialValues.bankAccountId);
			setSelectedCategoryId(initialValues.categoryId);
			setSelectedSubcategoryId(initialValues.subcategoryId);
			setDescription(initialValues.description);
			setIsCredit(initialValues.isCredit);
			setAmountCents(initialValues.amountCents);
		}
	}, [isOpen, initialValues]);

	useEffect(() => {
		if(selectedBankAccountId !== 0) {
			categoriesForSelectedBankAccount = categories.filter(c => c.bankAccountId === selectedBankAccountId);
			// Only reset category if not coming from initial values
			if (initialValues.bankAccountId !== selectedBankAccountId) {
				setSelectedCategoryId(0);
				setTouched((t) => ({ ...t, category: false, subcategory: false }));
			}
		}
	}, [selectedBankAccountId, bankAccounts]);

	useEffect(() => {
		if(selectedCategoryId !== 0) {
			subcategoriesForSelectedCategory = subcategories.filter(sc => sc.categoryId === selectedCategoryId && sc.hasTransactions);
			// Only reset subcategory if not coming from initial values
			if (initialValues.categoryId !== selectedCategoryId) {
				setSelectedSubcategoryId(0);
				setTouched((t) => ({ ...t, subcategory: false }));
			}
		}
	}, [selectedCategoryId, categories])

	const [description, setDescription] = useState("");
	const [isCredit, setIsCredit] = useState(false);
	const [amountCents, setAmountCents] = useState(null);
	const [touched, setTouched] = useState ({
		bankAccount: false,
		category: false,
		subcategory: false,
		description: false,
		amountCents: false
	});

	const isBankAccountSelected = selectedBankAccountId !== 0;
	const isCategorySelected = selectedCategoryId !== 0;
	const isSubcategorySelected = selectedSubcategoryId !== 0;
	const isDescriptionSet = description !== "";
	const isAmountCentsSet = amountCents !== null;
	const hasUnsavedChanges =
		(!initialValues.readonly.bankAccount && isBankAccountSelected)
		|| (!initialValues.readonly.category && isCategorySelected)
		|| (!initialValues.readonly.subcategory && isSubcategorySelected)
		|| (isEditMode ? description !== initialValues.description : isDescriptionSet)
		|| (isEditMode ? isCredit !== initialValues.isCredit : isCredit)
		|| (isEditMode ? amountCents !== initialValues.amountCents : isAmountCentsSet);
	const isFormValid = isBankAccountSelected && isCategorySelected && isSubcategorySelected && isDescriptionSet && isAmountCentsSet;

	const handleSave = async () => {
		try {
			if (isEditMode) {
				if(hasUnsavedChanges) {
					await updateTransaction(
						initialValues.transactionId,
						{
							description: description,
							isCredit: isCredit,
							amountCents: amountCents,
						}
					);
					toast.success("Transaction updated successfully");
				} else {
					toast.info("No changes to save");
				}
			} else {
				await createTransaction(
					{
						description: description,
						isCredit: isCredit,
						amountCents: amountCents,
						monthId: selectedMonthId,
						subcategoryId: selectedSubcategoryId
					}
				);
				toast.success("Transaction created successfully");
			}
			handleClose();
		}
		catch (error) {
			let verb = isEditMode ? "update" : "create";
			toast.error(error.message || `Failed to ${verb} transaction`);
		}
	};

	const handleClose = () => {
		setSelectedBankAccountId(0);
		setSelectedCategoryId(0);
		setSelectedSubcategoryId(0);
		setDescription("");
		setIsCredit(false);
		setAmountCents(null);
		setTouched({
			bankAccount: false,
			category: false,
			subcategory: false,
			description: false,
			amountCents: false
		})
		closeModal();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} onSave={handleSave} isSaveEnabled={isFormValid} title={title} hasUnsavedChanges={hasUnsavedChanges}>
			<div className={styles.form}>
				{
					bankAccounts.length > 0
						? ( 
							<div className={styles.formGroup}>
								<label htmlFor="bankAccount" className={styles.requiredLabel}>Bank Account</label>
								<select
									id="bankAccount"
									value={selectedBankAccountId}
									onChange={(e) => setSelectedBankAccountId(Number(e.target.value))}
									onBlur={() => setTouched((t) => ({ ...t, bankAccount: true }))}
									disabled={initialValues.readonly.bankAccount}
								>
									<option value={0}>-- Select Bank Account --</option>
									{
										bankAccounts.map(bankAccount => <option key={bankAccount.id} value={bankAccount.id}>{bankAccount.name}</option>)
									}
								</select>
								{touched.bankAccount && !isBankAccountSelected && (
									<span className={styles.errorText}>This field is required</span>
								)}
							</div>
						) : (
							<>No bank accounts were found. Create one.</>
						)
				}
				{
					bankAccounts.length > 0 && categoriesForSelectedBankAccount.length > 0
						? (
							<div className={styles.formGroup}>
								<label htmlFor="category" className={styles.requiredLabel}>Category</label>
								<select
									id="category"
									value={selectedCategoryId}
									onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
									onBlur={() => setTouched((t) => ({ ...t, category: true }))}
									disabled={initialValues.readonly.category}
								>
									<option value={0}>-- Select Category --</option>
									{
										categoriesForSelectedBankAccount.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
									}
								</select>
								{touched.category && !isCategorySelected && (
									<span className={styles.errorText}>This field is required</span>
								)}
							</div>
						) : (
							<p>{bankAccounts.length > 0 && isBankAccountSelected && "No categories were found for the selected bank account. Create one."}</p>
						)
				}
				{
					bankAccounts.length > 0 && categoriesForSelectedBankAccount.length > 0 && subcategoriesForSelectedCategory.length > 0
						? (
							<div className={styles.formGroup}>
								<label htmlFor="subcategory" className={styles.requiredLabel}>Subcategory</label>
								<select
									id="subcategory"
									value={selectedSubcategoryId}
									onChange={(e) => setSelectedSubcategoryId(Number(e.target.value))}
									onBlur={() => setTouched((t) => ({ ...t, subcategory: true }))}
									disabled={initialValues.readonly.subcategory}
								>
									<option value={0}>-- Select Subcategory --</option>
									{
										subcategoriesForSelectedCategory.map(subcategory => <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>)
									}
								</select>
								{touched.subcategory && !isSubcategorySelected && (
									<span className={styles.errorText}>This field is required</span>
								)}
							</div>
						) : (
							<p>{bankAccounts.length > 0 && categoriesForSelectedBankAccount.length > 0 && isCategorySelected && "No subcategories (or subcategories allowing transactions) were found for the selected category. Create one."}</p>
						)
				}
				{
					bankAccounts.length > 0 && categoriesForSelectedBankAccount.length > 0 && subcategoriesForSelectedCategory.length > 0 && (
						<>
							<div className={styles.formGroup}>
								<label htmlFor="description" className={styles.requiredLabel}>Description</label>
								<input
									type="text"
									id="description"
									maxLength="100"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									onBlur={() => setTouched((t) => ({ ...t, description: true }))}
									required />
								{touched.description && !isDescriptionSet && (
									<span className={styles.errorText}>This field is required</span>
								)}
							</div>
							<div className={styles.formGroup}>
								<label className={styles.checkboxLabel}>
									Is Credit
									<input
										type="checkbox"
										checked={isCredit}
										onChange={(e) => { setIsCredit(e.target.checked);}}
									/>
								</label>
							</div>
							<div className={styles.formGroup}>
								<CurrencyField
									id="amount"
									label="Amount"
									centsValue={amountCents}
									onChangeCents={setAmountCents}
									required={true}
									setTouched={() => setTouched((t) => ({...t, amountCents: true}))}
								/>
								{touched.amountCents && !isAmountCentsSet && (
									<span className={styles.errorText}>This field is required</span>
								)}
							</div>
						</>
					)
				}
			</div>
		</Modal>
	);
}

export default TransactionModal;