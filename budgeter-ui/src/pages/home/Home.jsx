import styles from './Home.module.css';
import { useState, useEffect } from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import { useMonths } from '../../contexts/MonthsContext';
import { useBankAccounts } from '../../contexts/BankAccountsContext';
import { useCategories } from '../../contexts/CategoriesContext';
import { useSubcategories } from '../../contexts/SubcategoriesContext';
import TitleDropdown from '../../commonComponents/titleDropdown/TitleDropdown';
import BankAccount from './components/BankAccount/BankAccount';

function Home() {
	const { loading, LoadingType } = useLoading();
	const { months, monthMap, error: monthsError } = useMonths();
	const { bankAccounts, error: bankAccountsError } = useBankAccounts();
	const { error: categoriesError } = useCategories();
	const { error: subcategoriesError } = useSubcategories();
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
	if (monthsError) return <p>Error: {monthsError}</p>;
	if (bankAccountsError) return <p>Error: {bankAccountsError}</p>;
	if (categoriesError) return <p>Error: {categoriesError}</p>;
	if (subcategoriesError) return <p>Error: {subcategoriesError}</p>;
	if (months.length === 0) return <p>No months available. Add months in Configuration.</p>;

	var monthsForDropdown = months.map((month) => ({
		key: month.id,
		value: month.id,
		display: `${monthMap.find(x => x.number === month.monthNumber).name} ${month.year}`
	}));

	return (
		<div id="home-page">
			<TitleDropdown items={monthsForDropdown} selectedValue={selectedMonth} setSelectedValue={setSelectedMonth} />

			{ bankAccounts.length > 0
				? (
					<div className={styles.bankAccountsWrapper}>
						{bankAccounts.map(bankAccount => <BankAccount key={bankAccount.id} bankAccount={bankAccount} />)}
					</div>
				)
				: <p>No bank accounts available. Add bank accounts in Configuration.</p>
			}
		</div>
	);
}

export default Home;