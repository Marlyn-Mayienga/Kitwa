import React from 'react'
import Navbar from "../Navigation/Nav";

function Profile() {
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
							<div className="bonga-prof">
								<div className="bonga-profile">
									<img
										src={require("../images/profile.jpg")}
										alt="bonga-profile"
									/>
								</div>
							</div>
							<div className="user-info">
								<div className="user-profile">
									<div className="user-profile-icon">
										<p>
											<i
												class="far fa-user"
												style={{
													padding: "4px",
													color: "#CCC",
													fontSize: "30px",
													fontWeight: "unset",
												}}
											></i>
										</p>
									</div>
									<div className="user-profile-name">
										<p
											style={{
												color: "#CCC",
												fontSize: "24px",
												fontWeight: "unset",
												// paddingLeft: "10px",
											}}
										>
											Alisa Joy
										</p>
									</div>
								</div>
								<div className="user-email">
									<div className="user-email-icon">
										<p>
											<i
												class="far fa-envelope"
												style={{
													// padding: "4px",
													color: "#CCC",
													fontSize: "30px",
													fontWeight: "unset",
												}}
											></i>
										</p>
									</div>
									<div className="user-email-address">
										<p
											style={{
												color: "#CCC",
												fontSize: "24px",
												fontWeight: "unset",
												textDecoration: "underline",
												// paddingLeft: "10px",
											}}
										>
											alisajoy@gmail.com
										</p>
									</div>
								</div>
								<div className="user-phone">
									<div className="user-phone-icon">
										<i
											class="fa fa-phone"
											style={{
												// padding: "4px",
												color: "#CCC",
												fontSize: "30px",
												fontWeight: "unset",
											}}
										></i>
									</div>
									<div className="user-phone-number">
										<p
											style={{
												color: "#CCC",
												fontSize: "24px",
												fontWeight: "unset",
												// paddingLeft: "10px",
											}}
										>
											254728246184
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile
