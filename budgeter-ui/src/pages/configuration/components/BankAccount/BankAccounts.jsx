import styles from './BankAccounts.module.css';
import { useEffect, useState } from 'react';
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
				dataRecordName="bank account"
				setDataRecord={setBankAccountData}
				setIsModalOpen={setIsModalOpen}
				deleteDataRecord={deleteBankAccount}
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
