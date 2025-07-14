import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Visit() {
	return (
		// <div className="row" style={{ justifyContent: "center" }}>
		// 	<div
		// 		className="row bg-white m-2"
		// 		style={{ width: "80%", textAlign: "center" }}
		// 	>
		// 		<div
		// 			className="row p-4"
		// 			style={{ height: "40vh", alignItems: "center" }}
		// 		>
		// 			<div
		// 				className="col"
		// 				style={{ border: "2px dashed red", backgroundColor: "greenyellow" }}
		// 			>
		// 				<span>14</span>
		// 				<span style={{ display: "block" }}>FEB</span>
		// 			</div>
		// 			<div
		// 				className="col"
		// 				style={{ border: "2px dashed red", backgroundColor: "green" }}
		// 			>
		// 				<img
		// 					src={require("../images/culture-dance.jpg")}
		// 					style={{
		// 						width: "100%",
		// 						borderRadius: "10px",
		// 						objectFit: "cover",
		// 						maxHeight: "100%",
		// 						margin: "0",
		// 					}}
		// 				/>
		// 			</div>
		// 			<div
		// 				className="col"
		// 				style={{ border: "2px dashed red", backgroundColor: "greenyellow" }}
		// 			>
		// 				<span>Godmesa</span>
		// 				<span style={{ display: "block" }}>2 Media</span>
		// 			</div>
		// 			<div
		// 				className="col"
		// 				style={{ border: "2px dashed red", backgroundColor: "green" }}
		// 			>
		// 				<a href="/visitdetails">
		// 					<FontAwesomeIcon
		// 						icon={faChevronRight}
		// 						style={{ fontSize: "24px", cursor: "pointer" }}
		// 					/>
		// 				</a>
		// 			</div>
		// 		</div>

		// 		<div className="row p-4 " style={{ height: "40vh" }}>
		// 			<div className="col" style={{ border: "2px dashed red" }}>
		// 				<span>10</span>
		// 				<span style={{ display: "block" }}>JAN</span>
		// 			</div>
		// 			<div className="col" style={{ border: "2px dashed red" }}>
		// 				<img
		// 					src={require("../images/lake.jpeg")}
		// 					style={{ width: "100%", borderRadius: "10px" }}
		// 				/>
		// 			</div>
		// 			<div className="col" style={{ border: "2px dashed red" }}>
		// 				<span>Tobangu Lore</span>
		// 				<span style={{ display: "block" }}>3 Media</span>
		// 			</div>
		// 			<div className="col" style={{ border: "2px dashed red" }}>
		// 				<FontAwesomeIcon
		// 					icon={faChevronRight}
		// 					style={{ fontSize: "24px" }}
		// 				/>
		// 			</div>
		// 		</div>

		// 		<div className="row p-4 " style={{ height: "40vh" }}>
		// 			<div className="col" style={{ border: "2px dashed red" }}>
		// 				<span>12</span>
		// 				<span style={{ display: "block" }}>DEC</span>
		// 			</div>
		// 			<div className="col" style={{ border: "2px dashed red" }}>
		// 				<img
		// 					src={require("../images/egyptian-artifact.jpg")}
		// 					style={{ width: "100%", borderRadius: "10px" }}
		// 				/>
		// 			</div>
		// 			<div className="col" style={{ border: "2px dashed red" }}>
		// 				<span>Rusinga</span>
		// 				<span style={{ display: "block" }}>1 Media</span>
		// 			</div>
		// 			<div className="col" style={{ border: "2px dashed red" }}>
		// 				<FontAwesomeIcon
		// 					icon={faChevronRight}
		// 					style={{ fontSize: "24px" }}
		// 				/>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
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
							<a href="/visitdetails">
								<i class="fa fa-chevron-right" style={{cursor:"pointer"}}></i>
							</a>
						</div>
					</div>
					<div className="visit-description2">
						<div className="visit-date">
							<span style={{ color: "black" }}>10</span>
							<span style={{ fontWeight: "lighter", color: "black" }}>JAN</span>
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
							<a href="/visitdetails">
								<i class="fa fa-chevron-right" style={{cursor:"pointer"}}></i>
							</a>
						</div>
					</div>
					<div className="visit-description3">
						<div className="visit-date">
							<span style={{ color: "black" }}>12</span>
							<span style={{ fontWeight: "lighter", color: "black" }}>Dec</span>
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
							<a href="/visitdetails">
								<i class="fa fa-chevron-right" style={{cursor:"pointer"}}></i>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Visit
