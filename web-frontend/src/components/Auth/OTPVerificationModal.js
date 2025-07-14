// OTPVerificationModal.js
import React, { useState } from "react";
import Modal from "react-modal";

function OTPVerificationModal({ isOpen, onRequestClose, onVerifyOTP }) {
	const [otp, setOTP] = useState("");

	const handleVerifyOTP = () => {
		// Add OTP validation logic here
		if (otp.length === 4 && !isNaN(otp)) {
			onVerifyOTP(otp);
		} else {
			alert("Please enter a valid 4-digit OTP.");
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="OTP Verification"
		>
			<h2>Enter OTP</h2>
			<input
				type="text"
				value={otp}
				onChange={(e) => setOTP(e.target.value)}
				placeholder="Enter OTP"
				maxLength={4}
			/>
			<button onClick={handleVerifyOTP}>Verify OTP</button>
		</Modal>
	);
}

export default OTPVerificationModal;
