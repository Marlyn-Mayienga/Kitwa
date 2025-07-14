import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import swal from 'sweetalert';
import AdminNav from '../Navigation/AdminNav';
import '../css/Admin-css/organizer.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



function Organizerlist() {
    const [rows, setRows] = useState([])
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [email, setEmail] = useState("");
	const [active, setActive] = useState(false);
    

    const handleOverlay = () => {
		    setIsOverlayOpen(true);
    };
    const handleCloseOverlay = () => {
        setIsOverlayOpen(false);
    }
    
    const columns = [
			{ field: "first_name", headerName: "First Name", width: 120 },
			{ field: "last_name", headerName: "Last Name", width: 120 },
			{ field: "email", headerName: "Email", width: 220 },
			{ field: "is_active", headerName: "Status", width: 120 },
			{ field: "date_joined", headerName: "Date", width: 180 },
    ];

    
    const actionColumn = [
    {field:"action", headerName:" ", width:250,
    renderCell:(params)=>{
        return(
            <div className="cellAction">
                {/* <div className="viewButton"><button type="button" class="btn btn-outline-secondary" onClick={()=>{EnvId(params.row.id)}}>View</button></div> */}
                <div className="updateButton"><button type="button" class="btn btn-outline-primary" onClick={handleOverlay}>Update</button></div>
                {/* <div className="deleteButton"><button type="button" class="btn btn-outline-danger" onClick={()=>{deleteEnv(params.row.id)}}><CIcon icon={cilTrash} size="lg"/></button></div> */}
            </div>
        )
    }}
    ]

    // handle selected row
    const handleSelectedRow =  (params) => {
        const rowData = params.row;
        setEmail(rowData.email);
        setActive(rowData.is_active);
        // console.log("show me the status of this row", active)
    }
    const CA_token = "Token" + " " + localStorage.getItem("token")
    
    const handleAllDeactivatedAccounts = async (e) => {
        
        try {
            const findAllAccounts = await fetch("http://127.0.0.1:8000/api/v1/admin/activate/", {
							method: "GET",
							headers: {
								"Authorization": CA_token,
							},
            });
            if (findAllAccounts.ok) {
                const resData = await findAllAccounts.json()
                if (resData.data) {
                    setRows(resData.data.accounts)
                } else {
                    swal(resData.message)
                }
            } else {
                swal("something went wrong")
            }
        } catch (error) {
            
        }
    }
    useEffect(() => {
        handleAllDeactivatedAccounts();
    }, [])

    // update organizer accounts function

    const updateOrganizerAccounts = async (e) => {
        try {
            let item = {};
            if (active === "True") {
                item ={email, active:true}
            } else {
                item = { email, active:false};
            }
            
            const updateData = await fetch(
							"http://127.0.0.1:8000/api/v1/admin/activate/",
							{
								method: "PUT",
								headers: {
									"Authorization": CA_token,
									"Content-Type": "application/json",
								},
								body: JSON.stringify(item),
							}
						);
            if (updateData.ok) { 
                const resData = await updateData.json()
                if(resData.data){
									swal({
										title: "Success",
										message: "Organizer Account was Approved",
										icon: "Success",
										timer: 1000,
									});
									setIsOverlayOpen(false);
                } else {
                    swal(resData.message)
                                }
            } else {
                swal("something went wrong")
            }
            
        } catch (error) {
            
        }
        
    }

    return (
			<div className="organizer-container">
				<AdminNav />
				<div className="organizer-wrapper">
					<h3>All Desactivated Accounts (Organizers, Artists, Tour Companies) </h3>
					<div>
						<DataGrid
							rows={rows}
							columns={columns.concat(actionColumn)}
							onRowClick={handleSelectedRow}
							// pageSize={6}
							// rowsPerPageOptions={[5]}
							style={{ backgroundColor: "white" }}
						/>
					</div>
				</div>
				{isOverlayOpen && (
					<div className="overlay-wrapper">
						<div className="update-form">
							<label>Email</label>
							<input
								type="text"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<label>Status</label>
							{/* <input type="text" name="staus" value={active} onChange={(e) => setActive(e.target.value)} /> */}
							<select type="text" name="status" value={active} onChange={(e)=>setActive(e.target.value)}>
								<option value="True">True</option>
								<option value="False">False</option>
							</select>
							<div className="overlay-btn">
								<button
									type="submit"
									class="btn btn-outline-primary"
									onClick={updateOrganizerAccounts}
								>
									Update
								</button>
								<button
									type="button"
									class="btn btn-outline-danger"
									onClick={handleCloseOverlay}
								>
									Close
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		);
}

export default Organizerlist
