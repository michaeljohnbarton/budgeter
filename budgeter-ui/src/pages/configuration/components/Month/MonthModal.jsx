import styles from './MonthModal.module.css';
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useMonths } from '../../../../contexts/MonthsContext';
import Modal from "../../../../commonComponents/modal/Modal";

function MonthModal({ isOpen, setIsModalOpen, monthData, setMonthData }) {
	const { months, monthMap, createMonth, updateMonth } = useMonths();

	const isEditMode = monthData !== null && monthData !== undefined;
	const title = isEditMode ? "Edit Month" : "Add Month";

	const [month, setMonth] = useState(0);
	const [year, setYear] = useState("");
	const [touched, setTouched] = useState({
		month: false,
		year: false
	});

	useEffect(() => {
		if (isEditMode && monthData) {
			setMonth(monthData.monthNumber);
			setYear(monthData.year);
		}
	}, [isOpen]);

	const isMonthSet = month !== 0;
	const isYearSet = year !== "";
	const isYearValid = year >= 2000 && year <= 3000;
	const monthAlreadyExists = months.find(m => m.monthNumber === month && m.year === year && (!isEditMode || m.id !== monthData.id)) !== undefined;
	const isFormValid = isMonthSet && isYearValid && !monthAlreadyExists;

	const hasUnsavedChanges = isEditMode
		? (month !== monthData.monthNumber) || (year !== monthData.year)
		: isMonthSet || isYearSet;

	const handleSave = async () => {
		try {
			if (isEditMode) {
				if(month !== monthData.monthNumber || year !== monthData.year) {
					await updateMonth(monthData.id, { monthNumber: month, year: year });
					toast.success("Month updated successfully");
				} else {
					toast.info("No changes to save");
				}
			} else {
				await createMonth({ monthNumber: month, year: year });
				toast.success("Month created successfully");
			}
			handleClose();
		}
		catch (error) {
			let verb = isEditMode ? "update" : "create";
			toast.error(error.message || `Failed to ${verb} month`);
		}
	};

	const handleClose = () => {
		setMonthData(null);
		setMonth(0);
		setYear("");
		setTouched({
			month: false,
			year: false
		});
		setIsModalOpen(false);
	};

	const monthOptions = monthMap.map(m => ({ value: m.number, label: m.name }));
	monthOptions.unshift({ value: 0, label: "-- Select Month --" });

	return (
		<Modal isOpen={isOpen} onClose={handleClose} onSave={handleSave} isSaveEnabled={isFormValid} title={title} hasUnsavedChanges={hasUnsavedChanges}>
			<div className={styles.monthForm}>
				<div className={styles.formGroup}>
					<label htmlFor="monthDropdown" className={styles.requiredLabel}>Month</label>
					<select
						id="monthDropdown"
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
						<span className={styles.errorText}>This field is required</span>
					)}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="year" className={styles.requiredLabel}>Year</label>
					<input
						type="number"
						id="year"
						min="2000"
						max="3000"
						value={year}
						onChange={(e) => e.target.value ? setYear(Number(e.target.value)) : setYear("")}
						onBlur={() => setTouched((t) => ({ ...t, year: true }))}
						required />
					{touched.year && !isYearSet && (
						<span className={styles.errorText}>This field is required</span>
					)}
					{touched.year && !isYearValid && (
						<span className={styles.errorText}>Year must be between 2000 and 3000 (inclusive)</span>
					)}
				</div>
				{(touched.month || touched.year) && monthAlreadyExists && (
					<span className={styles.errorText}>A month with this month and year already exists</span>
				)}
			</div>
		</Modal>
	);
}

export default MonthModal;