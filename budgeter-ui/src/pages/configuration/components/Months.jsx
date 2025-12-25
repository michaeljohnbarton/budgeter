import './Months.css';
import { useEffect, useRef } from 'react';

function Months({ months }) {
	const currentRowRef = useRef(null);

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonthNumber = currentDate.getMonth() + 1;

	useEffect(() => {
		if (currentRowRef.current) {
			currentRowRef.current.scrollIntoView({
				block: "center",
				behavior: "smooth"
			});
		}
	}, [months]);

	if (!months || months.length === 0) {
		return <p>No months were found. Create one.</p>;
	}

	return (
		<div id="months-configuration">
			<div id="table-wrapper">
				<table id="months-table">
					<tbody>
						{months.map((month) => {
							const isCurrent =
								month.monthNumber === currentMonthNumber &&
								month.year === currentYear;

							return (
								<tr
									key={month.id}
									ref={isCurrent ? currentRowRef : null}
									className={isCurrent ? "current-month" : undefined}
								>
									<td>{month.name} {month.year}</td>
									<td>Edit</td>
									<td>Delete</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Months;
