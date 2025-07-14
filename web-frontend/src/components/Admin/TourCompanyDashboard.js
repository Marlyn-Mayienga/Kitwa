import React from 'react'
import AdminNav from "../Navigation/AdminNav";
import { DataGrid } from "@mui/x-data-grid";

function TourCompanyDashboard() {

    const columns = [
			{ field: "id", headerName: "ID", width: 70 },
			{ field: "name", headerName: "Name", width: 260 },
			{ field: "status", headerName: "Status", width: 200 },
			{ field: "date", headerName: "Date Added", width: 160 },
			{ field: "events", headerName: "Events", width: 160 },
			{ field: "edit", headerName: "", width: 130 },
		];
    const rows = [
        { id:1, name: "Jean Yves", status: "Approved", date: "10/20/2023", events: "2"},
        { id:2, name: "Jean Yves", status: "Approved", date: "10/20/2023", events: "2"},
        { id:3, name: "Jean Yves", status: "Pending", date: "10/20/2023", events: "2"},
        { id:4, name:"Jean Yves", status:"Pending", date:"10/20/2023", events:"2"}
    ]
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

export default TourCompanyDashboard
