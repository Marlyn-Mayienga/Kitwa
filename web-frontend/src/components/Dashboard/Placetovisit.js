import React, { useState } from 'react'
import Navbar from "../Navigation/Nav";


function Placetovisit() {



	const [isStarIconYellow, setStarIconYellow] = useState(false)


	const handleStarIcon = () => {
		setStarIconYellow(!isStarIconYellow);
	}
	const starIconColor = isStarIconYellow ? "yellow" : "lightblue";

	return (
		<div className="row" style={{ justifyContent: "space-evenly" }}>
			<div
				className="row m-0 bg-white"
				style={{ width: "80%", border: "none", borderRadius: "10px" }}
			>
				<div
					className="row m-0 mt-4 mb-4"
					style={{
						textAlign: "start",
						backgroundColor: "#E3F2FD",
						borderRadius: "10px",
					}}
				>
					<p style={{ paddingTop: "16px" }}>
						Based on places you have visited in the past{" "}
					</p>
				</div>
				<div className="col-md-6 mb-41">
					<div
						className="col m-0 d-flex"
						style={{
							backgroundColor: "#F9F9F9",
							boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
							borderRadius: "10px",
						}}
					>
						<div className="col-7" style={{}}>
							<img
								src={require("../images/nairobi-night.jpg")}
								alt="visit"
								style={{
									objectFit: "cover",
									width: "100%",
									paddingRight: "10px",
									borderRadius: "10px",
								}}
							/>
						</div>
						<div className="col-2">
							<h2>
								<span
									style={{
										fontSize: "20px",
										fontWeight: "lighter",
									}}
								>
									Nairobi
								</span>
								<span
									style={{
										display: "block",
										color: "#ccc",
										fontSize: "18px",
										fontWeight: "lighter",
									}}
								>
									Night
								</span>
							</h2>
						</div>
						<div className="col-2 d-flex align-items-end">
							<div className="col">
								<i
									className="far fa-star fa-1x"
									style={{ color: starIconColor, cursor: "pointer" }}
									onClick={handleStarIcon}
								></i>
								<span style={{ color: "#ccc", padding: "4px " }}>4.8</span>
							</div>
						</div>
					</div>
				</div>

				<div className="col-md-6">
					<div
						className="col d-flex"
						style={{
							backgroundColor: "#F9F9F9",
							boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
							borderRadius: "10px"
						}}
					>
						<div className="col-7">
							<img
								src={require("../images/amaze-lake.jpg")}
								alt="visit"
								style={{
									objectFit: "cover",
									width: "100%",
									paddingRight: "10px",
									borderRadius: "10px",
								}}
							/>
						</div>
						<div className="col-2">
							<h2>
								<span
									style={{
										fontSize: "20px",
										fontWeight: "lighter",
									}}
								>
									Hawaii
								</span>
								<span
									style={{
										display: "block",
										color: "#ccc",
										fontSize: "18px",
										fontWeight: "lighter",
									}}
								>
									Kisumu
								</span>
							</h2>
						</div>
						<div className="col-2 d-flex align-items-end">
							<div className="col">
								<i
									className="far fa-star fa-1x"
									style={{ color: starIconColor, cursor: "pointer" }}
									onClick={handleStarIcon}
								></i>
								<span style={{ color: "#ccc", padding: "4px " }}>4.5</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Placetovisit
