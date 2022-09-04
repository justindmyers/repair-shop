export type ErrorResponse = {
	message: string;
}

export const fetcher = async (url: string) => {
	const res = await fetch(url);
	const data = await res.json();

	if (!res.ok) {
		const error = new Error(data.message || 'An error occurred while fetching the data.');
		throw error;
	}

	return data;
};
