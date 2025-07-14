import React from 'react'

function TourCompanyRegisterForm() {
  return (
		<div>
			<div className="Navbar">
				<div className="NavItem">
					<div className="logo">
						<img
							src={require("../images/culturevaulticon.png")}
							alt="culturevaults logo"
							style={{ width: "12%" }}
						/>
						<p>
							<span>Culture</span>
							<span style={{ color: "#1B84E6", marginLeft: "6px" }}>Vault</span>
						</p>
					</div>
				</div>
			</div>
			<div className="overlay">
				<div
					className="overlay-container"
					style={{
						backgroundColor: "#FFFFFF",
						width: "70%",
						marginTop: "9%",
						marginBottom: "1%",
						textAlign: "center",
					}}
				>
					<h4
						style={{ fontSize: "24px", fontWeight: "normal", color: "#0F75BC" }}
					>
						Join As Tour Company
					</h4>

					<div
						className="row"
						style={{
							display: "flex",
							width: "100%",
							justifyContent: "space-around",
						}}
					>
						<div
							className="col-1"
							style={{
								width: "48%",
								textAlign: "left",
								padding: "20px",
							}}
						>
							<div>
								<label>Name</label> <br />
								<input type="Text" name="name-of-the-event" />
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "10px",
								}}
							>
								<div>
									<label>Events</label> <br />
									<input
										type="Text"
										name="name-of-the-event"
										placeholder="Godmesa"
                                  />
                                  {/* <hr/> */}
									<input
										type="Text"
										name="name-of-the-event"
                                      placeholder="Tubongu Lore"
                                      style={{
                                          borderTop: "none",
                                          padding:" 0px 10px 10px 10px ",
                                          marginTop: "-10px",
                                          borderRadius: "opx 5px 5px 0px"
                                      }}
									/>
								</div>
							</div>
						</div>
						<div
							className="col-1"
							style={{
								width: "48%",
								textAlign: "left",
								padding: "20px",
							}}
						>
							<div>
								<label>Photo</label> <br />
								<input
									type="file"
									name="name-of-the-event"
									style={{
										padding: "104px 10px",
									}}
								/>
							</div>
						</div>
					</div>
					<button
						style={{
							backgroundColor: "#0F75BC",
							color: "#FFF",
							fontSize: "18px",
							fontWeight: "normal",
							padding: "6px 20px",
							border: "none",
							borderRadius: "4px",

							//
						}}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}

export default TourCompanyRegisterForm
