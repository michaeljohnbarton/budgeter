import styles from './BankAccounts.module.css';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import clsx from 'clsx';
import { useBankAccounts } from '../../../../contexts/BankAccountsContext';
import BankAccountModal from './BankAccountModal';

function BankAccounts({ registerNewHandler }) {
	const { bankAccounts } = useBankAccounts();
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
			<div className={styles.tableWrapper}>
				<table className={styles.bankAccountsTable}>
					<tbody>
						{bankAccounts.map((bankAccount) => (
							<tr key={bankAccount.id}>
								<td>{bankAccount.name}</td>
								<td className="actions">
									{/* Delete and edit ordered this way because of float right CSS */}
									<button
										className={clsx(styles.iconButton, styles.delete)}
										// onClick={() => handleDeleteClick(month.id)}
										aria-label="Delete"
									>
										<FaTrash />
									</button>

									<button
										className={clsx(styles.iconButton, styles.edit)}
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
