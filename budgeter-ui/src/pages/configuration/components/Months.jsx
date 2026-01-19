import './Months.css';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useMonths } from '../../../contexts/MonthsContext';
import MonthModal from './MonthModal';

function Months({ registerNewHandler }) {
	const { months, monthMap, deleteMonth } = useMonths();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [monthData, setMonthData] = useState(null);

	useEffect(() => {
		registerNewHandler(() => handleNewClick);
		return () => registerNewHandler(null); // Cleanup on unmount
	}, [registerNewHandler]);

	const handleNewClick = () => {
		setIsModalOpen(true);
	};

	const handleEditClick = (month) => {
		setMonthData(month);
		setIsModalOpen(true);
	};

	const handleDeleteClick = (monthId) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this month? This action cannot be undone."
		);
		if (!confirmDelete) return;

		try {
			deleteMonth(monthId);
			toast.success("Month deleted successfully");
		}
		catch (error) {
			toast.error(error.message || "Failed to delete month");
		}
	}

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

	if (!months || months.length === 0) return <p>No months were found. Create one.</p>;

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
									<td>{monthMap.find(x => x.number === month.monthNumber).name} {month.year}</td>
									<td className="actions">
										{/* Delete and edit ordered this way because of float right CSS */}
										<button
											className="icon-button delete"
											onClick={() => handleDeleteClick(month.id)}
											aria-label="Delete"
										>
											<FaTrash />
										</button>

										<button
											className="icon-button edit"
											onClick={() => handleEditClick(month)}
											aria-label="Edit"
										>
											<FaEdit />
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<MonthModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} monthData={monthData} setMonthData={setMonthData} />
		</div>
	);
}

export default Months;
