import React, {useState} from 'react'
import OTPInput from 'react-otp-input'

function OTPModal({otp, setOtp, verifyOTP}) {

    return (
			<div>
				<h3>Enter OTP</h3>
				<OTPInput
					value={otp}
					onChange={setOtp}
					numInputs={4}
					isInputNum
					autoFocus
					renderSeparator={<span>-</span>}
					renderInput={(props) => <input {...props} />}
				/>
				<button onClick={verifyOTP}>Verify OTP</button>
			</div>
		);
}

export default OTPModal
