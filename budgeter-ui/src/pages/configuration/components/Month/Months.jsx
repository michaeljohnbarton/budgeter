import styles from './Months.module.css';
import tableStyles from '../../../../styles/DataTable.module.css';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import clsx from 'clsx';
import { useMonths } from '../../../../contexts/MonthsContext';
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

	const handleDeleteClick = async (monthId) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this month? This action cannot be undone."
		);
		if (!confirmDelete) return;

		try {
			await deleteMonth(monthId);
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

	if (!months || months.length === 0) {
		return (
			<>
				<p>No months were found. Create one.</p>
				<MonthModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setMonthData={setMonthData} />
			</>
		);
	}

	return (
		<div className={styles.monthsConfiguration}>
			<div className={tableStyles.tableWrapper}>
				<table className={tableStyles.table}>
					<tbody>
						{months.map((month) => {
							const isCurrent =
								month.monthNumber === currentMonthNumber &&
								month.year === currentYear;

							return (
								<tr
									key={month.id}
									ref={isCurrent ? currentRowRef : null}
									className={isCurrent ? styles.currentMonth : undefined}
								>
									<td>{monthMap.find(x => x.number === month.monthNumber).name} {month.year}</td>
									<td>
										{/* Delete and edit ordered this way because of float right CSS */}
										<button
											className={clsx(tableStyles.iconButton, tableStyles.delete)}
											onClick={() => handleDeleteClick(month.id)}
											aria-label="Delete"
										>
											<FaTrash />
										</button>

										<button
											className={clsx(tableStyles.iconButton, tableStyles.edit)}
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
