import "./LoadingIndicator.css";

function LoadingIndicator({ show }) {
	if (!show) return null;

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