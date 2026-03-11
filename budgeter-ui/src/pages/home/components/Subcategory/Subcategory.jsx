import styles from './Subcategory.module.css';

function Subcategory({ subcategory }) {
	return (
		<>
			<tr>
				<th colSpan="3" className={styles.subcategoryHeader}>
					{subcategory.name}
				</th>
			</tr>
			<tr>
				<td>Budget</td>
				<td>Actual</td>
				<td>Remaining</td>
			</tr>
			<tr>
				<td>$100</td>
				<td>$65</td>
				<td>$35</td>
			</tr>
		</>
	);
}

export default Subcategory;