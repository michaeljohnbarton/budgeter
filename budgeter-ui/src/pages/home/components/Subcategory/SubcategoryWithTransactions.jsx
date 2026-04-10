import styles from './Subcategory.module.css';
import clsx from 'clsx';
import { CURRENCY_FORMATTER, MONTHLY_BALANCE_PROPAGATION_TYPE } from '../../../../utils/constants';
import { useMonths} from '../../../../contexts/MonthsContext';
import { useTransactions } from '../../../../contexts/TransactionsContext';
import { useTransactionModal } from '../../../../contexts/TransactionModalContext';

function SubcategoryWithTransactions({ subcategory, bankAccountId, categoryId, showBudgetedAmounts, monthlyBalancePropagationType }) {
	const { selectedMonthId } = useMonths();
	const { transactions } = useTransactions();
	const { openModalForNewTransactionInSubcategory } = useTransactionModal();
	const transactionsForSubcategoryAndMonth = transactions.filter(t => t.subcategoryId === subcategory.id && t.monthId === selectedMonthId);

	const handleAddClick = () => {
		openModalForNewTransactionInSubcategory(bankAccountId, categoryId, subcategory.id);
	};

	return (
		<>
			<tr>
				<th colSpan="3" className={styles.subcategoryHeader}>
					{subcategory.name}
					<button className={styles.subcategoryAddButton} onClick={handleAddClick}>+</button>
				</th>
			</tr>
			{ showBudgetedAmounts && (
				<tr className={styles.first}>
					<td colSpan="2">Budgeted</td>
					<td className={styles.amountDisplay}>$100.00</td>
				</tr>
			)}
			<tr className={ monthlyBalancePropagationType === MONTHLY_BALANCE_PROPAGATION_TYPE.Subcategory ? "" : styles.last}>
				<td colSpan="2">{showBudgetedAmounts ? "Actual" : "Current Balance"}</td>
				<td className={styles.amountDisplay}>$65.00</td>
			</tr>
			{ monthlyBalancePropagationType === MONTHLY_BALANCE_PROPAGATION_TYPE.Subcategory && (
				<tr className={styles.last}>
					<td colSpan="2">Previous Month Remaining</td>
					<td className={styles.amountDisplay}>$100.00</td>
				</tr>
			)}
			{	transactionsForSubcategoryAndMonth.length > 0 &&
				transactionsForSubcategoryAndMonth.map((t, i) => {
					const isLast = i === transactionsForSubcategoryAndMonth.length - 1;
					let rowClass = '';
					if (isLast) rowClass += `${styles.last}`;

					return (
						<tr key={t.id} className={rowClass}>
							<td colSpan="2">{t.description}</td>
							<td className={styles.amountDisplay}>{CURRENCY_FORMATTER.format(t.amountCents / 100)}</td>
						</tr>
					)
				})
			}
			{
				transactionsForSubcategoryAndMonth.length === 0 && (
					<tr className={clsx(styles.last, styles.emptyTransaction)}>
						<td colSpan="2">None</td>
						<td className={styles.amountDisplay}>{CURRENCY_FORMATTER.format(0)}</td>
					</tr>
				)
			}
		</>
	);
}

export default SubcategoryWithTransactions;