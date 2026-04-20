import styles from './Category.module.css';
import clsx from 'clsx';
import { useSubcategories } from '../../../../contexts/SubcategoriesContext';
import { useTransactions } from '../../../../contexts/TransactionsContext';
import SubcategoryWithTransactions from '../Subcategory/SubcategoryWithTransactions';
import SubcategoryWithoutTransactions from '../Subcategory/SubcategoryWithoutTransactions';

function Category({ category, showBudgetedAmounts, monthlyBalancePropagationType }) {
	const { subcategories } = useSubcategories();
	const { transactions } = useTransactions();

	const subcategoriesForCategory = subcategories.filter(sc => sc.categoryId === category.id);
	const anySubcategoryAllowsTransactions = subcategoriesForCategory.some(s => s.hasTransactions);
	const anySubcategoryHasTransactions = subcategoriesForCategory.some(s => transactions.some(t => t.subcategoryId === s.id));

	return (
		<table className={clsx(styles.categoryTable, anySubcategoryAllowsTransactions ? styles.categoryTableFixed : styles.categoryTableAuto)}>
			{anySubcategoryHasTransactions && (
				<colgroup>
				<col style={{flex: 1}} />
				<col style={{flex: 1}} />
				<col style={{flex: 1}} />
				<col style={{width: '25px'}} />
				</colgroup>
			)}
			{!anySubcategoryHasTransactions && (
				<colgroup>
				<col style={{flex: 1}} />
				{showBudgetedAmounts && <col style={{flex: 1}} />}
				<col style={{flex: 1}} />
				</colgroup>
			)}
			<thead>
				<tr>
					<th colSpan="3" className={styles.categoryHeader}>
						{category.name}
					</th>
				</tr>
			</thead>
			<tbody>
				{ !anySubcategoryAllowsTransactions && (
					<tr className={styles.headerRow}>
						<td>Name</td>
						{showBudgetedAmounts && <td>Budgeted</td>}
						<td colSpan={showBudgetedAmounts ? "1" : "2"}>
							{showBudgetedAmounts ? "Actual" : "Current Balance"}
						</td>
					</tr>
				)}
				{ subcategoriesForCategory.length > 0
					? subcategoriesForCategory.map((subcategory, index) => {
						if(subcategory.hasTransactions) {
							return (
								<SubcategoryWithTransactions
									key={subcategory.id}
									subcategory={subcategory}
									bankAccountId={category.bankAccountId}
									categoryId={category.id}
									showBudgetedAmounts={showBudgetedAmounts}
									monthlyBalancePropagationType={monthlyBalancePropagationType}
								/>
							);
						} else {
							const isLast = index === subcategoriesForCategory.length - 1;
							return (
								<SubcategoryWithoutTransactions
									key={subcategory.id}
									subcategory={subcategory}
									showBudgetedAmounts={showBudgetedAmounts}
									anyInCategoryHasTransactions={anySubcategoryAllowsTransactions}
									isLast={isLast}
								/>
							);
						}
					})
					: <tr><td colSpan="3">No subcategories available for this category. Add subcategories in Configuration.</td></tr>
				}
			</tbody>
		</table>
	);
}

export default Category;