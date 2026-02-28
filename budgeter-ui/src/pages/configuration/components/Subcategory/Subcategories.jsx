import styles from './Subcategories.module.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useBankAccounts } from '../../../../contexts/BankAccountsContext';
import { useCategories } from '../../../../contexts/CategoriesContext';
import { useSubcategories } from '../../../../contexts/SubcategoriesContext';
import SubcategoryModal from './SubcategoryModal';
import DataTable from '../../../../commonComponents/dataTable/DataTable';

function Subcategories({ registerNewHandler }) {
	const { bankAccounts, selectedBankAccountId, setSelectedBankAccountId } = useBankAccounts();
	const { categories, selectedCategoryId, setSelectedCategoryId } = useCategories();
	const { subcategories, deleteSubcategory } = useSubcategories();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [subcategoryData, setSubcategoryData] = useState(null);

	const hasBankAccounts = bankAccounts && bankAccounts.length > 0;
	const selectedBankAccount = bankAccounts?.find(ba => ba.id === selectedBankAccountId) ?? null;

	const filteredCategories = categories?.filter(c => c.bankAccountId === selectedBankAccountId) ?? [];
	const hasCategories = filteredCategories && filteredCategories.length > 0;
	const selectedCategory = filteredCategories?.find(c => c.id === selectedCategoryId) ?? null;

	const filteredSubcategories = subcategories?.filter(sc => sc.categoryId === selectedCategoryId) ?? [];
	const hasSubcategories = filteredSubcategories && filteredSubcategories.length > 0;

	useEffect(() => {
		if(hasBankAccounts && hasCategories) {
			registerNewHandler(() => handleNewClick);
			return () => registerNewHandler(null); // Cleanup on unmount
		}
	}, [registerNewHandler, hasBankAccounts, hasCategories]);

	useEffect(() => {
		if (hasCategories && selectedCategory === null) {
			setSelectedCategoryId(filteredCategories[0].id);
		}
	}, [hasCategories, selectedCategory]);

	const handleNewClick = () => {
		setIsModalOpen(true);
	};

	const handleEditClick = (subcategory) => {
		setSubcategoryData(subcategory);
		setIsModalOpen(true);
	};
	
	const handleDeleteClick = async (subcategoryId) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this subcategory? This action cannot be undone."
		);
		if (!confirmDelete) return;

		try {
			await deleteSubcategory(subcategoryId);
			toast.success("Subcategory deleted successfully");
		}
		catch (error) {
			toast.error(error.message || "Failed to delete subcategory");
		}
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
				<p>No categories were found for this bank account. Create one.</p>
			)}

			{ hasCategories && (
				<div className={styles.categoryWrapper}>
					<label htmlFor="categoryDropdown">Category:</label>
					<select id="categoryDropdown" className={styles.categoryDropdown} value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(Number(e.target.value))}>
						{
							filteredCategories.map((category) => (
								<option key={category.id} value={category.id}>{category.name}</option>
							))
						}
					</select>
				</div>
			)}

			{ hasCategories && !hasSubcategories && (
				<p>No subcategories were found for this category. Create one.</p>
			)}

			{ hasCategories && hasSubcategories && (
				<DataTable
					dataRecords={filteredSubcategories}
					handleDeleteClick={handleDeleteClick}
					handleEditClick={handleEditClick}
				/>
			)}

			<SubcategoryModal
				isOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				bankAccount={selectedBankAccount}
				category={selectedCategory}
				subcategoryData={subcategoryData}
				setSubcategoryData={setSubcategoryData}
			/>
		</div>
	)
}

export default Subcategories;