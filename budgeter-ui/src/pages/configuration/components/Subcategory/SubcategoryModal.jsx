import styles from '../../../../styles/ModalForm.module.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSubcategories } from '../../../../contexts/SubcategoriesContext';
import Modal from '../../../../commonComponents/modal/Modal';

function SubcategoryModal({isOpen, setIsModalOpen, bankAccount, category, subcategoryData, setSubcategoryData}) {
	const { createSubcategory, updateSubcategory } = useSubcategories();

	const isEditMode = subcategoryData !== null && subcategoryData !== undefined;
	const title = isEditMode ? "Edit Subcategory" : "Add Subcategory";

	const [name, setName] = useState("");
	const [recalculateFutureBalances, setRecalculateFutureBalances] = useState(false);
	const [hasTransactions, setHasTransactions] = useState(false);
	const [touched, setTouched] = useState({
		name: false
	});

	useEffect(() => {
		if (isEditMode && subcategoryData) {
			setName(subcategoryData.name);
			setRecalculateFutureBalances(subcategoryData.recalculateFutureBalances);
			setHasTransactions(subcategoryData.hasTransactions);
		}
	}, [isOpen]);

	const isNameSet = name !== "";
	const isFormValid = isNameSet;
	const hasUnsavedChanges = isEditMode
		? name !== subcategoryData.name || recalculateFutureBalances !== subcategoryData.recalculateFutureBalances || hasTransactions !== subcategoryData.hasTransactions
		: isNameSet || recalculateFutureBalances || hasTransactions;
	
	const handleSave = async () => {
		try {
			if(isEditMode) {
				if(name !== subcategoryData.name || recalculateFutureBalances !== subcategoryData.recalculateFutureBalances || hasTransactions !== subcategoryData.hasTransactions) {
					await updateSubcategory(subcategoryData.id, { name: name, recalculateFutureBalances: recalculateFutureBalances, hasTransactions: hasTransactions });
					toast.success("Subcategory updated successfully");
				} else {
					toast.info("No changes to save");
				}
			}
			else {
				await createSubcategory({
					name: name,
					categoryId: category.id,
					recalculateFutureBalances: recalculateFutureBalances,
					hasTransactions: hasTransactions
				});
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
		setRecalculateFutureBalances(false);
		setHasTransactions(false);
		setTouched({
			name: false
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
			</div>
		</Modal>
	)
};

export default SubcategoryModal;