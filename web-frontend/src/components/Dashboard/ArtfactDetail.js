import React, { useState, useEffect } from 'react'
import ArtfactView from './ArtfactView';
import swal from 'sweetalert';
import {useNavigate } from 'react-router-dom';

function ArtfactDetail() {
	const url = require("../images/calabash.jpg");
	const [overlayVisible, setOverlayVisible] = useState(true);
	const [oneArtfact, setOneArtfact] = useState([]);

	const navigate = useNavigate();

	const closeOverlay = () => {
		setOverlayVisible(false);
	};

	// get one artifact created

	const getOneArtifact = async () => {
		try {
			const id = localStorage.getItem("artifact_ID")
			const getOneArt = await fetch(
				`http://127.0.0.1:8000/api/v1/artifact/?id=${id}`,
				{
					method: "GET",
				}
			);

			if (getOneArt.ok) {
				const artData = await getOneArt.json();
				if (artData.data) {
					setOneArtfact(artData.data);
				} else {
					swal(artData.message);
				}
			}
		} catch (error) {
			console.error("Error during API request", error);
		}
	};
	useEffect(() => {
		getOneArtifact();
	}, []);

	//  buy an artifact

	const buyArtifact = async (id) => {
		localStorage.setItem("artifactID", id);
		navigate("/buyArtifact")
	}
	// console.log("bgimage", oneArtfact)
	return (
		<div className="DashboardContainer">
			<ArtfactView />
			{overlayVisible && (
				<div className="overlay">
					{oneArtfact.map((oneArt, index) => {
						// console.log("bgImage", oneArt.artifact_files[0].file);
						// console.log("bgImage ID ", oneArt.id);
						const bgImg = oneArt.artifact_files[0].file;
						return (
							<div
								className="overlay-container"
								style={{ backgroundColor: "#E8E8E8", width: "40%" }}
							>
								<div
									className="visit-details"
									style={{
										// backgroundImage: `url(${url})`,
										backgroundImage: `url(${ bgImg })`,
										backgroundSize: "cover",
										height: "30%",
									}}
								>
									<i
										class=" fa fa-chevron-left"
										style={{
											padding: "20px",
											color: "white",
											fontSize: "12px",
										}}
										onClick={closeOverlay}
									></i>
									<div className="visit-details-content">
										<div
											className="visit-details-content-date"
											style={{ width: "40%", height: "30%", marginTop: "40px" }}
										>
											<span>{oneArt.name}</span>
											<span style={{ fontWeight: "lighter" }}>
												Ksh {oneArt.price}
											</span>
										</div>
										<div
											className="visit-details-content-location"
											style={{
												width: "50%",
												textAlign: "right",
											}}
										>
											<button
												style={{
													textAlign: "center",
													color: "white",
													border: "none",
													borderRadius: "5px",
													fontSize: "18px",
													padding: "10px 40px 10px 40px",
													marginTop: "40px",
													backgroundColor: "#1B84E6",
												}}
												onClick={() => {
													buyArtifact(oneArt.id);
												}}
											>
												Buy
											</button>
										</div>
									</div>
								</div>
								<div className="visit-documentation">
									<div
										className="visit-documentation-format-card"
										style={{
											backgroundColor: "white",
											width: "90%",
											margin: "20px 20px 20px 0px",
											borderRadius: "5px",
										}}
									>
										<p style={{ padding: "20px" }}>{oneArt.description}</p>
									</div>
									<p>Photos</p>
									<div
										className="visit-documentation-card"
										style={{
											backgroundColor: "white",
											borderRadius: "5px",
											width: "90%",
										}}
									>
										<div
											className="visit-image-card"
											style={{
												width: "50%",
												padding: "20px 0px",
												paddingLeft: "10px",
											}}
										>
											<img
												src={require("../images/calabash1.jpg")}
												alt="calabash1"
											/>
										</div>
										<div
											className="visit-image-card"
											style={{ width: "50%", padding: "20px 2px" }}
										>
											<img
												src={require("../images/calabash2.jpg")}
												alt="calabash2"
											/>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default ArtfactDetail
