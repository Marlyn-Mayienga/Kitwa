import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
function GoogleSignin() {
  return (
		<div>
			<GoogleLogin
				onSuccess={(credentialResponse) => {
					console.log(credentialResponse);
				}}
				onFailure={() => {
					console.log("login failed");
				}}
				clientId="863310686936-lnc6jn8rfkejfm8v3hecibkihasn52cq.apps.googleusercontent.com"
				buttonText="Login"
				cookiePolicy={"single_host_origin"}
			/>
		</div>
	);
}

export default GoogleSignin
