import tableStyles from './DataTable.module.css';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import clsx from 'clsx';

function DataTable({ dataRecords, currentRowRef, dataRecordName, setDataRecord, setIsModalOpen, deleteDataRecord }) {
	function capitalizeFirstLetter(string) {
		return !string ? "" : string.charAt(0).toUpperCase() + string.slice(1);
	}

	const handleEditClick = (dataRecord) => {
		setDataRecord(dataRecord);
		setIsModalOpen(true);
	};

	const handleDeleteClick = async (dataRecordId) => {
		const confirmDelete = window.confirm(
			`Are you sure you want to delete this ${dataRecordName}? This action cannot be undone.`
		);
		if (!confirmDelete) return;

		try {
			await deleteDataRecord(dataRecordId);
			toast.success(`${capitalizeFirstLetter(dataRecordName)} deleted successfully`);
		}
		catch (error) {
			toast.error(error.message || `Failed to delete ${dataRecordName}`);
		}
	};

	return (
		<div className={tableStyles.tableWrapper}>
			<table className={tableStyles.table}>
				<tbody>
					{dataRecords.map((dataRecord) => {
						return (
							<tr
								key={dataRecord.id}
								ref={(dataRecord.isCurrent ?? false) ? currentRowRef : null}
								className={(dataRecord.isCurrent ?? false) ? tableStyles.currentRecord : undefined}
							>
								<td>{dataRecord.displayName ?? dataRecord.name}</td>
								<td>
									{/* Delete and edit ordered this way because of float right CSS */}
									<button
										className={clsx(tableStyles.iconButton, tableStyles.delete)}
										onClick={() => handleDeleteClick(dataRecord.id)}
										aria-label="Delete"
									>
										<FaTrash />
									</button>

									<button
										className={clsx(tableStyles.iconButton, tableStyles.edit)}
										onClick={() => handleEditClick(dataRecord)}
										aria-label="Edit"
									>
										<FaEdit />
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	)
}

export default DataTable;