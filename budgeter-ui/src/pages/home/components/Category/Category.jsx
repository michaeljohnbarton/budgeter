import styles from './Category.module.css';
import { useSubcategories } from '../../../../contexts/SubcategoriesContext';
import Subcategory from '../Subcategory/Subcategory';

function Category({ category }) {
	const { subcategories } = useSubcategories();
	const subcategoriesForCategory = subcategories.filter(sc => sc.categoryId === category.id);

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
				{ subcategoriesForCategory.length > 0
					? subcategoriesForCategory.map(subcategory => <Subcategory key={subcategory.id} subcategory={subcategory} />)
					: <tr><td colSpan="3">No subcategories available for this category. Add subcategories in Configuration.</td></tr>
				}
			</tbody>
		</table>
	);
}

export default Category;