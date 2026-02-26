import styles from './Subcategories.module.css';
import { useState, useEffect } from 'react';
import { useBankAccounts } from '../../../../contexts/BankAccountsContext';
import { useCategories } from '../../../../contexts/CategoriesContext';
import SubcategoryModal from './SubcategoryModal';

function Subcategories({ registerNewHandler }) {
	const { bankAccounts, selectedBankAccountId, setSelectedBankAccountId } = useBankAccounts();
	const { categories, selectedCategoryId, setSelectedCategoryId } = useCategories();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const hasBankAccounts = bankAccounts && bankAccounts.length > 0;

	const selectedBankAccountCategories = categories?.filter(c => c.bankAccountId === selectedBankAccountId) ?? [];
	const hasCategories = selectedBankAccountCategories && selectedBankAccountCategories.length > 0;

	useEffect(() => {
		if(hasBankAccounts && hasCategories) {
			registerNewHandler(() => handleNewClick);
			return () => registerNewHandler(null); // Cleanup on unmount
		}
	}, [registerNewHandler, bankAccounts, selectedBankAccountCategories]);

	const handleNewClick = () => {
		setIsModalOpen(true);
	};

	if(!hasBankAccounts) {
		return <p>No bank accounts were found. Create one.</p>
	}

	return (
		<div className={styles.subcategoriesConfiguration}>
			<div className={styles.bankAccountWrapper}>
				<label htmlFor="bankAccountDropdown">Bank Account:</label>
				<select id="bankAccountDropdown" className={styles.bankAccountDropdown} value={selectedBankAccountId} onChange={(e) => setSelectedBankAccountId(Number(e.target.value))}>
					{
						bankAccounts.map((bankAccount) => (
							<option key={bankAccount.id} value={bankAccount.id}>{bankAccount.name}</option>
						))
					}
				</select>
			</div>

			{ !hasCategories && (
				<p className={styles.emptyMessage}>No categories were found for this bank account. Create one.</p>
			)}

			{ hasCategories && (
				<div className={styles.categoryWrapper}>
					<label htmlFor="categoryDropdown">Category:</label>
					<select id="categoryDropdown" className={styles.categoryDropdown} value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(Number(e.target.value))}>
						{
							selectedBankAccountCategories.map((category) => (
								<option key={category.id} value={category.id}>{category.name}</option>
							))
						}
					</select>
				</div>
			)}

			<SubcategoryModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
		</div>
	)
}

export default Subcategories;