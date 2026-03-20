import styles from './BankAccountSummary.module.css';
import { MONTHLY_BALANCE_PROPAGATION_TYPE } from '../../../../utils/constants';
import clsx from 'clsx';

function BankAccountSummary({ bankAccount, categoriesForBankAccount }) {
	return bankAccount.monthlyBalancePropagationType === MONTHLY_BALANCE_PROPAGATION_TYPE.BankAccount
		? (
			<table className={styles.summaryTable}>
				<thead>
					<tr>
						<th colSpan="2" className={styles.summaryHeader}>
							{bankAccount.name} Total
						</th>
					</tr>
				</thead>
				<tbody>
					{
						categoriesForBankAccount.map((category, index) => {
							const isFirst = index === 0;
							const isLast = index === categoriesForBankAccount.length - 1;

							let rowClass = '';

							if (isFirst) rowClass += `${styles.first}`;
							if (isLast) rowClass += `${styles.last}`;

							return (
								<tr key={category.id} className={rowClass}>
									<td>Budgeted {category.name}</td>
									<td className={styles.amountDisplay}>$100.00</td>
								</tr>
							);
						})
					}
					{
						categoriesForBankAccount.map((category, index) => {
							const isFirst = index === 0;
							const isLast = index === categoriesForBankAccount.length - 1;

							let rowClass = '';

							if (isFirst) rowClass += `${styles.first}`;
							if (isLast) rowClass += `${styles.last}`;

							return (
								<tr key={category.id} className={rowClass}>
									<td>Actual {category.name}</td>
									<td className={styles.amountDisplay}>$100.00</td>
								</tr>
							);
						})
					}
					<tr className={styles.first}>
						<td>Previous Month Remaining</td>
						<td className={styles.amountDisplay}>$100.00</td>
					</tr>
					<tr>
						<td>Budgeted Cumulative Remaining</td>
						<td className={styles.amountDisplay}>$100.00</td>
					</tr>
					<tr className={clsx(styles.last, styles.totalBalance)}>
						<td>Actual Cumulative Remaining</td>
						<td className={styles.amountDisplay}>$100.00</td>
					</tr>
				</tbody>
			</table>
		)
		: (
			<table className={styles.summaryTable}>
				<thead>
					<tr>
						<th colSpan="2" className={styles.summaryHeader}>
							{bankAccount.name} Total
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className={clsx(styles.last, styles.totalBalance)}>
						<td>Total Balance</td>
						<td className={styles.amountDisplay}>$100.00</td>
					</tr>
				</tbody>
			</table>
		);
}

export default BankAccountSummary;