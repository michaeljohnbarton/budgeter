import styles from './Subcategory.module.css';

function SubcategoryWithoutTransactions({ subcategory, showBudgetedAmounts, anyInCategoryHasTransactions, isLast }) {
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
					<td colSpan="2">Actual</td>
					<td className={styles.amountDisplay}>$65.00</td>
				</tr>
			</>
		)
	} else {
		return (
			<>
				<tr className={isLast ? styles.last : ''}>
					<td>{subcategory.name}</td>
					{ showBudgetedAmounts && <td className={styles.amountDisplay}>$50.00</td>}
					<td className={styles.amountDisplay}>$30.00</td>
				</tr>
			</>
		);
	}
}

export default SubcategoryWithoutTransactions;