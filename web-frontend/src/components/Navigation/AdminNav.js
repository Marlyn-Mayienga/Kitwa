import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Navigation/navigation.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';

function AdminNav() {
	const navigate = useNavigate();
	const [deactivatedAccounts, setDeactivactedAccounts] = useState([]);
	const CA_token = "Token" + " " + localStorage.getItem("token");
	const [countDeactivated, setCountDeactivated] = useState(0);

	const logOut = () => {
		localStorage.clear();
		navigate("/signin");
	};

	const allDeactivatedAccounts = async (e) => {
		// e.preventDefault();
		try {
			const allAccounts = await fetch(
				"http://127.0.0.1:8000/api/v1/admin/activate/",
				{
					method: "GET",
					headers: {
						Authorization: CA_token,
					},
				}
			);
			if (allAccounts.ok) {
				const deactive = await allAccounts.json();

				if (deactive.data) {
					const alldeactivatedAcc = deactive.data.accounts.length;
					setCountDeactivated(alldeactivatedAcc);
					setDeactivactedAccounts(deactive.data.accounts);
				} else {
					swal(allAccounts.message);
				}
			}
		} catch (error) {
			// swal({
			// 	title: "Unauthorized",
			// 	text: "you are not authorized",
			// 	icon: "warning",
			// 	timer: 3000,
			// });
		}
	};

	// if the data mounts
	useEffect( () => {
		allDeactivatedAccounts();
	}, [])
	

	// handle onclick bell notification icon
	const handleNotification = () => {
		navigate("/desactivatedlists");
	}
	return (
		// {Account_type ==='CADMIN'}
		<div className="row m-0 p-0 justify-content-center align-items-center bg-white">
			<div className="col-md-4 d-flex gap-1">
				<img
					src={require("../images/culturevaulticon.png")}
					alt="culturevaults logo"
					style={{ width: "40px", height: "40px" }}
				/>
				<h3>ADMIN</h3>
			</div>
			<div className="col-md-4">
				<div className="nav-links">
					<ul>
						<li>
							<a href="/">Events</a>
						</li>
						<li>
							<a href="">Tour Companies</a>
						</li>
						<li>
							<a href="/artfactview">Artists</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="col-md-4">
				<div className="nav-icons">
					<div className="notification-icon">
						{countDeactivated > 0 && (
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
						)}
						<FontAwesomeIcon
							icon={faBell}
							style={{
								color: "#D80404",
								marginRight: "10px",
								fontSize: "40px",
								cursor: "pointer",
							}}
							onClick={handleNotification}
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

export default AdminNav
