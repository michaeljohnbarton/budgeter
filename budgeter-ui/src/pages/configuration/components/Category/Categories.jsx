import styles from './Categories.module.css';
import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import clsx from 'clsx';
import { useBankAccounts } from '../../../../contexts/BankAccountsContext';
import { useCategories } from '../../../../contexts/CategoriesContext';
import CategoryModal from './CategoryModal';

function Categories({ registerNewHandler }) {
	const { bankAccounts, selectedBankAccountId, setSelectedBankAccountId } = useBankAccounts();
	const { categories } = useCategories();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [categoryData, setCategoryData] = useState(null);
	
	const selectedBankAccount = bankAccounts?.find(ba => ba.id === selectedBankAccountId) ?? null;
	const selectedBankAccountCategories = categories?.filter(c => c.bankAccountId === selectedBankAccountId) ?? [];

	useEffect(() => {
		if(bankAccounts && bankAccounts.length > 0) {
			registerNewHandler(() => handleNewClick);
			return () => registerNewHandler(null); // Cleanup on unmount
		}
	}, [registerNewHandler, bankAccounts]);

	const handleNewClick = () => {
		setIsModalOpen(true);
	};

	const handleEditClick = (category) => {
		setCategoryData(category);
		setIsModalOpen(true);
	};

	const handleDeleteClick = (categoryId) => {

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

			{selectedBankAccountCategories.length === 0 ? (
				<p className={styles.emptyMessage}>No categories were found for this bank account. Create one.</p>
			) : (
				<div className={styles.tableWrapper}>
					<table className={styles.categoriesTable}>
						<tbody>
							{selectedBankAccountCategories.map((category) => (
								<tr key={category.id}>
									<td>{category.name}</td>
									<td>
										{/* Delete and edit ordered this way because of float right CSS */}
										<button
											className={clsx(styles.iconButton, styles.delete)}
											onClick={() => handleDeleteClick(category.id)}
											aria-label="Delete"
										>
											<FaTrash />
										</button>

										<button
											className={clsx(styles.iconButton, styles.edit)}
											onClick={() => handleEditClick(category)}
											aria-label="Edit"
										>
											<FaEdit />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			<CategoryModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} bankAccount={selectedBankAccount} categoryData={categoryData} setCategoryData={setCategoryData} />
		</div>
	)
}

export default Categories;