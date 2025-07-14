
import "../css/Events/eventsWrapper.css";
import { useNavigate} from "react-router-dom";
import EventsContent from './EventsContent';
import Placetovisit from "../Dashboard/Placetovisit";
import Visit from "../Dashboard/Visit";
import { useState } from "react";
import AdminNav from "../Navigation/AdminNav";


const EventWrapper = () => {
	let navigate = useNavigate();
	const [contentHolder, setContentHolder] = useState(null);
	const [activeTab, setActiveTab] = useState(null);


		const user_type = localStorage.getItem("account_type");
		console.log(user_type);
		// account_type;

	const handleAddeventbtn = () => {
		navigate("/createeventform");
	};
	// allevents list holder
	const handleAlleventsList = () => {
		navigate("/eventlist");
	}

	const handleComponentClicked = (id) => {
		setContentHolder(null); // Reset content when a tab is clicked
		setActiveTab(id)
		if (id === "upcoming") {
			setContentHolder(<EventsContent />);
			return
		}
		if (id === "placetovisit") {
			setContentHolder(<Placetovisit />);
			return;
		}
		if (id === "visits") {
			setContentHolder(<Visit />);
			return
		}
	}
	const listofAllEvents = () => {
		
	}

	return (
		<div className="event-container">
			{/* <AdminNav/> */}
			<div id="event-button">
				{/* condition that, if the user is CADMIN they should see the add button but if they are clients/normal users they should also see something else*/}
				{user_type === "CADMIN" ? (
					<div>
						<button type="submit" id="add-event-btn" onClick={handleAddeventbtn}>
							Add
						</button>
						<button type="submit" id="add-event-btn" onClick={handleAlleventsList} style={{margin:"4px"}}>EventsList</button>
					</div>
					
				) : (
					<div className="events-content-container">
						<ul>
							<li
								id="upcoming" onClick={() => handleComponentClicked("upcoming")} className={activeTab === "upcoming" ? "active":" "} >
								<a>Upcoming</a>
							</li>
							<li id="placetovisit" onClick={()=> handleComponentClicked("placetovisit")} className={activeTab === "placetovisit"?"active":" "}>
								<a>Place to Visit</a>
							</li>
							<li id="visits" onClick={()=> handleComponentClicked("visits")} className={activeTab === "visits"? "active":" "}>
								<a>Visits</a>
							</li>
						</ul>
					</div>
				)}
			</div>
			{contentHolder || <EventsContent />}
		</div>
	);
};

export default EventWrapper;
