import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navigation/Nav";
import '../css/Events/eventView.css'
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTimes,
	faEllipsisVertical,
	faTrash,
	faEdit,
} from "@fortawesome/free-solid-svg-icons";

function EventView() {
	const CL_token = "Token" + " " + localStorage.getItem("token");
	const [oneEvent, setOneEvent] = useState([]);
	const [eventHolder, setEventHolder] = useState();
	const [eventImageHolder, setEventImageHolder] = useState([]);
	const [hotelsHolder, setHotelsHolder] = useState([]);
	const [eventActivitiesHolder, setEventActivitiesHolder] = useState([]);

	// useNavigate state
	const navigate = useNavigate();

	// pagination of five items list
	const itemsPerPage = 3;
	const [currentPage, setCurrentPage] = useState(1);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = eventActivitiesHolder.slice(
		indexOfFirstItem,
		indexOfLastItem
	);

	const totalPages = Math.ceil(eventActivitiesHolder.length / itemsPerPage);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const [modificationOverlay, setModificationOverlay] = useState(false);

	// open and close the modificationOverlay
	const openModificationOverlay = () => {
		setModificationOverlay(true);
	};

	const closeModificationOverlay = () => {
		setModificationOverlay(false);
	};

	const handleOneEvent = async () => {
		const id = localStorage.getItem("EventId");
		console.log("show me this id", id)
		const eventResponse = await fetch(
			`http://127.0.0.1:8000/api/v1/event/?id=${id}`,
			{
				method: "GET",
				headers: {
					Authorization: CL_token,
				},
			}
		);
		try {
			if (eventResponse.status === 200) {
				// console.log("kubera ikise ndikugera hano?????",eventResponse);
				const resData = await eventResponse.json();
				if (resData.status === 200) {
					console.log("show me one event", resData.data);
					setOneEvent(resData.data);
					console.log(
						"show me events activities",
						resData.data.event.event_files
					);
					setHotelsHolder(resData.data.hotels);
					setEventHolder(resData.data.event);
					setEventActivitiesHolder(resData.data.event.event_activities);
					setEventImageHolder(resData.data.event.event_files);
				} else {
					swal(resData.message);
				}
			} else {
				console.error("show me this", eventResponse.status);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		handleOneEvent();
	}, []);

	// user freedom and control

	const goBack = () => {
		navigate(-1);
	};
	console.log("show me the size of these hotels", hotelsHolder);

	return (
		<div className="wrapper-page">
			<Navbar />
			<div className="Event-detail-Container">
				<div className="row m-0 p-0" style={{ width: "100%" }}>
					{/* take the image of that event and make it a background */}
					{eventImageHolder.map((eventImages, index) => (
						<img
							key={index}
							className="thumbnail-bg"
							style={{ objectFit: "cover", width: "100%", height: "100%" }}
							src={
								eventImageHolder.length > 0 && eventImageHolder[0].file
									? eventImageHolder[0].file
									: require("../images/culture-dance.jpg")
							}
						/>
					))}
				</div>
				{/* go back icon */}
				<div className="row">
					<div className="col-lg-12">
						<button className="btn btn-lg" onClick={goBack}>
							<span>
								<i
									className="fa-solid fa-arrow-left fa-fw"
									style={{ borderRadius: "50%", fontSize: "60px" }}
								></i>
							</span>
						</button>
					</div>
				</div>
				<div className="description-wrapper">
					<div className="content-wrap">
						<div className="row">
							<div className="col-10">
								<h2 style={{ textAlign: "center" }}>
									{eventHolder ? eventHolder.name : <p>loading.....</p>}
								</h2>
							</div>
							<div className="col-1">
								<div className="dropdown">
									<button
										style={{
											border: "none",
											backgroundColor: "transparent",
										}}
										onClick={openModificationOverlay}
									>
										<FontAwesomeIcon
											icon={faEllipsisVertical}
											style={{ fontSize: "24px" }}
										/>
									</button>
									{modificationOverlay && (
										<div className="dropdownAction" style={{}}>
											<a href="/update-event">
												<FontAwesomeIcon
													icon={faEdit}
													style={{ paddingRight: "8px" }}
												/>
												Update
											</a>
											<a href="/delete-event">
												<FontAwesomeIcon
													icon={faTrash}
													style={{ paddingRight: "8px" }}
												/>
												Delete
											</a>
										</div>
									)}
								</div>
							</div>
						</div>
						<p>
							{eventHolder ? eventHolder.description : "description loading"}
						</p>
						<div className="horizontal-container">
							<div
								className="lineStyle"
								style={{ borderLeft: "5px solid green" }}
							></div>
							<h5 className="hotel" style={{ marginLeft: "14px" }}>
								Event Activity
							</h5>
						</div>
						<div className="hotel-lists">
							{currentItems.map((eventActivity, index) => (
								<ul
									key={index}
									style={{
										backgroundColor: "#EEEEEE",
										padding: "20px",
										borderRadius: "5px",
										listStyle: "none",
									}}
								>
									<li>{eventActivity.title}</li>
								</ul>
							))}
							<div className="pagination">
								<button
									onClick={() => handlePageChange(currentPage - 1)}
									disabled={currentPage === 1}
									style={{ borderRadius: "5px", border: "none" }}
								>
									Prev
								</button>
								<span>{currentPage}</span> / <span>{totalPages}</span>
								<button
									onClick={() => handlePageChange(currentPage + 1)}
									disabled={currentPage === totalPages}
									style={{ borderRadius: "5px", border: "none" }}
								>
									Next
								</button>
							</div>
						</div>

						<div className="horizontal-container">
							<div className="lineStyle"></div>
							<h5 className="hotel" style={{ marginLeft: "14px" }}>
								Hotels
							</h5>
						</div>

						<div
							className="hotel-images-container"
							style={{ marginTop: "20px", overflowX: "auto" }}
						>
							<div className="hotel-images">
								{hotelsHolder.map((hotelImage, index) => (
									<div className="thumbnail1" key={index}>
										<a
											href={hotelImage.link}
											target="_blank"
											rel="noopener noreferrer"
											style={{ textDecoration: "none" }}
											// style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
										>
											<img
												style={{
													width: "100%",
													height: "200px",
													objectFit: "cover",
													borderRadius: "5px",
												}}
												src={hotelImage.image}
												alt={`Hotel Image ${index + 1}`}
											/>
											<p>{hotelImage.name}</p>
										</a>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EventView
