import styles from './Subcategory.module.css';
import { CURRENCY_FORMATTER } from '../../../../utils/constants';

function SubcategoryWithTransactions({ subcategory, showBudgetedAmounts }) {
	const transactions = [
		{id: 1, name: "Transaction 1", amount: 50},
		{id: 2, name: "Transaction 2", amount: 15},
		{id: 3, name: "Transaction 3", amount: 10}
	];

	return (
		<>
			<tr>
				<th colSpan="3" className={styles.subcategoryHeader}>
					{subcategory.name}
				</th>
			</tr>
			{ showBudgetedAmounts && (
				<tr className={styles.first}>
					<td colSpan="2">Budgeted</td>
					<td className={styles.amountDisplay}>$100.00</td>
				</tr>
			)}
			<tr className={styles.last}>
				<td colSpan="2">{showBudgetedAmounts ? "Actual" : "Current Balance"}</td>
				<td className={styles.amountDisplay}>$65.00</td>
			</tr>
			{
				transactions.map((t, i) => {
					const isFirst = i === 0;
					const isLast = i === transactions.length - 1;

					let rowClass = '';

					if (isFirst) rowClass += `${styles.first}`;
					if (isLast) rowClass += `${styles.last}`;

					return (
						<tr key={t.id} className={rowClass}>
							<td colSpan="2">{t.name}</td>
							<td className={styles.amountDisplay}>{CURRENCY_FORMATTER.format(t.amount)}</td>
						</tr>
					)
				})
			}
		</>
	);
}

export default SubcategoryWithTransactions;