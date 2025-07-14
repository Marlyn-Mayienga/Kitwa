import React, {useState} from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import React from 'react';

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = ()=>{
    const [accountInfo, setAccountInfo] = useState(null)
    const [request, response, promptFunc] = Google.useAuthRequest({
        androidClientId:'863310686936-nhb4ii7fo0e7bbvrnhcterc0n2hqsoqa.apps.googleusercontent.com',
        // iosClientId:''
    })
    return(
    <></>    
    )
}