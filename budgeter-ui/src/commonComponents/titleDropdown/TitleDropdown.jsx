import styles from "./TitleDropdown.module.css";

function TitleDropdown({ items, selectedValue, setSelectedValue, onNewButtonClick }) {
	return (
		<div className={styles.titleDropdownWrapper}>
			<select id="title-dropdown" className={styles.titleDropdown} value={selectedValue} onChange={(e) => setSelectedValue(Number(e.target.value))}>
				{items.map((item) => (
					<option key={item.key} value={item.value}>
						{item.display}
					</option>
				))}
			</select>
			{
				onNewButtonClick && <button className={styles.newItemButton} onClick={onNewButtonClick}>New</button>
			}
		</div>
	);
}

export default TitleDropdown;