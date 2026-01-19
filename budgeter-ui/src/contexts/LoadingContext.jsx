import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
	const LoadingType = {
		NONE: 0,
		OVERLAY: 1,
		FULLSCREEN: 2
	}
	const [loading, setLoading] = useState(LoadingType.NONE);

	return (
		<LoadingContext.Provider value={{ loading, setLoading, LoadingType }}>
			{children}
		</LoadingContext.Provider>
	);
}

export function useLoading() {
	const context = useContext(LoadingContext);
	if (!context) throw new Error("useLoading must be used within a LoadingProvider");
	return context;
}

export { LoadingContext };
