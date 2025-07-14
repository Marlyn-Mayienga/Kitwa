import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import AdminNav from '../Navigation/AdminNav';

function EventList() {
	const columns = [
		{ field: "id", headerName: "ID", width: 40 },
		{ field: "name", headerName: "Name", width: 220 },
		{ field: "date", headerName: "Date", width: 220 },
		{ field: "price", headerName: "Price", width: 120 },
	];
	const rows = [
		{ id: 1, name: "Brocken Calabash", date: "1/12/2023", price: "Ksh, 5000" },
		{
			id: 2,
			name: "Egyptian Sculpture",
			date: "18/12/2023",
			price: "Ksh, 20000",
		},
		{ id: 3, name: "Brocken Calabash", date: "20/12/2023", price: "Ksh, 5000" },
	];
	const actionColumn = [
		{
			field: "action",
			headerName: " ",
			width: 220,
			renderCell: (params) => {
				return (
					<div
						className="cellAction"
						style={{
							display: "flex",
							justifyContent: "space-evenly",
							width: "220px",
						}}
					>
						<div className="updateButton">
							<button type="button" class="btn btn-outline-primary">
								Update
							</button>
						</div>
						<div className="cancelButton">
							<button type="button" class="btn btn-outline-danger">
								Delete
							</button>
						</div>
					</div>
				);
			},
		},
	];

	return (
		<div className="organizer-container">
			<AdminNav />
			<div className="organizer-wrapper">
				<h3>List of all events </h3>
				<DataGrid rows={rows} columns={columns.concat(actionColumn)} />
			</div>
		</div>
	);
}

export default EventList
