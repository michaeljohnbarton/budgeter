import './Home.css';
import { useState, useEffect } from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import { useMonths } from '../../contexts/MonthsContext';
import TitleDropdown from '../../commonComponents/titleDropdown/TitleDropdown';

function Home() {
	const { loading, LoadingType } = useLoading();
	const { months, error } = useMonths();
	const [selectedMonth, setSelectedMonth] = useState('');

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonthNumber = currentDate.getMonth() + 1;

	useEffect(() => {
		if (months.length === 0) return;
		const current = months.find(m => m.monthNumber === currentMonthNumber && m.year === currentYear);
		setSelectedMonth(current?.id || months[0].id);
	}, [months, currentMonthNumber, currentYear]);

	if (loading == LoadingType.FULLSCREEN) return null;
	if (error) return <p>Error: {error}</p>;
	if (months.length === 0) return <p>No months available. Add months in Configuration.</p>;

	var monthsForDropdown = months.map((month) => ({
		key: month.id,
		value: month.id,
		display: `${month.name} ${month.year}`
	}));

	return (
		<div id="home-page">
			<TitleDropdown items={monthsForDropdown} selectedValue={selectedMonth} setSelectedValue={setSelectedMonth} />
			<p>{months[selectedMonth - 1]?.name} {months[selectedMonth - 1]?.year} is selected</p>
		</div>
	)
}

export default Home;