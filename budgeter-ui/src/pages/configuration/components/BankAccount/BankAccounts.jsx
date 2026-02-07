import styles from './BankAccounts.module.css';
import { useEffect, useState } from 'react';
import BankAccountModal from './BankAccountModal';

function BankAccounts({ registerNewHandler }) {
	const bankAccounts = [];
	const [isModalOpen, setIsModalOpen] = useState(false);

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
				<BankAccountModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
			</>
		);
	}

	return (
		<div id="bank-accounts-configuration">
			<p>No bank accounts yet</p>
			<BankAccountModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
		</div>
	);
}

export default BankAccounts;
