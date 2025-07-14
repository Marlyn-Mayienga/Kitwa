import React from 'react'
import Navbar from "../Navigation/Nav";


function BongaPoints() {
  return (
		<div className="DashboardContainer">
			<Navbar />
			<div className="bonga-container">
				<div className="bonga-container-content">
					<div className="bonga-menu">
						<div className="menu-item1">
							<div className="item-icon">
								<i
									class="far fa-user"
									style={{
										padding: "4px",
										color: "black",
										fontSize: "20px",
										fontWeight: "lighter",
									}}
								></i>
							</div>
							<div className="item-name">Profile</div>
						</div>
						<div className="menu-item2">
							<div className="item-icon">
								<i class="fas fa-cauldron"></i>
							</div>
							<div className="item-name">Bonga points</div>
						</div>
						<div className="menu-item3">
							<div className="item-icon">
								<i
									class="fa fa-gear"
									style={{
										padding: "4px",
										color: "black",
										fontSize: "20px",
										fontWeight: "thin",
									}}
								></i>
							</div>
							<div className="item-name">Settings</div>
						</div>
					</div>
					<div className="bonga-display">
						<div className="bonga-display-container">
							<div className="points">
								<div className="point-scored">
									{" "}
									<p>500</p>{" "}
								</div>
								<div className="point-total">
									<p>15,000</p>
								</div>
							</div>
							<div className="views">
								<div className="view-name">
									{" "}
									<p>Views</p>{" "}
								</div>
								<div className="views-number">
									<p>150</p>
								</div>
							</div>
							<div className="likes">
								<div className="like-name">
									{" "}
									<p>likes</p>{" "}
								</div>
								<div className="likes-number">
									<p>150</p>
								</div>
							</div>
							<div className="comments">
								<div className="comment-name">
									<p>Comments</p>
								</div>
								<div className="comments-number">
									<p>150</p>
								</div>
							</div>
							<div className="alerts-notification">
								<div className="alert-icon">
									<i
										class="fas fa-circle-exclamation"
										style={{ fontSize: "24px" }}
									></i>
								</div>
								<div className="alert-message">
									<p>Redeem 1 events ticket for 15,000 points</p>
								</div>
							</div>
							<div className="bonga-btn">
								<button>Redeem</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BongaPoints
