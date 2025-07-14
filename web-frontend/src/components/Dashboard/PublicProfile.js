import React from 'react'
import Navbar from "../Navigation/Nav";


function PublicProfile() {
  return (
		<div className="DashboardContainer">
			<Navbar />
			<div className="profile-container">
				<div className="profile-content">
					<div className="profileImage">
						<img
							src={require("../images/profile.jpg")}
							style={{
								width: "20%",
								height: "100%",
								objectFit: "cover",
								borderRadius: "50%",
								marginTop: "-60px",
								border: "6px solid #FFFFFF",
								//   padding: "10px",
							}}
							alt="profile"
						/>
					</div>
					<div className="profile-details">
						<div
							className="profile-name"
							style={{
								textAlign: "center",
								marginTop: "-60px",
							}}
						>
							<h1
								style={{
									fontSize: "28px",
									fontWeight: "thin",
								}}
							>
								Alisa Joy
							</h1>
							<button
								className="btn"
								style={{
									color: "white",
									backgroundColor: "#1B84E6",
									border: "none",
									fontSize: "20px",
									padding: "8px 20px",
									borderRadius: "5px",
								}}
							>
								Follow
							</button>
						</div>
						<div className="profile-media">
							<div className="profile-media-video">
								<p>
									<a
										href="#"
										style={{
											color: "skyblue",
											fontWeight: "normal",
											fontSize: "20px",
										}}
									>
										Videos
									</a>
								</p>
								<div className="profile-media-video-card">
									<div className="card-image">
										<img
											src={require("../images/accomodation.jpg")}
											alt="video"
											className="card-img"
											// style={{
											// 	width: "40%",
											// 	objectFit: "cover",
											// 	padding: "0px 4px 0px 0px",
											// }}
										/>
									</div>
									<div className="card-image">
										<img
											src={require("../images/culture-dance.jpg")}
											alt="video"
											className="card-img"
										/>
									</div>
								</div>
							</div>
							<div className="profile-media-photoes">
								<p>
									<a
										href="#"
										style={{
											color: "skyblue",
											fontWeight: "normal",
											fontSize: "20px",
										}}
									>
										Photos
									</a>
								</p>
								<div className="profile-media-photoes-card">
									<div className="card-image">
										<img
											src={require("../images/accomodation.jpg")}
											alt="video"
											className="card-img"
										/>
									</div>
									<div className="card-image">
										<img
											src={require("../images/lake.jpeg")}
											alt="video"
											className="card-img"
										/>
									</div>{" "}
									<div className="card-image">
										<img
											src={require("../images/culture-dance.jpg")}
											alt="video"
											className="card-img"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div></div>
		</div>
	);
}

export default PublicProfile
