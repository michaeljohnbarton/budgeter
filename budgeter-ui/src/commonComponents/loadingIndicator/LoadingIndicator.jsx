import styles from "./LoadingIndicator.module.css";
import { useLoading } from "../../contexts/LoadingContext";

function LoadingIndicator() {
	const { loading, LoadingType } = useLoading();

	if (loading == LoadingType.NONE) return null;

	return (
		<div className={styles.loadingIndicator}>
			<div className={styles.loadingContent}>
				<div className={styles.spinner} />
				<p>Loading...</p>
			</div>
		</div>
	);
}

export default LoadingIndicator;