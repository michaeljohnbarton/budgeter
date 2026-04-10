import styles from './Home.module.css';
import { useLoading } from '../../contexts/LoadingContext';
import { useMonths } from '../../contexts/MonthsContext';
import { useBankAccounts } from '../../contexts/BankAccountsContext';
import { useCategories } from '../../contexts/CategoriesContext';
import { useSubcategories } from '../../contexts/SubcategoriesContext';
import { useTransactions } from '../../contexts/TransactionsContext';
import { useTransactionModal } from '../../contexts/TransactionModalContext';
import TitleDropdown from '../../commonComponents/titleDropdown/TitleDropdown';
import BankAccount from './components/BankAccount/BankAccount';
import TransactionModal from './components/Transaction/TransactionModal';

function Home() {
	const { loading, LoadingType } = useLoading();
	const { months, monthMap, error: monthsError, selectedMonthId, setSelectedMonthId } = useMonths();
	const { bankAccounts, error: bankAccountsError } = useBankAccounts();
	const { error: categoriesError } = useCategories();
	const { error: subcategoriesError } = useSubcategories();
	const { error: transactionsError } = useTransactions();
	const { openModal } = useTransactionModal();

	if (loading == LoadingType.FULLSCREEN) return null;
	if (monthsError) return <p>Error: {monthsError}</p>;
	if (bankAccountsError) return <p>Error: {bankAccountsError}</p>;
	if (categoriesError) return <p>Error: {categoriesError}</p>;
	if (subcategoriesError) return <p>Error: {subcategoriesError}</p>;
	if (transactionsError) return <p>Error: {transactionsError}</p>;
	if (months.length === 0) return <p>No months available. Add months in Configuration.</p>;

	var monthsForDropdown = months.map((month) => ({
		key: month.id,
		value: month.id,
		display: `${monthMap.find(x => x.number === month.monthNumber).name} ${month.year}`
	}));

	const handleNewClick = () => {
		openModal();
	};

	return (
		<div id="home-page">
			<TitleDropdown
				items={monthsForDropdown}
				selectedValue={selectedMonthId}
				setSelectedValue={setSelectedMonthId}
				onNewButtonClick={handleNewClick}
			/>

			{ bankAccounts.length > 0
				? (
					<div className={styles.bankAccountsWrapper}>
						{bankAccounts.map(bankAccount => <BankAccount key={bankAccount.id} bankAccount={bankAccount} />)}
					</div>
				)
				: <p>No bank accounts available. Add bank accounts in Configuration.</p>
			}

			<TransactionModal />
		</div>
	);
}

export default Home;