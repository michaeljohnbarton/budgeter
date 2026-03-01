import styles from './Categories.module.css';
import { useState, useEffect } from 'react';
import { useBankAccounts } from '../../../../contexts/BankAccountsContext';
import { useCategories } from '../../../../contexts/CategoriesContext';
import CategoryModal from './CategoryModal';
import DataTable from '../../../../commonComponents/dataTable/DataTable';

function Categories({ registerNewHandler }) {
	const { bankAccounts, selectedBankAccountId, setSelectedBankAccountId } = useBankAccounts();
	const { categories, deleteCategory } = useCategories();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [categoryData, setCategoryData] = useState(null);
	
	const selectedBankAccount = bankAccounts?.find(ba => ba.id === selectedBankAccountId) ?? null;
	const filteredCategories = categories?.filter(c => c.bankAccountId === selectedBankAccountId) ?? [];

	useEffect(() => {
		if(bankAccounts && bankAccounts.length > 0) {
			registerNewHandler(() => handleNewClick);
			return () => registerNewHandler(null); // Cleanup on unmount
		}
	}, [registerNewHandler, bankAccounts]);

	const handleNewClick = () => {
		setIsModalOpen(true);
	};

	if(!bankAccounts || bankAccounts.length === 0) {
		return <p>No bank accounts were found. Create one.</p>
	}

	return (
		<div className={styles.categoriesConfiguration}>
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

			{filteredCategories.length === 0 ? (
				<p>No categories were found for this bank account. Create one.</p>
			) : (
				<DataTable
					dataRecords={filteredCategories}
					dataRecordName="category"
					setDataRecord={setCategoryData}
					setIsModalOpen={setIsModalOpen}
					deleteDataRecord={deleteCategory}
				/>
			)}

			<CategoryModal
				isOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				bankAccount={selectedBankAccount}
				categoryData={categoryData}
				setCategoryData={setCategoryData}
			/>
		</div>
	)
}

export default Categories;