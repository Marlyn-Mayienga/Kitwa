import React, {useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import ArtistNav from '../Navigation/ArtistNav';
import swal from 'sweetalert';

function ArtistOrder() {
	const columns = [
		{ field: "id", headerName: "ID", width: 40 },
		{ field: "artifact", headerName: "Artifact Name", width: 220, renderCell: (params) => params.row.artifact.name },
		{field:"client",headerName:"Client Name", width:220, renderCell:(params)=>params.row.client.account.first_name},
		{ field: "payed", headerName: "Payed", width: 220 },
		{ field: "delivared", headerName: "Delivered", width: 120 },
		{ field: "delivery_address", headerName: "Location", width: 120 },
	];
	const [rows, setRows] = useState([]);
	// get client Token
	const Artist_token = "Token" + " " + localStorage.getItem("token");
	const handleAllArtistorderList = async () => {
		try {
			const allclientorders = await fetch(
				"http://127.0.0.1:8000/api/v1/sales/",
				{
					method: "GET",
					headers: {
						Authorization: Artist_token,
						"Content-type": "application/json",
					},
				}
			);

			const responseData = await allclientorders.json();

			if (responseData.status === 200) {
				setRows(responseData.data);
			}
		} catch (error) {
			swal("something went wrong");
		}
	};

	useEffect(() => {
		handleAllArtistorderList();
	}, []);
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
			<ArtistNav />
			<div className="organizer-wrapper">
				<h3>List of all orders </h3>
				<DataGrid rows={rows} columns={columns.concat(actionColumn)} />
			</div>
		</div>
	);
}
export default ArtistOrder
