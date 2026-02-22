import styles from './Categories.module.css';
import { useState, useEffect } from 'react';
import { useBankAccounts } from '../../../../contexts/BankAccountsContext';
import CategoryModal from './CategoryModal';

function Categories({ registerNewHandler }) {
	const { bankAccounts } = useBankAccounts();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBankAccountId, setSelectedBankAccountId] = useState(bankAccounts && bankAccounts.length > 0 ? bankAccounts[0].id : null);
	const selectedBankAccount = bankAccounts && bankAccounts.length > 0 ? bankAccounts.find(ba => ba.id === selectedBankAccountId) : null;

	useEffect(() => {
		if(bankAccounts && bankAccounts.length > 0) {
			registerNewHandler(() => handleNewClick);
			return () => registerNewHandler(null); // Cleanup on unmount
		}
	}, [registerNewHandler]);

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
			<CategoryModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} bankAccount={selectedBankAccount} />
		</div>
	)
}

export default Categories;