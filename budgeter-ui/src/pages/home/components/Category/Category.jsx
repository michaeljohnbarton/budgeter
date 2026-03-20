import styles from './Category.module.css';
import { useSubcategories } from '../../../../contexts/SubcategoriesContext';
import SubcategoryWithTransactions from '../Subcategory/SubcategoryWithTransactions';
import SubcategoryWithoutTransactions from '../Subcategory/SubcategoryWithoutTransactions';

function Category({ category, showBudgetedAmounts }) {
	const { subcategories } = useSubcategories();
	const subcategoriesForCategory = subcategories.filter(sc => sc.categoryId === category.id);
	const anySubcategoryHasTransactions = subcategoriesForCategory.some(s => s.hasTransactions);

	return (
		<table className={styles.categoryTable}>
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
						<td>Actual</td>
					</tr>
				)}
				{ subcategoriesForCategory.length > 0
					? subcategoriesForCategory.map((subcategory, index) => {
						if(subcategory.hasTransactions) {
							return (
								<SubcategoryWithTransactions
									key={subcategory.id}
									subcategory={subcategory}
									showBudgetedAmounts={showBudgetedAmounts}
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