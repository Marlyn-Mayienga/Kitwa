import React from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function Nav() {
		const navigate = useNavigate();

		const logOut = () => {
			localStorage.clear();
			navigate("/signin");
		};
	return (
		// {Account_type ==='CADMIN'}

		<div className="row m-0 p-0 justify-content-center align-items-center bg-white">
			<div className="col-md-3 d-flex gap-1">
				<img
					src={require("../images/culturevaulticon.png")}
					alt="culturevaults logo"
					style={{ width: "40px", height: "40px" }}
				/>
				<h3>
					<span>Culture</span>
					<span style={{ color: "#0F75BC" }}>Vault</span>
				</h3>
			</div>
			<div className="col-md-3">
				<div className="nav-links">
					<ul>
						<li>
							<a href="/">Events</a>
						</li>
						<li>
							<a href="/artfactview">Artifacts</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="col-md-3">
				<div
					className="nav-search"
					style={{
						backgroundColor: "#CCC",
						borderRadius: "10px",
						padding: "6px 12px",
					}}
				>
					<input
						type="text"
						placeholder="search"
						style={{ border: "none", backgroundColor: "#ccc" }}
					/>
					<FontAwesomeIcon icon={faMagnifyingGlass} style={{cursor:"pointer"}} />
					
				</div>
			</div>
			<div className="col-md-3">
				<div className="nav-icons">
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
							<a href="/">Profile</a>
							<a href="/">Settings</a>
							<a onClick={logOut}>Logout</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Nav;
