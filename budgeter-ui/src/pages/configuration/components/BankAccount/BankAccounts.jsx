import styles from './BankAccounts.module.css';
import tableStyles from '../../../../styles/DataTable.module.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import clsx from 'clsx';
import { useBankAccounts } from '../../../../contexts/BankAccountsContext';
import BankAccountModal from './BankAccountModal';

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
			<div className={tableStyles.tableWrapper}>
				<table className={tableStyles.table}>
					<tbody>
						{bankAccounts.map((bankAccount) => (
							<tr key={bankAccount.id}>
								<td>{bankAccount.name}</td>
								<td>
									{/* Delete and edit ordered this way because of float right CSS */}
									<button
										className={clsx(tableStyles.iconButton, tableStyles.delete)}
										onClick={() => handleDeleteClick(bankAccount.id)}
										aria-label="Delete"
									>
										<FaTrash />
									</button>

									<button
										className={clsx(tableStyles.iconButton, tableStyles.edit)}
										onClick={() => handleEditClick(bankAccount)}
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
			<BankAccountModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} bankAccountData={bankAccountData} setBankAccountData={setBankAccountData} />
		</div>
	);
}

export default BankAccounts;
