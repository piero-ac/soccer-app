import { useState, useCallback } from "react";

const useBackend = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const sendRequest = useCallback(async (endpoint, setData) => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(endpoint);

			if (!response.ok) {
				throw new Error("Request failed!");
			}

			const { data } = await response.json();
			setData(data);
		} catch (err) {
			setError(err.message || "Something went wrong!");
		}
		setLoading(false);
	}, []);
	return { loading, error, sendRequest };
};

export default useBackend;
