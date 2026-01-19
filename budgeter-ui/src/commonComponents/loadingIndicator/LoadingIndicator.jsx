import "./LoadingIndicator.css";
import { useLoading } from "../../contexts/LoadingContext";

function LoadingIndicator() {
	const { loading, LoadingType } = useLoading();

	if (loading == LoadingType.NONE) return null;

	return (
		<div className="loading-indicator">
			<div className="loading-content">
				<div className="spinner" />
				<p>Loading...</p>
			</div>
		</div>
	);
}

export default LoadingIndicator;