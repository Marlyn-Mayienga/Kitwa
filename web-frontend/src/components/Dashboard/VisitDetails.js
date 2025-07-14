import React from 'react'
import Navbar from "../Navigation/Nav";


function VisitDetails() {
  return (
		<div className="DashboardContainer">
			<Navbar />
			<div className="container">
				<div className="container-content">
					{/* <BreadBar /> */}
					<hr />
					<div className="visit-container">
						<div className="visit-description1">
							<div className="visit-date">
								<span>14</span>
								<span style={{ fontWeight: "lighter" }}>FEB</span>
							</div>
							<div class="line"></div>
							<div className="visit-image">
								<img
									src={require("../images/culture-dance.jpg")}
									alt="culture-dance"
								/>
							</div>
							<div className="visit-location">
								<span>Godmesa</span>
								<span style={{ color: "#CCC", fontSize: "18px" }}>2 media</span>
							</div>
							<div className="arrow-icon">
								<i class="fa fa-chevron-right"></i>
							</div>
						</div>
						<div className="visit-description2">
							<div className="visit-date">
								<span style={{ color: "black" }}>10</span>
								<span style={{ fontWeight: "lighter", color: "black" }}>
									JAN
								</span>
							</div>
							<div class="line"></div>
							<div className="visit-image">
								<img src={require("../images/lake.jpeg")} alt="culture-dance" />
							</div>
							<div className="visit-location">
								<span>Tobongu Lore</span>
								<span style={{ color: "#CCC", fontSize: "18px" }}>3 media</span>
							</div>
							<div className="arrow-icon">
								<i class="fa fa-chevron-right"></i>
							</div>
						</div>
						<div className="visit-description3">
							<div className="visit-date">
								<span style={{ color: "black" }}>12</span>
								<span style={{ fontWeight: "lighter", color: "black" }}>
									Dec
								</span>
							</div>
							<div class="line"></div>
							<div className="visit-image">
								<img
									src={require("../images/egyptian-artifact.jpg")}
									alt="culture-dance"
								/>
							</div>
							<div className="visit-location">
								<span>Rusinga</span>
								<span style={{ color: "#CCC", fontSize: "18px" }}>1 media</span>
							</div>
							<div className="arrow-icon">
								<i class="fa fa-chevron-right"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="overlay">
				<div className="overlay-container">
					<div className="visit-details">
						<i
							class=" fa fa-chevron-left"
							style={{ padding: "20px", color: "white", fontSize: "12px" }}
						></i>
						<div className="visit-details-content">
							<div className="visit-details-content-date">
								<span>14</span>
								<span style={{ fontWeight: "lighter" }}>FEB</span>
							</div>
							<div className="visit-details-content-image">
								<img
									src={require("../images/culture-dance.jpg")}
									alt="culture-dance"
								/>
							</div>
							<div className="visit-details-content-location">
								<p style={{ color: "white", fontSize: "20px" }}>Godmesa</p>
							</div>
						</div>
					</div>
					<div className="visit-documentation">
						
							<a href="/visitdocumentation" style={{textDecoration:"none"}}>Document your visit</a>
						
						<div className="visit-documentation-format-card">
							<div className="text-format">
								<i class="fa fa-pen-to-square"></i>
							</div>
							<div className="image-format">
								<i class="far fa-images"></i>
							</div>
							<div className="video-format">
								<i class="far fa-images"></i>
							</div>
						</div>
						<div className="visit-documentation-card">
							<div className="visit-image-card">
								<img
									src={require("../images/accomodation.jpg")}
									alt="accomodation"
								/>
							</div>
							<div className="visit-video-card">
								<img src={require("../images/hotel room.jpg")} alt="hotel" />
							</div>
						</div>
						<div className="visit-reviews">
							<p style={{ color: "skyblue", fontSize: "20px" }}>My Reviews</p>
							<div className="visit-reviews-card">
								<div className="visit-reviews-card-image">
									<img src={require("../images/profile.jpg")} alt="profile" />
								</div>
								<div className="visit-reviews-card-content">
									<p>Alisa Joy</p>
									<i class="fas fa-star"></i>
									<i class="fas fa-star"></i>
									<i class="fas fa-star"></i>
									<i class="far fa-star"></i>
									<i class="far fa-star"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VisitDetails
