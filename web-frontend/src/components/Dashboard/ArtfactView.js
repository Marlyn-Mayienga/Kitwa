import React, { useEffect, useState } from 'react'
import Navbar from "../Navigation/Nav";
import ArtistNav from '../Navigation/ArtistNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEllipsisVertical, faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';



function ArtfactView() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState("");
	const [price, setPrice] = useState("");
	const [event_id, setEvent] = useState();
	const [file, setFile] = useState([]);
	const [overlayVisible, setOverlayVisible] = useState(false);
	const [modificationOverlay, setModificationOverlay] = useState(false);
	const CA_token = "Token" + " " + localStorage.getItem("token");

	const navigate = useNavigate();

	// get all events
	const [allevents, setAllevents] = useState([]);
	// get all artifacts
	const [allArtfacts, setAllArtfacts] = useState([]);

	const closeOverlay = () => {
		setOverlayVisible(false)
	}
	const openOverlay = () => {
		setOverlayVisible(true)
	}

	// open and close the modificationOverlay 
	const openModificationOverlay = () => {
		setModificationOverlay(true)
	}
	const closeModificationOverlay = () => {
		setModificationOverlay(false)
	}

	const handleOrdersList = () => {
		navigate("/artistOrders");
	}
	const getAllEvents = async () => {
		try {
			const response = await fetch("http://127.0.0.1:8000/api/v1/event/", {
				method: "GET",
				headers: {
					Authorization: CA_token,
				},
			});

			if (response.ok) {
				const resData = await response.json();
				if (resData.status === 200) {
					setAllevents(resData.data.events);
				}
			}
		} catch (error) {
			// swal(error);
		}
	};
	useEffect(() => {
		getAllEvents();
	}, []);
	const createArtfact = async() => {
		if (!name || !description || !quantity || !price || !event_id || !file) {
			swal("Please fill all the fields!!");
		}
		
		try {
			const formData = new FormData()
			formData.append("name", name);
			formData.append("description", description);
			formData.append("quantity", quantity);
			formData.append("price", price);
			formData.append("event_id", event_id);
			formData.append("file", file);

			console.log("show me formData", file)
			const createArt = await fetch("http://127.0.0.1:8000/api/v1/artifact/", {
				method: "POST",
				headers: {
					"Authorization": CA_token,
				},
				body: formData,
			});
			if (createArt.ok) {
				const createArtData = await createArt.json();
				console.log("show me this createdArt", createArtData);
				if (createArtData.data) {
					swal({
						title: "successful",
						icon: "success",
						text: "Artifact was created successfully!",
						timer: 2000,
					});
				} else {
					swal({
						title: "Error",
						icon: "error",
						text: createArtData.message,
						timer: 8000
					})
				}
			}
		} catch (error) {
			console.error("Error during API request", error);
		}
	}
	// get all artifacts created

	const getAllArtifacts = async () => {
		try {
			const getAllArt = await fetch("http://127.0.0.1:8000/api/v1/artifact/", {
				method:"GET",
			});

			if (getAllArt.ok) {
				const artData = await getAllArt.json()
				if (artData.data) {
					setAllArtfacts(artData.data)
				}
				else {
					swal(artData.message)
				}
			}
		} catch (error) {
			console.error("Error during API request", error)
		}
	}
	useEffect(() => {
		getAllArtifacts()
	}, [])
	const handleArtifactID = (id) => {
		const idArt= localStorage.setItem("artifact_ID", id)
		console.log("show this arti ID", idArt);
	}
	console.log("show me all artifacts inside", allArtfacts)
  return (
		<div className="DashboardContainer">
			{/* <Navbar /> */}
			<ArtistNav />
			<div
				className="col-md-12 mt-5"
				style={{ textAlign: "right", padding: "0px 90px" }}
			>
				<button
					style={{
						width: "120px",
						padding: "10px",
						border: "none",
						borderRadius: "10px",
						backgroundColor: "#0F75BC",
						color: "white",
					}}
					onClick={openOverlay}
				>
					Add Artifact
				</button>
				<button
					style={{
						width: "120px",
					  padding: "10px",
						margin:"4px",
						border: "none",
						borderRadius: "10px",
						backgroundColor: "#0F75BC",
						color: "white",
					}}
					onClick={handleOrdersList}
				>
					Orders list
				</button>
			</div>
			<div className="container">
				<div className="row bg-white pb-4 border" style={{ width: "98%" }}>
					<div
						className="row m-0 p-0 mb-4"
						style={{
							height: "60px",
							alignItems: "center",
							borderBottom: "1px solid #ccc",
						}}
					>
						<div className="col-md-3">Browse</div>
						<div className="col-md-3">Purchase</div>
					</div>
					<div
						className="row m-0 p-0"
						style={{ justifyContent: "space-evenly" }}
					>
					  {allArtfacts.map((art, index) => {
						  console.log("what is this", art.id);
						  localStorage.setItem("artifact_ID", art.id)
						  return(
						  
						  
						  <div
							  className="col-md-5 m-3 p-0 bg-body-secondary"
							  style={{ borderRadius: "10px", border: "none" }}
						  >
							  <a
								  m-0
								  p-0
								  style={{ textDecoration: "none" }}
								  href="/artfactdetail"
							  onClick={() => handleArtifactID(art.id)}
							  >
								  {art &&
									  art.artifact_files &&
									  art.artifact_files.length > 0 ? (
									  <img
										  src={art.artifact_files[0].file}
										  alt="artifact"
										  style={{
											  width: "100%",
											  height: "340px",
											  objectFit: "cover",
											  borderRadius: "10px 10px 0px 0px",
										  }}
									  />
								  ) : (
									  <img
										  src={require("../images/calabash1.jpg")}
										  alt="Default image"
										  style={{
											  width: "100%",
											  height: "340px",
											  objectFit: "cover",
											  borderRadius: "10px 10px 0px 0px",
										  }}
									  />
								  )}
							  </a>

							  <h6 style={{ margin: "10px" }}>{art.name}</h6>
							  <div className="row d-flex m-2 p-0">
								  <div className="col-3">
									  <img
										  src={require("../images/men-artifact.jpg")}
										  alt="Default Artist"
										  style={{
											  width: "60px",
											  height: "60px",
											  borderRadius: "50%",
											  objectFit: "cover",
											  marginRight: "10px",
										  }}
									  />
								  </div>
								  <div className="col-6 pt-3">
									  <span>
										  {art.artist.account.first_name}{" "}
										  {art.artist.account.last_name}
									  </span>
								  </div>
								  <div
									  className="col pt-3 d-flex"
									  style={{ justifyContent: "end" }}
								  >
									  {/* <span style={{ paddingLeft: "140px" }}>Ksh{art.price}</span> */}
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
												  <a href="/updateartfact">
													  <FontAwesomeIcon
														  icon={faEdit}
														  style={{ paddingRight: "8px" }}
													  />
													  Update
												  </a>
												  <a href="/deleteartfact">
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
						  </div>
					  )})}
					</div>
				</div>
			</div>
			{overlayVisible && (
				<div className="overlay">
					<div
						className="artifact-wrapper bg-white mt-4 "
						style={{
							width: "70%",
							height: "90vh",
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
									Add Artfacts
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
									onClick={closeOverlay}
								/>
							</div>
						</div>
						<div className="row m-0 p-3">
							<div className="col-md-6">
								<label>Name</label> <br />
								<input
									type="text"
									placeholder=""
									id="name"
									style={{ width: "100%", height: "10vh" }}
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="col-md-6">
								<label>Description</label> <br />
								<input
									type="description"
									placeholder=""
									id="description"
									style={{ width: "100%", height: "10vh" }}
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
							<div className="col-md-6">
								<label>Quantity</label> <br />
								<input
									type="text"
									placeholder=""
									id="quantity"
									style={{ width: "100%", height: "10vh" }}
									value={quantity}
									onChange={(e) => setQuantity(e.target.value)}
								/>
							</div>
							<div className="col-md-6">
								<label>Price</label> <br />
								<input
									type="text"
									placeholder=""
									id="price"
									style={{ width: "100%", height: "10vh" }}
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								/>
							</div>
							<div className="col-md-6">
								<label>Event</label> <br />
								<select
									value={event_id}
									onChange={(e) => setEvent(e.target.value)}
								>
									<option value="">Choose event</option> {/* Default value */}
									{allevents.map((eventID, index) => (
										<option key={index} value={eventID.id}>
											{eventID.name}
										</option>
									))}
								</select>
							</div>

							<div className="col-md-6">
								<label>Upload media</label> <br />
								<input
									type="file"
									placeholder=""
									id="file"
									style={{ width: "100%", height: "10vh" }}
									// value={file}
									onChange={(e) => setFile(e.target.files[0])}
								/>
							</div>
							<div className="col-md-7">
								<button
									style={{
										marginTop: "40px",
										width: "60px",
										padding: "10px",
										border: "none",
										borderRadius: "10px",
										backgroundColor: "#0F75BC",
										color: "white",
									}}
									onClick={createArtfact}
								>
									Add
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ArtfactView
