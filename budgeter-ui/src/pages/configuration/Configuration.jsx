import './Configuration.css';
import { useState, useContext, useEffect } from 'react';
import { LoadingContext } from "../../contexts/LoadingContext";
import TitleDropdown from '../../commonComponents/titleDropdown/TitleDropdown';
import Months from './components/Months';

function Configuration() {
	const { setLoading } = useContext(LoadingContext);
	const [error, setError] = useState(null);
	const [months, setMonths] = useState([]);
	const [selectedOption, setSelectedOption] = useState(1);

	const options = [
		{ key: 1, value: 1, display: 'Months', component: Months, props: { months: months } },
		{ key: 2, value: 2, display: 'Bank Accounts' },
		{ key: 3, value: 3, display: 'Categories' },
		{ key: 4, value: 4, display: 'Subcategories' }
	]

	const selected = options.find(o => o.key === selectedOption);
	const SelectedComponent = selected?.component;

	useEffect(() => {
		async function fetchMonths() {
			try {
				setLoading(true);

				const response = await fetch("http://localhost:60060/api/Month");
				if (!response.ok) {
					throw new Error("Failed to fetch months");
				}

				const data = await response.json();
				setMonths(data);
			} catch (err) {
				if (err.message === 'Failed to fetch') {
					setError("Could not connect to the API.");
				} else {
					setError(err.message);
				}

			} finally {
				setLoading(false);
			}
		}

		fetchMonths();
	}, []);

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