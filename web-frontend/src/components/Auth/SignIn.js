import React from "react";
import { useState } from "react";
import "../css/signup.css";
import swal from "sweetalert";
import GoogleSignin from "./GoogleSignin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isHovered, setIsHovered] = useState(false);

	const navigate = useNavigate();
	const mouseHover = () => {
		setIsHovered(true);
	};

	const mouseLeave = () => {
		setIsHovered(false);
	};

	const handleSignin = async (e) => {
		e.preventDefault();
		const data = {
			email,
			password,
		};
		if (!email || !password) {
			swal({
				title: "error",
				text: "please fill all the fields",
				icon: "error",
				timer:3000
			})
			return
		}
			try {
				const res = await fetch("http://127.0.0.1:8000/api/v1/login/", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(data),
				});
				if (res.ok) {
					const resData = await res.json();

					if (resData.status === 200 && resData.token) {
						localStorage.setItem("token", resData.token);
						swal({
							title: "success",
							text: "Login successful",
							icon: "success",
							timer: 1000
						});

						if (resData.data.account.account_type === "CLIENT") {
							const account_type = resData.data.account.account_type;
							navigate("/");
							localStorage.setItem(account_type);
						}
						
					}
					if (
						resData.data.account.account_type === "CADMIN" ||
						resData.data.account.account_type === "DJ_ADMIN"
					) {
						const account_type = resData.data.account.account_type;
						// window.location.href = "/createevent";
						const cc_token = resData.token;
						localStorage.setItem("account_type", account_type);

						navigate("/createevent");
					}
					if (resData.data.account.account_type === "ARTIST") {
						const account_type = resData.data.account.account_type;
						localStorage.setItem("account_type", account_type);
						navigate("/artfactview");
					} 
					// else {
					// 	swal("Login failed");
					// }
				} else {
					console.error("login failed : ", res);
				}
			} catch (err) {
				console.error("login failed : ", err);
			} finally {
				// redirect user to the Home page
			}
	};
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
				<h3 id="auth-title">Sign in</h3>
				<form id="auth-form">
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
					<button
						id="auth-btn"
						type="submit"
						onMouseEnter={mouseHover}
						onMouseLeave={mouseLeave}
						style={{
							backgroundColor: isHovered ? "grey" : "#1B84E6",
							cursor: "pointer",
						}}
						onClick={handleSignin}
					>
						Login
					</button>
					<button className="socialAcc-button">
						<GoogleOAuthProvider clientId="http://863310686936-lnc6jn8rfkejfm8v3hecibkihasn52cq.apps.googleusercontent.com">
							<GoogleSignin />
						</GoogleOAuthProvider>
					</button>
					<p style={{ textAlign: "center", color: "#7F7F7F" }}>
						Don't have an account? <br />
						<a
							href="/signup"
							style={{
								color: "#1B84E6",
								fontWeight: "bold",
								textDecoration: "none",
								fontStyle: "italic",
							}}
						>
							Sign Up
						</a>
					</p>
				</form>
			</div>
		</div>
	);
}

export default SignIn;
