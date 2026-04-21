import { useState } from 'react';
import styles from './Subcategory.module.css';
import { toast } from 'react-toastify';
import { CURRENCY_FORMATTER } from '../../../../utils/constants';
import { useMonths } from '../../../../contexts/MonthsContext';
import { useMonthlyBalances } from '../../../../contexts/MonthlyBalancesContext';
import CurrencyField from '../../../../commonComponents/currencyField/CurrencyField';

function SubcategoryWithoutTransactions({ subcategory, showBudgetedAmounts, anyInCategoryHasTransactions, isLast }) {
	const { selectedMonthId } = useMonths();
	const { monthlyBalances, updateMonthlyBalance } = useMonthlyBalances();
	const monthlyBalanceForSubcategoryAndMonth = monthlyBalances.find(mb => mb.monthId === selectedMonthId && mb.subcategoryId === subcategory.id) || {};

	const [activeEdit, setActiveEdit] = useState({ field: null });
	const [editingAmountCents, setEditingAmountCents] = useState(null);

	const startEditing = (field) => {
		setActiveEdit({ field });
		setEditingAmountCents(monthlyBalanceForSubcategoryAndMonth[field === 'actualAmount' ? 'actualAmountCents' : 'budgetedAmountCents']);
	};

	const finishEditing = () => {
		setActiveEdit({ field: null });
	};

	const saveActualAmount = async () => {
		finishEditing();
		if (editingAmountCents === monthlyBalanceForSubcategoryAndMonth.actualAmountCents) return;

		try {
			await updateMonthlyBalance(monthlyBalanceForSubcategoryAndMonth.id, { actualAmountCents: editingAmountCents }, true);
			toast.success('Actual monthly balance updated successfully');
		}
		catch (error) {
			toast.error(error.message || 'Failed to update actual monthly balance');
		}
	};

	// const saveBudgetedAmount = async () => {
	// 	finishEditing();
	// 	if (editingAmountCents === monthlyBalanceForSubcategoryAndMonth.budgetedAmountCents) return;

	// 	try {
	// 		await updateMonthlyBalance(monthlyBalanceForSubcategoryAndMonth.id, { budgetedAmountCents: editingAmountCents }, true);
	// 		toast.success('Budgeted monthly balance updated successfully');
	// 	}
	// 	catch (error) {
	// 		toast.error(error.message || 'Failed to update budgeted monthly balance');
	// 	}
	// };

	const handleInputKeyDown = (event, field) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			if(field === 'actualAmount')
			{
				saveActualAmount();
			}
			else {
				// saveBudgetedAmount();
			}
		}
	};

	const isEditingActualAmount = activeEdit.field === 'actualAmount';
	// const isEditingBudgetedAmount = activeEdit.field === 'budgetedAmount';

	if (anyInCategoryHasTransactions) {
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
					<td className={styles.amountDisplay}>
						{isEditingActualAmount ? (
							<CurrencyField
								id="editingActualAmountCents"
								className={styles.transactionInput}
								textAlign="right"
								centsValue={editingAmountCents}
								onChangeCents={setEditingAmountCents}
								onBlur={() => saveActualAmount()}
								onKeyDown={(e) => handleInputKeyDown(e, 'actualAmount')}
								allowNegativeValue={true}
								autoFocus={true}
							/>
						) : (
							<span className={styles.editableCell} onClick={() => startEditing('actualAmount')}>
								{CURRENCY_FORMATTER.format(monthlyBalanceForSubcategoryAndMonth.actualAmountCents / 100)}
							</span>
						)}
					</td>
				</tr>
			</>
		)
	} else {
		return (
			<>
				<tr className={isLast ? styles.last : ''}>
					<td>{subcategory.name}</td>
					{ showBudgetedAmounts && <td className={styles.amountDisplay}>$50.00</td>}
					<td colSpan={showBudgetedAmounts ? "1": "2"} className={styles.amountDisplay}>
						{isEditingActualAmount ? (
							<CurrencyField
								id="editingActualAmountCents"
								className={styles.transactionInput}
								textAlign="right"
								centsValue={editingAmountCents}
								onChangeCents={setEditingAmountCents}
								onBlur={() => saveActualAmount()}
								onKeyDown={(e) => handleInputKeyDown(e, 'actualAmount')}
								allowNegativeValue={true}
								autoFocus={true}
							/>
						) : (
							<span className={styles.editableCell} onClick={() => startEditing('actualAmount')}>
								{CURRENCY_FORMATTER.format(monthlyBalanceForSubcategoryAndMonth.actualAmountCents / 100)}
							</span>
						)}
					</td>
				</tr>
			</>
		);
	}
}

export default SubcategoryWithoutTransactions;