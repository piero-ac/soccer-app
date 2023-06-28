import { useState, useCallback } from "react";

const useRapidAPI = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const sendRequest = useCallback(async (endpoint, transformData) => {
		setLoading(true);
		setError(null);
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
				"X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
			},
		};
		try {
			const response = await fetch(endpoint, options);

			if (!response.ok) {
				throw new Error("Request failed!");
			}

			const data = await response.json();
			transformData(data);
		} catch (err) {
			setError(err.message || "Something went wrong!");
		}
		setLoading(false);
	}, []);
	return { loading, error, sendRequest };
};

export default useRapidAPI;
