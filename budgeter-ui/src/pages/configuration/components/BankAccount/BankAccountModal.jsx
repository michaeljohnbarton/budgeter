import styles from '../../../../styles/ModalForm.module.css';
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useBankAccounts } from '../../../../contexts/BankAccountsContext';
import Modal from "../../../../commonComponents/modal/Modal";

function BankAccountModal({ isOpen, setIsModalOpen, bankAccountData, setBankAccountData }) {
	const { createBankAccount, updateBankAccount } = useBankAccounts();

	const isEditMode = bankAccountData != null;
	const title = isEditMode ? "Edit Bank Account" : "Add Bank Account";

	const [name, setName] = useState("");
	const [monthlyBalancePropagationType, setMonthlyBalancePropagationType] = useState("");
	const [showBudgetedAmounts, setShowBudgetedAmounts] = useState(false);
	const [touched, setTouched] = useState({
		name: false,
		monthlyBalancePropagationType: false
	});

	useEffect(() => {
		if (isEditMode && bankAccountData) {
			setName(bankAccountData.name);
			setMonthlyBalancePropagationType(bankAccountData.monthlyBalancePropagationType);
			setShowBudgetedAmounts(bankAccountData.showBudgetedAmounts);
		}
	}, [isOpen]);

	const isNameSet = name !== "";
	const isMonthlyBalancePropagationTypeSet = monthlyBalancePropagationType !== "";
	const isFormValid = isNameSet && isMonthlyBalancePropagationTypeSet;
	const hasUnsavedChanges = isEditMode
	 	? name !== bankAccountData.name || monthlyBalancePropagationType !== bankAccountData.monthlyBalancePropagationType || showBudgetedAmounts !== bankAccountData.showBudgetedAmounts
	 	: isNameSet || isMonthlyBalancePropagationTypeSet;

	const handleSave = async () => {
		try {
			if (isEditMode) {
				if(name !== bankAccountData.name || monthlyBalancePropagationType !== bankAccountData.monthlyBalancePropagationType || showBudgetedAmounts !== bankAccountData.showBudgetedAmounts) {
					await updateBankAccount(bankAccountData.id, { name: name, monthlyBalancePropagationType: monthlyBalancePropagationType, showBudgetedAmounts: showBudgetedAmounts });
					toast.success("Bank account updated successfully");
				} else {
					toast.info("No changes to save");
				}
			} else {
				await createBankAccount({
					name: name,
					monthlyBalancePropagationType: monthlyBalancePropagationType,
					showBudgetedAmounts: showBudgetedAmounts
				});
				toast.success("Bank account created successfully");
			}
			handleClose();
		}
		catch (error) {
			let verb = isEditMode ? "update" : "create";
			toast.error(error.message || `Failed to ${verb} bank account`);
		}
	};

	const handleClose = () => {
		setBankAccountData(null);
		setName("");
		setMonthlyBalancePropagationType("");
		setShowBudgetedAmounts(false);
		setTouched({
			name: false,
			monthlyBalancePropagationType: false
		});
		setIsModalOpen(false);
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} onSave={handleSave} isSaveEnabled={isFormValid} title={title} hasUnsavedChanges={hasUnsavedChanges}>
			<div className={styles.form}>
				<div className={styles.formGroup}>
					<label htmlFor="name" className={styles.requiredLabel}>Name</label>
					<input
						type="text"
						id="name"
						maxLength="100"
						value={name}
						onChange={(e) => setName(e.target.value)}
						onBlur={() => setTouched((t) => ({ ...t, name: true }))}
						required />
					{touched.name && !isNameSet && (
						<span className={styles.errorText}>This field is required</span>
					)}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="monthlyBalancePropagationTypeDropdown" className={styles.requiredLabel}>Monthly Balance Propagation Type</label>
					<select
						id="monthlyBalancePropagationTypeDropdown"
						value={monthlyBalancePropagationType}
						onChange={(e) => setMonthlyBalancePropagationType(e.target.value)}
						onBlur={() => setTouched((t) => ({ ...t, monthlyBalancePropagationType: true }))}
						required >
						<option value="">-- Select Monthly Balance Propagation Type --</option>
						<option value="BankAccount">Bank Account</option>
						<option value="Subcategory">Subcategory</option>
					</select>
					{touched.monthlyBalancePropagationType && !isMonthlyBalancePropagationTypeSet && (
						<span className={styles.errorText}>This field is required</span>
					)}
				</div>
				<div className={styles.formGroup}>
					<label className={styles.checkboxLabel}>
						Show Budgeted Amounts
						<input
							type="checkbox"
							checked={showBudgetedAmounts}
							onChange={(e) => { setShowBudgetedAmounts(e.target.checked);}}
						/>
					</label>
				</div>
			</div>
		</Modal>
	);
}

export default BankAccountModal;