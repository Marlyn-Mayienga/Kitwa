import React from 'react'
import Navbar from "../Navigation/Nav";

function Settings() {
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
						<div className="settings-container">
							<div className="settings-card">
								<h3>Notifications</h3>
								<div className="Notification-card">
									<div className="sounds">
										<div className="Notification-text">
											<p>Sounds</p>
										</div>
										<div className="Notification-icon">
											<p>Icon</p>
										</div>
									</div>
									<div className="vibrate">
										<div className="Vibration-text">
											<p>Vibrate</p>
										</div>
										<div className="Vibration-icon">
											<p>Icon</p>
										</div>
									</div>
								</div>
							</div>
							<div className="settings-card">
								<h3>Help</h3>
								<div className="help-card">
									<div className="help-text">
										<p>About</p>
									</div>
									<div className="help-icon">
										<p>Support</p>
									</div>
								</div>
							</div>
							<div className="settings-card">
								<h3>Account</h3>
								<div className="Account-card">
									<div className="Account-text">
										<p>Deactivate</p>
									</div>
									<div className="Account-icon">
										<p>Logout</p>
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

export default Settings
