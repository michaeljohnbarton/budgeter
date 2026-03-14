import styles from '../../../../styles/ModalForm.module.css';
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useBankAccounts } from '../../../../contexts/BankAccountsContext';
import Modal from "../../../../commonComponents/modal/Modal";
import { MAX_RANK } from '../../../../utils/constants';

function BankAccountModal({ isOpen, setIsModalOpen, bankAccountData, setBankAccountData }) {
	const { createBankAccount, updateBankAccount } = useBankAccounts();

	const isEditMode = bankAccountData != null;
	const title = isEditMode ? "Edit Bank Account" : "Add Bank Account";

	const [name, setName] = useState("");
	const [rank, setRank] = useState("");
	const [monthlyBalancePropagationType, setMonthlyBalancePropagationType] = useState("");
	const [showBudgetedAmounts, setShowBudgetedAmounts] = useState(false);
	const [touched, setTouched] = useState({
		name: false,
		rank: false,
		monthlyBalancePropagationType: false
	});

	useEffect(() => {
		if (isEditMode && bankAccountData) {
			setName(bankAccountData.name);
			setRank(bankAccountData.rank ?? "");
			setMonthlyBalancePropagationType(bankAccountData.monthlyBalancePropagationType);
			setShowBudgetedAmounts(bankAccountData.showBudgetedAmounts);
		}
	}, [isOpen]);

	const isNameSet = name !== "";
	const isMonthlyBalancePropagationTypeSet = monthlyBalancePropagationType !== "";
	const isRankValid = rank === "" || (rank >= 1 && rank <= MAX_RANK);
	const isFormValid = isNameSet && isMonthlyBalancePropagationTypeSet && isRankValid;
	const hasUnsavedChanges = isEditMode
	 	? name !== bankAccountData.name || rank !== (bankAccountData.rank ?? "") || monthlyBalancePropagationType !== bankAccountData.monthlyBalancePropagationType || showBudgetedAmounts !== bankAccountData.showBudgetedAmounts
	 	: isNameSet || isMonthlyBalancePropagationTypeSet || rank !== "";

	const handleSave = async () => {
		try {
			if (isEditMode) {
				if(hasUnsavedChanges) {
					await updateBankAccount(
						bankAccountData.id,
						{
							name: name,
							rank: rank === "" ? null : rank,
							monthlyBalancePropagationType: monthlyBalancePropagationType,
							showBudgetedAmounts: showBudgetedAmounts
						}
					);
					toast.success("Bank account updated successfully");
				} else {
					toast.info("No changes to save");
				}
			} else {
				await createBankAccount({
					name: name,
					rank: rank === "" ? null : rank,
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
		setRank("");
		setMonthlyBalancePropagationType("");
		setShowBudgetedAmounts(false);
		setTouched({
			name: false,
			rank: false,
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
					<label htmlFor="rank">Rank</label>
					<input
						type="number"
						id="rank"
						min="1"
						max={MAX_RANK}
						value={rank}
						onChange={(e) => e.target.value ? setRank(Number(e.target.value)) : setRank("")}
						onBlur={() => setTouched((t) => ({ ...t, rank: true }))} />
					{touched.rank && !isRankValid && (
						<span className={styles.errorText}>Rank must be between 1 and {MAX_RANK} (inclusive)</span>
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