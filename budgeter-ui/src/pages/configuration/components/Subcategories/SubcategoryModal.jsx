import Modal from '../../../../commonComponents/modal/Modal';

function SubcategoryModal({isOpen, setIsModalOpen}) {
	const isEditMode = false;
	const title = isEditMode ? "Edit Subcategory" : "Add Subcategory";

	const handleSave = async () => {
		handleClose();
	};

	const handleClose = () => {
		setIsModalOpen(false);
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} onSave={handleSave} isSaveEnabled={true} title={title} hasUnsavedChanges={false}>
			<p>Subcategory modal content goes here.</p>
		</Modal>
	)
};

export default SubcategoryModal;