import './MonthModal.css';
import { useState } from "react";
import { toast } from 'react-toastify';
import { useMonths } from '../../../contexts/MonthsContext';
import Modal from "../../../commonComponents/modal/Modal";

function MonthModal({ isOpen, setIsModalOpen, monthData }) {
	const { months, monthMap, createMonth } = useMonths();

	const isEditMode = monthData !== undefined;
	const title = isEditMode ? "Edit Month" : "Add Month";
	const initialMonth = isEditMode ? monthData.monthNumber : 0;
	const initialYear = isEditMode ? monthData.year : "";

	const [month, setMonth] = useState(initialMonth);
	const [year, setYear] = useState(initialYear);
	const [touched, setTouched] = useState({
		month: false,
		year: false
	});

	const isMonthSet = month !== 0;
	const isYearSet = year !== "";
	const isYearValid = year >= 2000 && year <= 3000;
	const monthAlreadyExists = months.find(m => m.monthNumber === month && m.year === year && (!isEditMode || m.id !== monthData.id)) !== undefined;
	const isFormValid = isMonthSet && isYearValid && !monthAlreadyExists;

	// TODO: Test this once we implement edit mode!
	const hasUnsavedChanges = isEditMode
		? (month !== initialMonth) || (year !== initialYear)
		: isMonthSet || isYearSet;

	const handleSave = async () => {
		try {
			await createMonth({ monthNumber: month, year: year });
			toast.success("Month created successfully");
			closeModal();
		}
		catch (error) {
			toast.error(error.message || "Failed to create month");
		}
	};

	const handleClose = () => {
		closeModal();
	}

	const closeModal = () => {
		setMonth(0);
		setYear("");
		setTouched({
			month: false,
			year: false
		});
		setIsModalOpen(false);
	}

	const monthOptions = monthMap.map(m => ({ value: m.number, label: m.name }));
	monthOptions.unshift({ value: 0, label: "-- Select Month --" });

	return (
		<Modal isOpen={isOpen} onClose={handleClose} onSave={handleSave} isSaveEnabled={isFormValid} title={title} hasUnsavedChanges={hasUnsavedChanges}>
			<form className="month-form">
				<div className="form-group">
					<label htmlFor="monthDropdown" className="required-label">Month</label>
					<select
						id="monthDropdown"
						name="monthDropdown"
						value={month}
						onChange={(e) => setMonth(Number(e.target.value))}
						onBlur={() => setTouched((t) => ({ ...t, month: true }))}
						required >
						{
							monthOptions.map((month) => (
								<option key={month.value} value={month.value}>{month.label}</option>
							))
						}
					</select>
					{touched.month && !isMonthSet && (
						<span className="error-text">This field is required</span>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="year" className="required-label">Year</label>
					<input
						type="number"
						id="year"
						name="year"
						min="2000"
						max="3000"
						value={year}
						onChange={(e) => e.target.value ? setYear(Number(e.target.value)) : setYear("")}
						onBlur={() => setTouched((t) => ({ ...t, year: true }))}
						required />
					{touched.year && !isYearSet && (
						<span className="error-text">This field is required</span>
					)}
					{touched.year && !isYearValid && (
						<span className="error-text">Year must be between 2000 and 3000 (inclusive)</span>
					)}
				</div>
				{touched.month && touched.year && monthAlreadyExists && (
					<span className="error-text">A month with this month and year already exists</span>
				)}
			</form>
		</Modal>
	);
}

export default MonthModal;