import styles from './Category.module.css';

function Category({ category }) {
	return (
		<div key={category.id} className={styles.categoryBlock}>
			<div className={styles.categoryTitle}>
				{category.name}
			</div>

			<div className={styles.subcategoriesWrapper}>
				<p>Subcategories content</p>
			</div>
		</div>
	)
}

export default Category;