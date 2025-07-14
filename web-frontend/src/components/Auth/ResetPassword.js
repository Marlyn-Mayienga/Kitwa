import React from 'react'

function ResetPassword() {
  return (
		<div className="signup-container">
			<div className="left-col">
				<img
					src={require("../images/culturevaulticon.png")}
					alt="culturevaults logo"
					style={{ width: "70%", padding: "0px 0px 0px 50px" }}
				/>
				<p>
					<span>Culture</span>
					<span style={{ color: "#1B84E6", marginLeft: "5px" }}>Vault</span>
				</p>
			</div>
			<div className="right-col">
				<div className="signup-form">
					<h1 style={{ color: "#1B84E6" }}>Change Password</h1>
					<form>
						<div className="form-group">
							<input
								type="password"
								id="password"
								name="password"
								placeholder="Password"
							/>
							<input
								type="password"
								id="password"
								name="password"
								placeholder="New Password"
							/>
							<button
								type="submit"
								style={{
									outline: "none",
									border: "none",
									backgroundColor: "#1B84E6",
									borderRadius: "5px",
									padding: "10px",
									margin: "6px 0px",
									height: "50px",
									width: "100%",
									boxSizing: "border-box",
                                    color: "white",
                                    cursor:"pointer"
								}}
							>
								Change Password
							</button>

						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ResetPassword
