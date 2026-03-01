import styles from './Months.module.css';
import { useEffect, useState, useRef } from 'react';
import { useMonths } from '../../../../contexts/MonthsContext';
import MonthModal from './MonthModal';
import DataTable from '../../../../commonComponents/dataTable/DataTable';

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

	const currentRowRef = useRef(null);

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonthNumber = currentDate.getMonth() + 1;

	const monthDataRecords = months.map(month => ({
		...month,
		displayName: `${monthMap.find(x => x.number === month.monthNumber).name} ${month.year}`,
		isCurrent: month.monthNumber === currentMonthNumber && month.year === currentYear
	}));

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
			 <DataTable
			 	dataRecords={monthDataRecords}
				currentRowRef={currentRowRef}
				dataRecordName="month"
				setDataRecord={setMonthData}
				setIsModalOpen={setIsModalOpen}
				deleteDataRecord={deleteMonth}
			/>
			<MonthModal
				isOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				monthData={monthData}
				setMonthData={setMonthData}
			/>
		</div>
	);
}

export default Months;
