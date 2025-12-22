import "./TitleDropdown.css";

function TitleDropdown({ items, selectedValue, setSelectedValue }) {
	return (
		<div id="title-dropdown-wrapper">
			<select id="title-dropdown" value={selectedValue} onChange={(e) => setSelectedValue(Number(e.target.value))}>
				{items.map((item) => (
					<option key={item.key} value={item.value}>
						{item.display}
					</option>
				))}
			</select>
		</div>
	);
}

export default TitleDropdown;