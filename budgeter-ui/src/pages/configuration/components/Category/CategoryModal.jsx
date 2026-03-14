import styles from '../../../../styles/ModalForm.module.css';
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useCategories } from '../../../../contexts/CategoriesContext';
import Modal from '../../../../commonComponents/modal/Modal';
import { MAX_RANK } from '../../../../utils/constants';

function CategoryModal({isOpen, setIsModalOpen, bankAccount, categoryData, setCategoryData}) {
	const { createCategory, updateCategory } = useCategories();

	const isEditMode = categoryData != null;
	const title = isEditMode ? "Edit Category" : "Add Category";

	const [name, setName] = useState("");
	const [rank, setRank] = useState("");
	const [isCredit, setIsCredit] = useState(false);
	const [touched, setTouched] = useState({
		name: false,
		rank: false
	});

	useEffect(() => {
		if (isEditMode && categoryData) {
			setName(categoryData.name);
			setRank(categoryData.rank ?? "");
			setIsCredit(categoryData.isCredit);
		}
	}, [isOpen]);

	const isNameSet = name !== "";
	const isRankValid = rank === "" || (rank >= 1 && rank <= MAX_RANK);
	const isFormValid = isNameSet && isRankValid;
	const hasUnsavedChanges = isEditMode
		? name !== categoryData.name || rank !== (categoryData.rank ?? "") || isCredit !== categoryData.isCredit
		: isNameSet || isCredit || rank !== "";

	const handleSave = async () => {
		try {
			if(isEditMode) {
				if(name !== categoryData.name || rank !== (categoryData.rank ?? "") || isCredit !== categoryData.isCredit) {
					await updateCategory(categoryData.id, { name: name, rank: rank === "" ? null : rank, isCredit: isCredit });
					toast.success("Category updated successfully");
				} else {
					toast.info("No changes to save");
				}
			}
			else {
				await createCategory({
					name: name,
					rank: rank === "" ? null : rank,
					bankAccountId: bankAccount.id,
					isCredit: isCredit
				});
				toast.success("Category created successfully");
			}
			handleClose();
		}
		catch (error) {
			let verb = isEditMode ? "update" : "create";
			toast.error(error.message || `Failed to ${verb} category`);
		}
	};

	const handleClose = () => {
		setCategoryData(null);
		setName("");
		setRank("");
		setIsCredit(false);
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
							Is Credit
							<input
								type="checkbox"
								checked={isCredit}
								onChange={(e) => { setIsCredit(e.target.checked);}}
							/>
						</label>
					</div>
			</div>
		</Modal>
	)
};

export default CategoryModal;