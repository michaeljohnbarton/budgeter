import "./Modal.css";

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
			<div className="modal-backdrop" onClick={handleClose} />

			<div className="modal">
				<div className="modal-header">
					<h2>{title}</h2>
				</div>
				<div className="modal-body">{children}</div>
				<div className="modal-footer">
					<button onClick={handleClose}>Cancel</button>
					<button onClick={handleSave} disabled={!isSaveEnabled}>Save</button>
				</div>
			</div>
		</>
	);
}

export default Modal;
