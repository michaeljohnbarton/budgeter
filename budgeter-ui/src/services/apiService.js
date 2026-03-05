import { API_CONNECTION_FAILED_MESSAGE } from "../constants/apiConstants";

const BASE_URL = "http://localhost:60060/api";

async function request(endpoint, options = {}) {
	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			headers: { "Content-Type": "application/json" },
			...options
		});

		if (!response.ok) {
			if(response.status === 500) {
				var message = await response.json().then(data => data.message).catch(() => null);
				var displayMessage = "An unexpected error occurred";
				if (message) {
					displayMessage += ": " + message;
				}
				throw new Error(displayMessage);
			}

			const errorText = await response.text();
			throw new Error(errorText || "Request failed");
		}

		if (options?.method === undefined) { // Only GET returns data currently
			return response.json();
		}
	} catch (err) {
		if (err instanceof TypeError) {
			throw new Error(API_CONNECTION_FAILED_MESSAGE);
		}
		throw err;
	}
}

export const apiService = {
	get: (endpoint) => request(endpoint),
	post: (endpoint, body) =>
		request(endpoint, {
			method: "POST",
			body: JSON.stringify(body)
		}),
	put: (endpoint, body) =>
		request(endpoint, {
			method: "PUT",
			body: JSON.stringify(body)
		}),
	delete: (endpoint) =>
		request(endpoint, {
			method: "DELETE"
		})
};