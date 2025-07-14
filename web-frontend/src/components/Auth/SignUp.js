import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Auth/signup.css'
import swal from "sweetalert";
import OTPInput from "react-otp-input";


function SignUp() {
  const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm_password, setConfirmPassword] = useState("");
	const [otp, setOtp] = useState("");
	const [isOtpInputVisible, setIsOtpInputVisible] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const navigate = useNavigate();
	const mouseHover = () => {
		setIsHovered(true);
	};

	const mouseLeave = () => {
		setIsHovered(false);
	};

	const verifyOTP = async () => {
		if (!otp) {
			swal("Please enter OTP");
			return;
		}

		// Send OTP and email to the backend/server for verification
		try {
			const response = await fetch(
				"http://127.0.0.1:8000/api/v1/client/confirm/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, otp }),
				}
			);

			const data = await response.json();
			console.log("Server response:", data);

			if (data.status === 200) {
				swal("You can log in");
				window.location.href="/signin";
				// navigate("/signin");
			} else {
				swal("OTP entered is not valid");
			}
		} catch (err) {
			console.error("Verification failed: ", err);
		}
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		const data = {
			first_name,
			last_name,
			email,
			password,
			confirm_password,
		};

		if (!first_name || !last_name || !email || !password || !confirm_password) {
			swal("Please fill all the fields");
			return;
		}

		if (password !== confirm_password) {
			swal("Password and Confirm Password do not match");
			return;
		}

		try {
			const response = await fetch("http://127.0.0.1:8000/api/v1/client/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				const resData = await response.json();
				console.log("Server response:", resData);

				if (resData.status === 200) {
					swal("Enter the OTP sent to your email below")
					// Display OTP input field
					setIsOtpInputVisible(true);
				} else {
					swal(resData.error);
				}
			} else {
				swal("Registration failed");
			}
		} catch (err) {
			console.error("Registration failed: ", err);
		}
	}; 
	const organizerSignup = async (e) => {
		e.preventDefault();
		
			if (
				!first_name ||
				!last_name ||
				!email ||
				!password ||
				!confirm_password
			) {
				swal("Please fill all the fields");
				return;
		}
		const data = {
			first_name, last_name, email, password, confirm_password
		}
		try {
			const orgRegister = await fetch("http://127.0.0.1:8000/api/v1/organizer/", {
				method: "POST",
				headers: {
					"Content-Type":"application/json"
				},
				body: JSON.stringify(data)
			});

			if (orgRegister.ok) {
				const resData = await orgRegister.json();
				// console.log("before status", resData);
				if (resData.data) {
					swal(resData.data.message)
				} else {
					// swal(resData.error);
					swal({
						title: "Error!",
						text: resData.error,
						icon: "error",
						timer:3000,
					})
				}
			}
		} catch (error) {
			// swal("something went wrong!!!")
			swal({
				title: "Error!",
				text: "something went wrong!!!",
				icon: "error",
				timer: 3000,
			});
		}
	}
// register an artist
	const artistSignup = async (e) => {
		e.preventDefault();
		
			if (
				!first_name ||
				!last_name ||
				!email ||
				!password ||
				!confirm_password
			) {
				swal("Please fill all the fields");
				return;
		}
		const data = {
			first_name, last_name, email, password, confirm_password
		}
		try {
			const artRegister = await fetch("http://127.0.0.1:8000/api/v1/artist/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (artRegister.ok) {
				const resData = await artRegister.json();
				console.log("before status", resData);
				if (resData.data) {
					swal(
						{
							title: "success",
							text:resData.message,
							icon: "success",
							timer:3000
						});
					console.log("show me this error message", resData.message);
				} else {
					// swal(resData.error);
					swal({
						title: "Error!",
						text: resData.error,
						icon: "error",
						timer: 3000,
					});
				}
			}
		} catch (error) {
			// swal("something went wrong!!!")
			swal({
				title: "Error!",
				text: "something went wrong!!!",
				icon: "error",
				timer: 3000,
			});
		}
	}

	return (
		<div className="signup-wrapper">
			<div id="left-col">
				<img id="thumbnail" src={require("../images/culturevaulticon.png")} />
				<p id="logo-name">
					<span>Culture</span>
					<span style={{ color: "#0F75BC" }}>Vault</span>
				</p>
			</div>
			<div id="right-col">
				<h3 id="auth-title">Sign Up</h3>
				<form id="auth-form">
					<div style={{ display: "flex", gap: "10px" }}>
						<input
							className="input-container"
							type="text"
							placeholder="Firstname"
							style={{ width: "50%" }}
							value={first_name}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<input
							className="input-container"
							type="text"
							placeholder="Lastname"
							style={{ width: "50%" }}
							value={last_name}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>

					<input
						className="input-container"
						type="text"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className="input-container"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						className="input-container"
						type="password"
						placeholder="Confirm password"
						value={confirm_password}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<button
						id="auth-btn"
						type="submit"
						onMouseEnter={mouseHover}
						onMouseLeave={mouseLeave}
						style={{
							backgroundColor: isHovered ? "grey" : "#1B84E6",
							cursor: "pointer",
						}}
						onClick={handleSignup}
					>
						Create Account
					</button>
					<div style={{ display: "flex", gap: "10px" }}>
						<p>Signup as: </p>
						<button
							// hover logic
							onMouseEnter={mouseHover}
							onMouseLeave={mouseLeave}
							style={{
								width: "80px",
								border: "none",
								borderRadius: "5px",
								color: "white",
								fontSize: "16px",
								cursor: "pointer",
								backgroundColor: isHovered ? "red" : "#ffc107",
							}}
							onClick={organizerSignup}
						>
							Organizer
						</button>
						<button
							style={{
								width: "80px",
								backgroundColor: "#28a745",
								border: "none",
								borderRadius: "5px",
								color: "white",
								fontSize: "16px",
								cursor: "pointer",
							}}
							onClick={artistSignup}
						>
							Artist
						</button>
						<button
							style={{
								width: "80px",
								backgroundColor: "#17a2b8",
								border: "none",
								borderRadius: "5px",
								color: "white",
								fontSize: "16px",
								cursor: "pointer",
							}}
						>
							Tour Company
						</button>
					</div>
					{isOtpInputVisible && (
						<div className="otp-container">
							<h3>Enter OTP</h3>
							<OTPInput
								value={otp}
								onChange={setOtp}
								numInputs={4}
								isInputNum
								autoFocus
								containerStyle={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: "white",
									boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
									borderRadius: "5px",
								}}
								Separator={<span>-</span>}
								renderInput={(props, index) => (
									<input
										{...props}
										key={index}
										style={{
											width: "40px",
											height: "40px",
											fontSize: "18px",
											margin: "0 6px",
											padding: "6px",
											borderRadius: "4px",
											border: "1px solid #ccc",
											zIndex: "1",
										}}
									/>
								)}
							/>
							<button onClick={verifyOTP}>Verify OTP</button>
						</div>
					)}

					{/* <button className="socialAcc-button">
						<img src={require("../images/google.png")} alt="google logo" />
						Sign Up with Google
					</button> */}
					<p style={{ textAlign: "center", color: "#7F7F7F" }}>
						Already have an account? <br />
						<a
							href="/signin"
							style={{
								color: "#1B84E6",
								fontWeight: "bold",
								textDecoration: "none",
								fontStyle: "italic",
							}}
						>
							Sign In
						</a>
					</p>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
