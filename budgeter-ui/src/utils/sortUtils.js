import { MAX_RANK } from "./constants";

export function sortByRankThenName(items) {
	return [...items].sort((a, b) => {
		const rankA = a.rank ?? MAX_RANK;
		const rankB = b.rank ?? MAX_RANK;

		if (rankA !== rankB) {
			return rankA - rankB;
		}

		return a.name.localeCompare(b.name);
	});
}