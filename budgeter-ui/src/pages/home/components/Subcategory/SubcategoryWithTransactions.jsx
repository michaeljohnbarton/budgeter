import { useState } from 'react';
import styles from './Subcategory.module.css';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { CURRENCY_FORMATTER, MONTHLY_BALANCE_PROPAGATION_TYPE } from '../../../../utils/constants';
import { useMonths } from '../../../../contexts/MonthsContext';
import { useTransactions } from '../../../../contexts/TransactionsContext';
import { useTransactionModal } from '../../../../contexts/TransactionModalContext';
import { useMonthlyBalances } from '../../../../contexts/MonthlyBalancesContext';
import CurrencyField from '../../../../commonComponents/currencyField/CurrencyField';

function SubcategoryWithTransactions({ subcategory, bankAccountId, categoryId, showBudgetedAmounts, monthlyBalancePropagationType }) {
	const { selectedMonthId } = useMonths();
	const { monthlyBalances } = useMonthlyBalances();
	const { transactions, updateTransaction } = useTransactions();
	const { openModalForNewTransactionInSubcategory } = useTransactionModal();
	const [activeEdit, setActiveEdit] = useState({ transactionId: null, field: null });
	const [editingDescription, setEditingDescription] = useState('');
	const [editingAmountCents, setEditingAmountCents] = useState(null);
	const transactionsForSubcategoryAndMonth = transactions.filter(t => t.subcategoryId === subcategory.id && t.monthId === selectedMonthId);
	const monthlyBalanceForSubcategoryAndMonth = monthlyBalances.find(mb => mb.monthId === selectedMonthId && mb.subcategoryId === subcategory.id) || {};

	const handleAddClick = () => {
		openModalForNewTransactionInSubcategory(bankAccountId, categoryId, subcategory.id);
	};

	const startEditing = (transaction, field) => {
		const signedAmountCents = transaction.isCredit ? transaction.amountCents : -transaction.amountCents;
		setActiveEdit({ transactionId: transaction.id, field });
		setEditingDescription(transaction.description);
		setEditingAmountCents(signedAmountCents);
	};

	const finishEditing = () => {
		setActiveEdit({ transactionId: null, field: null });
	};

	const saveDescription = async (transaction) => {
		finishEditing();
		const trimmedDescription = editingDescription.trim();
		if (trimmedDescription === transaction.description) return;

		try {
			await updateTransaction(transaction.id, { description: trimmedDescription }, true);
			toast.success('Transaction updated successfully');
		}
		catch (error) {
			toast.error(error.message || 'Failed to update transaction');
		}
	};

	const saveAmount = async (transaction) => {
		finishEditing();
		const amountCents = Math.abs(editingAmountCents);
		const isCredit = editingAmountCents >= 0;
		if (amountCents === transaction.amountCents && isCredit === transaction.isCredit) return;

		try {
			await updateTransaction(transaction.id, { amountCents, isCredit }, true);
			toast.success('Transaction updated successfully');
		}
		catch (error) {
			toast.error(error.message || 'Failed to update transaction');
		}
	};

	const handleInputKeyDown = (event, transaction, field) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (field === 'description') {
				saveDescription(transaction);
			} else {
				saveAmount(transaction);
			}
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

					const isEditingDescription = activeEdit.transactionId === t.id && activeEdit.field === 'description';
					const isEditingAmount = activeEdit.transactionId === t.id && activeEdit.field === 'amount';

					return (
						<tr key={t.id} className={rowClass}>
							<td colSpan="2" title={t.description}>
								{isEditingDescription ? (
									<input
										className={styles.transactionInput}
										autoFocus
										value={editingDescription}
										onChange={(e) => setEditingDescription(e.target.value)}
										onBlur={() => saveDescription(t)}
										onKeyDown={(e) => handleInputKeyDown(e, t, 'description')}
									/>
								) : (
									<span className={styles.editableCell} onClick={() => startEditing(t, 'description')}>
										{t.description}
									</span>
								)}
							</td>
							<td className={styles.amountDisplay}>
								{isEditingAmount ? (
									<CurrencyField
										id="editingAmountCents"
										className={styles.transactionInput}
										textAlign="right"
										centsValue={editingAmountCents}
										onChangeCents={setEditingAmountCents}
										onBlur={() => saveAmount(t)}
										onKeyDown={(e) => handleInputKeyDown(e, t, 'amount')}
										allowNegativeValue={true}
										autoFocus={true}
									/>
								) : (
									<span className={styles.editableCell} onClick={() => startEditing(t, 'amount')}>
										{CURRENCY_FORMATTER.format(t.amountCents / 100 * (t.isCredit ? 1 : -1))}
									</span>
								)}
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