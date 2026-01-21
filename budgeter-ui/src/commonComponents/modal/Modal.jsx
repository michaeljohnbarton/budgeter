import styles from "./Modal.module.css";

function Modal({ isOpen, onClose, onSave, isSaveEnabled, title, children, hasUnsavedChanges }) {
	if (!isOpen) return null;

	const handleClose = () => {
		if (hasUnsavedChanges) {
			const confirmClose = window.confirm(
				"You have unsaved changes. Are you sure you want to discard them?"
			);
			if (!confirmClose) return;
		}
		onClose();
	};

	const handleSave = () => {
		onSave();
	};

	return (
		<>
			<div className={styles.modalBackdrop} onClick={handleClose} />

			<div className={styles.modal}>
				<div className={styles.modalHeader}>
					<h2>{title}</h2>
				</div>
				<div className={styles.modalBody}>{children}</div>
				<div className={styles.modalFooter}>
					<button onClick={handleClose}>Cancel</button>
					<button onClick={handleSave} disabled={!isSaveEnabled}>Save</button>
				</div>
			</div>
		</>
	);
}

export default Modal;
