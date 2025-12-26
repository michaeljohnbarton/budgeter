import './Configuration.css';
import { useState } from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import { useMonths } from '../../contexts/MonthsContext';
import TitleDropdown from '../../commonComponents/titleDropdown/TitleDropdown';
import Months from './components/Months';

function Configuration() {
	const { loading } = useLoading();
	const { months, error } = useMonths();
	const [selectedOption, setSelectedOption] = useState(1);

	const options = [
		{ key: 1, value: 1, display: 'Months', component: Months, props: { months: months } },
		{ key: 2, value: 2, display: 'Bank Accounts' },
		{ key: 3, value: 3, display: 'Categories' },
		{ key: 4, value: 4, display: 'Subcategories' }
	]

	const selected = options.find(o => o.key === selectedOption);
	const SelectedComponent = selected?.component;

	if (loading) return null;
	if (error) return <p>Error: {error}</p>;

	return (
		<div id="configuration-page">
			<TitleDropdown items={options} selectedValue={selectedOption} setSelectedValue={setSelectedOption} />
			<div id="configuration-content">
				{SelectedComponent && <SelectedComponent {...selected.props} />}
			</div>
		</div>
	)
}

export default Configuration;