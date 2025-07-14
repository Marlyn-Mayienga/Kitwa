import React,{useState,useEffect} from 'react'
import CreateEvent from './CreateEvent'
import createeventform from '../css/Admin-css/createeventform.css'
import swal from 'sweetalert';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CreateEventForm() {

	const [name, setName] = useState();
	
	const [frequency, setFrequency] = useState();
	const [location, setLocation] = useState();
	const [description, setDescription] = useState();
	const [file, setFile] = useState();
	// const [price, setPrice] = useState();
	const [locationUrl, setLocationUrl] = useState();
	const [organizer, setOrganizer] = useState("");
	const CA_token = "Token" + " " + localStorage.getItem("token");

	// date value
	// formatting date to yyy-mm-dd using  toLocaleDateString

	const formatDate = (date) => {
		const options = { year: "numeric", month: "2-digit", day: "2-digit", hour:"numeric", minute:"numeric" };
		return date.toLocaleDateString('en-US', options);
	};

	const [dateTime, setDateTime] = useState(formatDate(new Date()));

	console.log("show me the date", dateTime);
	const handleDateTime = (e) => {
		const selectedDate = e.target.value;
		setDateTime(selectedDate)
	}
	// get the value of selected organizer

	const handleSelectedOrganizer = (event) => {
		setOrganizer(event.target.value)
	}

	// const change the datatime 


	// fetch all organizers 
	const [organizerList, setOrganizerList] = useState([]);

	const handleAllOrganizers = async() => {
		try {
					const allOrganizers = await fetch(
						"http://127.0.0.1:8000/api/v1/organizer/"
					);
			if (allOrganizers.ok) {
						const resData = await allOrganizers.json();
				if (resData.data) {
							
							setOrganizerList(resData.data.organizers);
						} else {
							swal(resData.message);
						}
					} else {
						swal("no organizers found")
					}
		} catch (error) {
			// swal("something went wrong")
		}
		
	}

	useEffect(() => {
		handleAllOrganizers()
	}, [])
	// console.log("reka ndebe", organizerList[0].id);

	// create event function

	const handleCreateEvents = async () => {
		// console.log("show me this organizer", organizer);
		if (!name || !dateTime || !frequency || !location || !description || !file || !locationUrl || !organizer) {
			swal({
				title: "Error",
				text: "Please fill all fields",
				icon: "error",
				timer:5000
			});
		}

		try {
			const formData = new FormData();
			formData.append("name", name);
			formData.append("dateTime", dateTime);
			formData.append("frequency", frequency);
			formData.append("location", location);
			formData.append("description", description);
			formData.append("file", file);
			formData.append("locationUrl", locationUrl);
			formData.append("organizer",organizer)

			const createEvent = await fetch("http://127.0.0.1:8000/api/v1/event/", {
				method: "POST",
				headers: {
					"Authorization": CA_token,
					// "Content-Type": "multipart/form-data"
				},
				body: formData,
			});	

			if (createEvent.ok) {
				const resCreatedData = await createEvent.json()
				if (resCreatedData.status === 200) {
					// console.log("show me this response data", resCreatedData.data);
					swal("Event created successfully")
					swal({
						title: "Success",
						icon: "success",
						text: "Event created successfully",
						timer: 2000,
					});
					setName("");
					setDateTime(formatDate(new Date()));
					setFrequency("");
					setLocation("");
					setDescription("");
					setFile("");
					setLocationUrl("");
					setOrganizer("");
				} else {
					swal({
						title: "error",
						icon: "error",
						text: "Invalid response format",
						timer:2000
					});
				}
			}
		} catch (error) {
			// swal("Something went wrong!")
			console.error('Error during API request', error);
		}
	}

	// handle go back button while you click on close icon
	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1)
	}
	
  return (
		<div>
			<CreateEvent />
			<div className="overlay">
				<div
					className="overlay-container"
					style={{
						backgroundColor: "#FFFFFF",
						width: "70%",
						marginTop: "4%",
						marginBottom: "1%",
						textAlign: "center",
					}}
				>
					<div className=" m-0 p-0">
						<h4 style={{ fontSize: "24px", fontWeight: "normal" }}>
							Add Event
					  </h4>
					  <i style={{cursor:"pointer"}} onClick={goBack}>close</i>
					</div>
					<div
						className="row"
						style={{
							display: "flex",
							width: "100%",
							justifyContent: "space-around",
						}}
					>
						<div
							className="col-1"
							style={{
								width: "48%",
								textAlign: "left",
								padding: "20px",
							}}
						>
							<div>
								<label>Name</label> <br />
								<input
									type="Text"
									name="name-of-the-event"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>

							<div style={{ display: "flex", gap: "10px" }}>
								<div style={{ flex: 1 }}>
									<label>Date</label> <br />
									<input
										type="datetime-local"
										value={dateTime}
										//   onChange={handleDateTime}
										onChange={(e) => setDateTime(e.target.value)}
									/>
								</div>

								<div style={{ flex: 1 }}>
									<label>Frequency</label> <br />
									<input
										type="Text"
										name="name-of-the-event"
										value={frequency}
										onChange={(e) => setFrequency(e.target.value)}
									/>
								</div>
							</div>
							<div style={{ display: "flex", gap: "10px" }}>
								<div style={{ flex: 1 }}>
									<label>Google Map Location</label> <br />
									<input
										type="Text"
										name="name-of-the-event"
										value={locationUrl}
										onChange={(e) => setLocationUrl(e.target.value)}
									/>
								</div>
								<div style={{ flex: 1 }}>
									<label>Location</label> <br />
									<input
										type="Text"
										name="name-of-the-event"
										value={location}
										onChange={(e) => setLocation(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div
							className="col-1"
							style={{
								width: "48%",
								textAlign: "left",
								padding: "20px",
							}}
						>
							<div>
								<label>Upload media</label> <br />
								<input
								  type="file"
								  id="file"
									name="name-of-the-event"
									// value={file}
									onChange={(e) => setFile(e.target.files[0])}
								/>
							</div>
							<div>
								<label>Description</label> <br />
								<textarea
									name="name-of-the-event"
									style={{
										fontSize: "14px",
									}}
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>

							<div>
								<label htmlFor="event-organizer">Organizer</label> <br />
								<select
									name="event-organizer"
									id="event-organizer"
									style={{
										width: "100%",
										padding: "20px",
									}}
									onChange={handleSelectedOrganizer}
								>
									{organizerList.map((org, index) => {
										return (
											<option key={index} value={org.id}>
												{org.account.first_name} <span> </span>
												{org.account.last_name}
											</option>
										);
									})}
								</select>
							</div>
						</div>
					</div>
					<button
						style={{
							backgroundColor: "#0F75BC",
							color: "#FFF",
							fontSize: "18px",
							fontWeight: "normal",
							padding: "6px 20px",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",

							//
						}}
						onClick={handleCreateEvents}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}

export default CreateEventForm



