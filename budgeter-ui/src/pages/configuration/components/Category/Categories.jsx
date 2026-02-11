import styles from './Categories.module.css';
import { useState } from 'react';
import { useBankAccounts } from '../../../../contexts/BankAccountsContext';

function Categories() {
	const { bankAccounts } = useBankAccounts();

	const [selectedBankAccount, setSelectedBankAccount] = useState(bankAccounts && bankAccounts.length > 0 ? bankAccounts[0].id : null);

	if(!bankAccounts || bankAccounts.length === 0) {
		return <p>No bank accounts were found. Create one.</p>
	}

	return (
		<div className={styles.categoriesConfiguration}>
			<div className={styles.bankAccountWrapper}>
				<label htmlFor="bankAccountDropdown">Bank Account:</label>
				<select id="bankAccountDropdown" className={styles.bankAccountDropdown} value={selectedBankAccount} onChange={(e) => setSelectedBankAccount(e.target.value)}>
					{
						bankAccounts.map((bankAccount) => (
							<option key={bankAccount.id} value={bankAccount.id}>{bankAccount.name}</option>
						))
					}
				</select>
			</div>
		</div>
	)
}

export default Categories;