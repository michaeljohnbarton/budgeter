import styles from './BankAccounts.module.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useBankAccounts } from '../../../../contexts/BankAccountsContext';
import BankAccountModal from './BankAccountModal';
import DataTable from '../../../../commonComponents/dataTable/DataTable';

function BankAccounts({ registerNewHandler }) {
	const { bankAccounts, deleteBankAccount } = useBankAccounts();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [bankAccountData, setBankAccountData] = useState(null);

	useEffect(() => {
		registerNewHandler(() => handleNewClick);
		return () => registerNewHandler(null); // Cleanup on unmount
	}, [registerNewHandler]);

	const handleNewClick = () => {
		setIsModalOpen(true);
	};

	const handleEditClick = (bankAccount) => {
		setBankAccountData(bankAccount);
		setIsModalOpen(true);
	};

	const handleDeleteClick = async (bankAccountId) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this bank account? This action cannot be undone."
		);
		if (!confirmDelete) return;

		try {
			await deleteBankAccount(bankAccountId);
			toast.success("Bank account deleted successfully");
		}
		catch (error) {
			toast.error(error.message || "Failed to delete bank account");
		}
	};

	if (!bankAccounts || bankAccounts.length === 0) {
		return (
			<>
				<p>No bank accounts were found. Create one.</p>
				<BankAccountModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setBankAccountData={setBankAccountData} />
			</>
		);
	}

	return (
		<div className={styles.bankAccountsConfiguration}>
			<DataTable
				dataRecords={bankAccounts}
				handleDeleteClick={handleDeleteClick}
				handleEditClick={handleEditClick}
			/>
			<BankAccountModal
				isOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				bankAccountData={bankAccountData}
				setBankAccountData={setBankAccountData}
			/>
		</div>
	);
}

export default BankAccounts;
