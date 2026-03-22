import styles from "./CurrencyField.module.css"
import CurrencyInput from "react-currency-input-field";
import { useEffect, useState, useRef } from "react";

function CurrencyField({ id, label, centsValue, onChangeCents, required = false, setTouched = null }) {
	const [displayValue, setDisplayValue] = useState("");
	const isEditingRef = useRef(false);

	// Convert cents to dollars for UI
	useEffect(() => {
		if(!isEditingRef.current) {
			if (centsValue != null) {
				setDisplayValue((centsValue / 100).toFixed(2));
			} else {
				setDisplayValue("");
			}
		}
	}, [centsValue]);

	function handleValueChange(value) {
		isEditingRef.current = true;
		setDisplayValue(value ?? "");

		if (value !== undefined && value !== "") {
			const cents = Math.round(parseFloat(value) * 100);
			onChangeCents(cents);
		} else {
			onChangeCents(null);
		}
	}

	function handleBlur() {
		isEditingRef.current = false;

		if (displayValue !== "") {
			const formatted = Number(displayValue).toFixed(2);
			setDisplayValue(formatted);
			onChangeCents(Math.round(parseFloat(formatted) * 100));
		}

		setTouched?.();
	}

	return (
		<>
			{label && <label htmlFor={id} className={required ? styles.requiredLabel : ""}>{label}</label>}

			<CurrencyInput
				id={id}
				prefix="$"
				placeholder="$0.00"
				decimalsLimit={2}
				decimalScale={2}
				allowNegativeValue={false}
				value={displayValue}
				onValueChange={handleValueChange}
				onBlur={handleBlur}
			/>
		</>
	);
}

export default CurrencyField;