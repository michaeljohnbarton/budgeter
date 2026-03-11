import styles from './BankAccount.module.css';
import { useCategories } from '../../../../contexts/CategoriesContext';
import Category from '../Category/Category';

function BankAccount({ bankAccount }) {
	const { categories } = useCategories();

	const categoriesForBankAccount = categories.filter(c => c.bankAccountId === bankAccount.id);

	return (
		<fieldset key={bankAccount.id} className={styles.bankAccountCard}>
			<legend className={styles.bankAccountName}>{bankAccount.name}</legend>

			{ categoriesForBankAccount.length > 0
				? (
					<div className={styles.categoriesWrapper}>
						{categoriesForBankAccount.map(category => <Category key={category.id} category={category} /> )}
					</div>
				)
				: <p>No categories available for this bank account. Add categories in Configuration.</p>
			}
		</fieldset>
	);
}

export default BankAccount;