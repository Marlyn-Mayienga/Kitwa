import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function DeleteEvent() {

    const navigate = useNavigate()
    const id = localStorage.getItem("EventId");
	const CAdmin_token = "Token" + " " + localStorage.getItem("token");
    const handleDeleteEvent = async () => {
        try {    
        const deleteEvent = await fetch(
					`http://127.0.0.1:8000/api/v1/event/?id=${id}`,
					{
						method: "DELETE",
						headers: {
							Authorization: CAdmin_token,
						},
					}
            );
            const deleteEventData = await deleteEvent.json()
            console.log("show me delete content", deleteEventData);
            if (deleteEventData.status === 200) {
							swal("Event Deleted Successfully!", {
                                icon: "success",
                                timer:1000,
							});
            }
            navigate("/createevent");
        } catch (error) {
            
        }
    }
  return (
		<div className="overlay">
			<div
				className="artifact-wrapper bg-white mt-4 "
				style={{
					width: "40%",
					height: "50vh",
					border: "none",
					borderRadius: "10px",
				}}
			>
				<div className="row m-0">
					<div className="col-md-7">
						<h6
							style={{
								height: "10vh",
								textAlign: "right",
								marginTop: "20px",
							}}
						>
							Delete Artfacts
						</h6>
					</div>
					<div className="col" style={{ textAlign: "right" }}>
						<FontAwesomeIcon
							icon={faTimes}
							style={{
								color: "#e91607",
								fontSize: "52px",
								cursor: "pointer",
							}}
							// onClick={closeOverlay}
						/>
					</div>
				</div>
				<div className="row m-0 p-3">
					<div className="col-12">
						<p>
							Are you sure, do you want to delete this{" "}
                          <span style={{ color: "red" }}>Event</span> ?
						</p>
					</div>

					<div className="col-md-7">
						<button
							style={{
								marginTop: "40px",
								width: "80px",
								padding: "10px",
								border: "none",
								borderRadius: "10px",
								backgroundColor: "#0F75BC",
								color: "white",
							}}
							onClick={handleDeleteEvent}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);

}

export default DeleteEvent
