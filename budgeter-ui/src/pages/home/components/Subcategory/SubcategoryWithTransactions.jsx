import styles from './Subcategory.module.css';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { CURRENCY_FORMATTER, MONTHLY_BALANCE_PROPAGATION_TYPE } from '../../../../utils/constants';
import { useMonths} from '../../../../contexts/MonthsContext';
import { useTransactions } from '../../../../contexts/TransactionsContext';
import { useTransactionModal } from '../../../../contexts/TransactionModalContext';
import { useMonthlyBalances } from '../../../../contexts/MonthlyBalancesContext';

function SubcategoryWithTransactions({ subcategory, bankAccountId, categoryId, showBudgetedAmounts, monthlyBalancePropagationType }) {
	const { selectedMonthId } = useMonths();
	const { monthlyBalances } = useMonthlyBalances();
	const { transactions, deleteTransaction } = useTransactions();
	const { openModalForNewTransactionInSubcategory, openModalForExistingTransaction } = useTransactionModal();
	const transactionsForSubcategoryAndMonth = transactions.filter(t => t.subcategoryId === subcategory.id && t.monthId === selectedMonthId);
	const monthlyBalanceForSubcategoryAndMonth = monthlyBalances.find(mb => mb.monthId === selectedMonthId && mb.subcategoryId === subcategory.id) || {};

	const handleAddClick = () => {
		openModalForNewTransactionInSubcategory(bankAccountId, categoryId, subcategory.id);
	};

	const handleEditTransaction = (transaction) => {
		transaction.bankAccountId = bankAccountId;
		transaction.categoryId = categoryId;
		openModalForExistingTransaction(transaction);
	};

	const handleDeleteTransaction = async (transaction) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this transaction? This action cannot be undone.'
		);
		if (!confirmDelete) return;
		
		try {
			await deleteTransaction(transaction.id);
			toast.success("Transaction deleted successfully");
		}
		catch (error) {
			toast.error(error.message || "Failed to delete transaction");
		}
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
					<td className={styles.amountDisplay}>{CURRENCY_FORMATTER.format(monthlyBalanceForSubcategoryAndMonth.budgetedAmountCents / 100)}</td>
				</tr>
			)}
			<tr className={ monthlyBalancePropagationType === MONTHLY_BALANCE_PROPAGATION_TYPE.Subcategory ? "" : styles.last}>
				<td colSpan="2">{showBudgetedAmounts ? "Actual" : "Current Balance"}</td>
				<td className={styles.amountDisplay}>{CURRENCY_FORMATTER.format(monthlyBalanceForSubcategoryAndMonth.actualAmountCents / 100)}</td>
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
							<td colSpan="2" className={styles.descriptionCell} title={t.description}>
								{t.description}
								<button 
									className={styles.transactionDeleteButton}
									onClick={() => handleDeleteTransaction(t)}
									aria-label="Delete"
								>
									<FaTrash />
								</button>
								<button 
									className={styles.transactionEditButton}
									onClick={() => handleEditTransaction(t)}
									aria-label="Edit"
								>
									<FaEdit />
								</button>
							</td>
							<td className={styles.amountDisplay}>
								{CURRENCY_FORMATTER.format(t.amountCents / 100 * (t.isCredit ? 1 : -1))}
							</td>
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