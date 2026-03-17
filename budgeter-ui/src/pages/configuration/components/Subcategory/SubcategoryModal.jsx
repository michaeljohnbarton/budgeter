import styles from '../../../../styles/ModalForm.module.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSubcategories } from '../../../../contexts/SubcategoriesContext';
import { useMonthlyBalances } from '../../../../contexts/MonthlyBalancesContext';
import Modal from '../../../../commonComponents/modal/Modal';
import CurrencyField from "../../../../commonComponents/currencyField/CurrencyField";
import { MAX_RANK } from '../../../../utils/constants';

function SubcategoryModal({isOpen, setIsModalOpen, bankAccount, category, subcategoryData, setSubcategoryData}) {
	const { createSubcategory, updateSubcategory } = useSubcategories();
	const { monthlyBalances } = useMonthlyBalances();

	const isEditMode = subcategoryData != null;
	const title = isEditMode ? "Edit Subcategory" : "Add Subcategory";

	const [name, setName] = useState("");
	const [rank, setRank] = useState("");
	const [recalculateFutureBalances, setRecalculateFutureBalances] = useState(false);
	const [hasTransactions, setHasTransactions] = useState(false);
	const [defaultBudgetedAmountCents, setDefaultBudgetedAmountCents] = useState(null);
	const [defaultMonthlyBalance, setDefaultMonthlyBalance] = useState(null);
	const [touched, setTouched] = useState({
		name: false,
		rank: false
	});

	useEffect(() => {
		if (isEditMode && subcategoryData) {
			setName(subcategoryData.name);
			setRank(subcategoryData.rank ?? "");
			setRecalculateFutureBalances(subcategoryData.recalculateFutureBalances);
			setHasTransactions(subcategoryData.hasTransactions);

			const foundBalance = monthlyBalances.find(mb => mb.subcategoryId === subcategoryData.id && mb.monthId === 0);
			setDefaultBudgetedAmountCents(foundBalance ? foundBalance.budgetedAmountCents : null);
			setDefaultMonthlyBalance(foundBalance ?? null);
		}
	}, [isOpen]);

	const isNameSet = name !== "";
	const isRankValid = rank === "" || (rank >= 1 && rank <= MAX_RANK);
	const isFormValid = isNameSet && isRankValid;
	const hasUnsavedChanges = isEditMode
		? name !== subcategoryData.name || rank !== (subcategoryData.rank ?? "") || recalculateFutureBalances !== subcategoryData.recalculateFutureBalances || hasTransactions !== subcategoryData.hasTransactions || defaultBudgetedAmountCents !== (defaultMonthlyBalance?.budgetedAmountCents ?? null)
		: isNameSet || rank !== "" || recalculateFutureBalances || hasTransactions;
	
	const handleSave = async () => {
		try {
			if(isEditMode) {
				if(hasUnsavedChanges) {
					await updateSubcategory(
						subcategoryData.id,
						{
							name: name,
							rank: rank === "" ? null : rank,
							recalculateFutureBalances: recalculateFutureBalances,
							hasTransactions: hasTransactions
						},
						defaultMonthlyBalance,
						defaultBudgetedAmountCents
					);
					toast.success("Subcategory updated successfully");
				} else {
					toast.info("No changes to save");
				}
			}
			else {
				await createSubcategory(
					{
						name: name,
						rank: rank === "" ? null : rank,
						categoryId: category.id,
						recalculateFutureBalances: recalculateFutureBalances,
						hasTransactions: hasTransactions
					},
					defaultBudgetedAmountCents
				);
				toast.success("Subcategory created successfully");
			}
			handleClose();
		}
		catch (error) {
			let verb = isEditMode ? "update" : "create";
			toast.error(error.message || `Failed to ${verb} subcategory`);
		}
	};

	const handleClose = () => {
		setSubcategoryData(null);
		setName("");
		setRank("");
		setRecalculateFutureBalances(false);
		setHasTransactions(false);
		setDefaultBudgetedAmountCents(null);
		setTouched({
			name: false,
			rank: false
		});
		setIsModalOpen(false);
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} onSave={handleSave} isSaveEnabled={isFormValid} title={title} hasUnsavedChanges={hasUnsavedChanges}>
			<div className={styles.form}>
				<div className={styles.formGroup}>
					<label htmlFor="bankAccountName">Bank Account</label>
					<input type="text" id="bankAccountName" value={bankAccount.name} readOnly />
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="categoryName">Category</label>
					<input type="text" id="categoryName" value={category?.name} readOnly />
				</div>
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
					<label className={styles.checkboxLabel}>
						Recalculate Future Balances
						<input
							type="checkbox"
							checked={recalculateFutureBalances}
							onChange={(e) => { setRecalculateFutureBalances(e.target.checked);}}
						/>
					</label>
				</div>
				<div className={styles.formGroup}>
					<label className={styles.checkboxLabel}>
						Has Transactions
						<input
							type="checkbox"
							checked={hasTransactions}
							onChange={(e) => { setHasTransactions(e.target.checked);}}
						/>
					</label>
				</div>
				{ bankAccount.showBudgetedAmounts && (
					<div className={styles.formGroup}>
						<CurrencyField
							id="defaultBudgetedAmount"
							label="Default Budgeted Amount"
							centsValue={defaultBudgetedAmountCents}
							onChangeCents={setDefaultBudgetedAmountCents}
						/>
					</div>
				)}
			</div>
		</Modal>
	)
};

export default SubcategoryModal;