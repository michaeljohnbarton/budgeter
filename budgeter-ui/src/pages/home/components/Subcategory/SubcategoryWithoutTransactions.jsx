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
						<td>$100</td>
					</tr>
				)}
				<tr className={styles.last}>
					<td colSpan="2">Actual</td>
					<td>$65</td>
				</tr>
			</>
		)
	} else {
		return (
			<>
				<tr className={isLast ? styles.last : ''}>
					<td>{subcategory.name}</td>
					{ showBudgetedAmounts && <td>$50</td>}
					<td>$30</td>
				</tr>
			</>
		);
	}
}

export default SubcategoryWithoutTransactions;