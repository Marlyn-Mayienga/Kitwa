import React, { useState, useEffect } from "react";
import "../css/Events/eventsWrapper.css";
import swal from "sweetalert";

const EventsContent = () => {
	const [allEvents, setAllEvents] = useState([]);
	const CL_token = "Token" + " " + localStorage.getItem("token");
	// Admin user_type not yet being created
	// const CA_token

	const getAllEvents = async () => {
		try {
			const response = await fetch("http://127.0.0.1:8000/api/v1/event/", {
				method: "GET",
				headers: {
					Authorization: CL_token,
				},
			});

			if (response.ok) {
				const resData = await response.json();
				if (resData.status === 200) {
					setAllEvents(resData.data.events);
				}
			}
		} catch (error) {
			// swal(error);
		}
	};
	useEffect(() => {
		getAllEvents();
	}, []);
	console.log("show me all events", allEvents);
	const handleEventID = (id) => {
		localStorage.setItem("EventId", id);
	};

	return (
		<div>
			<div id="event-wrapper">
				{allEvents.map((event, index) => {
					let date = new Date(event.date);
					let year = date.getFullYear();
					let month = new Intl.DateTimeFormat("en-US", {
						month: "short",
					}).format(date);
					let day = date.getDate();
					//   let formattedDate = `${year}, ${month}, ${day}`;
					return (
						<div id="left-post" key={index}>
							<img
								id="thumbnail"
								// src={require("../images/culture-dance.jpg")}
								src={
									event.event_files.length > 0
										? event.event_files[0].file
										: require("../images/culture-dance.jpg")
								}
							/>
							<div className="left-post-wrapper">
								<div className="post-info">
									<h3 id="post-header">{event.name}</h3>
									<p id="post-preview">{event.description}</p>

									<a
										href="/eventdetail"
										style={{ textDecoration: "none" }}
										onClick={() => handleEventID(event.id)}
									>
										{/* View{event.id} */}
										View More
									</a>
								</div>
								<div id="post-date" style={{ margin: "0" }}>
									<span style={{ fontWeight: "bold" }}>{day}</span>
									<span>{month}</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default EventsContent;
