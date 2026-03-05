import { API_CONNECTION_FAILED_MESSAGE } from "../constants/apiConstants";

const BASE_URL = "http://localhost:60060/api";

async function request({endpoint, returnResponseJson = false, options = {}}) {
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

		if (returnResponseJson) {
			const contentType = response.headers.get("content-type");
			if(contentType && contentType.includes("application/json")) {
				return response.json();
			}
			else {
				throw new Error("JSON response expected but not received");
			}
		}
	} catch (err) {
		if (err instanceof TypeError) {
			throw new Error(API_CONNECTION_FAILED_MESSAGE);
		}
		throw err;
	}
}

export const apiService = {
	get: (endpoint) => request({endpoint, returnResponseJson: true}),
	post: (endpoint, body) =>
		request({endpoint, options: {
			method: "POST",
			body: JSON.stringify(body)
		}}),
	postWithResponse: (endpoint, body) =>
		request({endpoint, returnResponseJson: true, options: {
			method: "POST",
			body: JSON.stringify(body)
		}}),
	put: (endpoint, body) =>
		request({endpoint, options: {
			method: "PUT",
			body: JSON.stringify(body)
		}}),
	delete: (endpoint) =>
		request({endpoint, options: {
			method: "DELETE"
		}})
};