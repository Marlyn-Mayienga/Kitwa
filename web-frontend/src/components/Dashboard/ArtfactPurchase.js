import React from 'react'
import Navbar from "../Navigation/Nav";

function ArtfactPurchase() {
  return (
		<div className="DashboardContainer">
			<Navbar />
			<div className="container">
				<div className="container-content">
					<div className="container-breadcumb">
						<ul>
							<li>
								<a href="/"> Browse </a>
							</li>
							<li>
								<a href="/"> Purchase</a>
							</li>
						</ul>
					</div>
					<hr />
					<div className="visit-container" style={{ borderRight: "none" }}>
						<div className="visit-description1">
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
		</div>
	);
}

export default ArtfactPurchase
