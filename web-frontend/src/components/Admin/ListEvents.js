import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import swal from 'sweetalert';
import AdminNav from '../Navigation/AdminNav';

function ListEvents() {

	const [rows, setRows] = useState([]); // state to hold fetched data
	const columns = [
		// { field: "id", headerName: "ID", width: 260 },
		{ field: "name", headerName: "Name", width: 120 },
		{ field: "description", headerName: "Description", width: 200 },
		{ field: "event_address", headerName: "Location", width: 160 },
		{ field: "event_address_link", headerName: "Address Link", width: 160 },
		{ field: "date", headerName: "Date", width: 160 },
		{ field: "frequency", headerName: "Frequency", width: 130 },
		{ field: "organizer ", headerName: "Organizer", width: 130 },
	];

    const listallevents = async () => {

		try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/event/");
           
			if (response.ok) {
                const resData = await response.json();
                
                
                if (resData.status === 200) {
                    // console.log("show me this", resData.data.events);
					// Assuming the data from the API is an array of event objects
					setRows(resData.data.events);
				} else {
					// const errorMessage = await resData.json();
					swal("errorMessage message");
				}
			} else {
				console.error("Failed to fetch data from the API");
			}
		} catch (error) {
			console.log("You are not authorized", error);
		}
	};

	// fetch data from the API when the components mount
	useEffect(() => {
		listallevents();
    }, []);
    
	return (
		<div className="DashboardContainer">
			{/* nav component */}
			<AdminNav />
			<div className="container">
				<div className="container-content">
					<div
						className="Add-event-btn"
						style={{ textAlign: "right", marginTop: "-60px" }}
					>
						<a href="">
							<button
								style={{
									padding: "10px 28px",
									margin: "10px 0px",
									color: "white",
									backgroundColor: "#0F75BC",
									border: "none",
									borderRadius: "4px",
									fontSize: "18px ",
									//  textAlign:"right"
								}}
								// onClick={ handleAddeventbtn }
							>
								Copy Invite Link
							</button>
						</a>
					</div>
					<div className="dashboard-container">
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={6}
							// checkboxSelection
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListEvents
