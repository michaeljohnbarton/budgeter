import styles from './CategoryModal.module.css';
import { useState } from "react";
import { toast } from 'react-toastify';
import { useCategories } from '../../../../contexts/CategoriesContext';
import Modal from '../../../../commonComponents/modal/Modal';

function CategoryModal({isOpen, setIsModalOpen, bankAccount}) {
	const { createCategory } = useCategories();

	const isEditMode = false;
	const title = isEditMode ? "Edit Category" : "Add Category";

	const [name, setName] = useState("");
	const [isCredit, setIsCredit] = useState(false);
	const [touched, setTouched] = useState({
		name: false
	});

	const isNameSet = name !== "";
	const isFormValid = isNameSet;
	const hasUnsavedChanges = isEditMode
		? false
		: isNameSet || isCredit;

	const handleSave = async () => {
		try {
			if(isEditMode) {
				toast.info("Not yet implemented");
			}
			else {
				await createCategory({
					name: name,
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
		setName("");
		setIsCredit(false);
		setTouched({
			name: false
		});
		setIsModalOpen(false);
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} onSave={handleSave} isSaveEnabled={isFormValid} title={title} hasUnsavedChanges={hasUnsavedChanges}>
			<div className={styles.categoryForm}>
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