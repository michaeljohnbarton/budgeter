import styles from './Category.module.css';
import clsx from 'clsx';
import { useSubcategories } from '../../../../contexts/SubcategoriesContext';
import SubcategoryWithTransactions from '../Subcategory/SubcategoryWithTransactions';
import SubcategoryWithoutTransactions from '../Subcategory/SubcategoryWithoutTransactions';

function Category({ category, showBudgetedAmounts, monthlyBalancePropagationType }) {
	const { subcategories } = useSubcategories();
	const subcategoriesForCategory = subcategories.filter(sc => sc.categoryId === category.id);
	const anySubcategoryHasTransactions = subcategoriesForCategory.some(s => s.hasTransactions);

	return (
		<table className={clsx(styles.categoryTable, anySubcategoryHasTransactions ? styles.categoryTableFixed : styles.categoryTableAuto)}>
			<thead>
				<tr>
					<th colSpan="3" className={styles.categoryHeader}>
						{category.name}
					</th>
				</tr>
			</thead>
			<tbody>
				{ !anySubcategoryHasTransactions && (
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
									anyInCategoryHasTransactions={anySubcategoryHasTransactions}
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