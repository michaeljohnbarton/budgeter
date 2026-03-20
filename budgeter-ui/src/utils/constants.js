export const MAX_RANK = 1000;

export const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
});

export const MONTHLY_BALANCE_PROPAGATION_TYPE = Object.freeze({
	BankAccount: 'BankAccount',
	Subcategory: 'Subcategory'
});