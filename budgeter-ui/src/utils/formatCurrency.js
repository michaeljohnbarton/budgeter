import { CURRENCY_FORMATTER } from './constants';

export function formatCurrencyFromCents(cents) {
	const numericCents = Number(cents);
	return CURRENCY_FORMATTER.format(Number.isFinite(numericCents) ? numericCents / 100 : 0);
}
