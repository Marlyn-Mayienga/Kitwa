import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function ArtistNav() {
	const navigate = useNavigate();
	const logOut = () => {
		localStorage.clear();
		navigate("/signin");
	};

  return (
		// {Account_type ==='Artist'}
		<div className="row m-0 p-0 justify-content-center align-items-center bg-white">
			<div className="col-md-4 d-flex gap-1">
				<img
					src={require("../images/culturevaulticon.png")}
					alt="culturevaults logo"
					style={{ width: "40px", height: "40px" }}
				/>
				<h3>Artist</h3>
			</div>
			<div className="col-md-4">
				<div className="nav-links">
					<ul>
						<li>
							<a href="/artfactview">Art</a>
						</li>
						<li>
							<a href="">Sales</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="col-md-4">
				<div className="nav-icons">
					<div className="notification-icon">
						{/* {countDeactivated > 0 && (
						<span
							style={{
								position: "absolute",
								background: "#0F75BC",
								color: "white",
								borderRadius: "40%",
								padding: "0px 6px",
							}}
						>
							{countDeactivated}
						</span>
					)} */}
						<FontAwesomeIcon
							icon={faBell}
							style={{
								color: "#D80404",
								marginRight: "10px",
								fontSize: "40px",
								cursor: "pointer",
							}}
							// onClick={handleNotification}
						/>
					</div>
					<img
						src={require("../images/profile.jpg")}
						alt="profile"
						className="nav-profile"
						style={{ width: "50px", height: "50px" }}
					/>
					<div className="drop-down">
						<button className="dropbtn">
							<i className="fa fa-caret-down"></i>
						</button>
						<div className="dropdown-content">
							<a href="#">Profile</a>
							<a href="#">Settings</a>
							<a onClick={logOut}>Logout</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ArtistNav
