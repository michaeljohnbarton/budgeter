import styles from './Configuration.module.css';
import { useState } from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import { useMonths } from '../../contexts/MonthsContext';
import TitleDropdown from '../../commonComponents/titleDropdown/TitleDropdown';
import Months from './components/Month/Months';
import BankAccounts from './components/BankAccount/BankAccounts';
import Categories from './components/Category/Categories';
import Subcategories from './components/Subcategory/Subcategories';

function Configuration() {
	const { loading, LoadingType } = useLoading();
	const { error } = useMonths();
	const [selectedOption, setSelectedOption] = useState(1);
	const [newButtonHandler, setNewButtonHandler] = useState(null);

	const options = [
		{ key: 1, value: 1, display: 'Months', component: Months, props: { registerNewHandler: setNewButtonHandler } },
		{ key: 2, value: 2, display: 'Bank Accounts', component: BankAccounts, props: { registerNewHandler: setNewButtonHandler } },
		{ key: 3, value: 3, display: 'Categories', component: Categories, props: { registerNewHandler: setNewButtonHandler } },
		{ key: 4, value: 4, display: 'Subcategories', component: Subcategories, props: { registerNewHandler: setNewButtonHandler } }
	]

	const selected = options.find(o => o.key === selectedOption);
	const SelectedComponent = selected?.component;

	if (loading == LoadingType.FULLSCREEN) return null;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className={styles.configurationPage}>
			<TitleDropdown items={options} selectedValue={selectedOption} setSelectedValue={setSelectedOption} onNewButtonClick={newButtonHandler} />
			<div className={styles.configurationContent}>
				{SelectedComponent && <SelectedComponent {...selected.props} />}
			</div>
		</div>
	)
}

export default Configuration;