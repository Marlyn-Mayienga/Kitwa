import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator} from "react-native";
import {  Button, Dialog, Portal } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { useTheme } from "react-native-paper";
import {validate_email} from '../utils/EmailValidator';
import { Entypo } from '@expo/vector-icons';
import { API } from "../API/Configs";
import axios from "axios";
import { restoreToken, storeToke } from "../utils/LocalStorageTools";
import {useDispatch} from 'react-redux'
import { setUser } from "../redux/slices/user";
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { addMessage } from "../redux/slices/app";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = (props) => {
  const theme = useTheme();
  const { navigation } = props;
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [emialIsValid, setEmailIsValid] = useState(true)
  const [passwordIsValid, setPasswordIsValid] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const dispatcher = useDispatch()
  const api = new API()

  const [googleAccountInfo, setGoogleAccountInfo] = useState(null)
  const [googleLoading, setGoogelLooading] = useState(false)
  // styling 

  const styles = StyleSheet.create({
    main: {
      display: "flex",
      flex: 1,
      alignItems: "center",
      paddingTop: "20%",
      // justifyContent:'center'
    },
    textInput: {
      width: "70%",
      marginBottom: 20,
    },
    button: {
      borderRadius: 5,
      width: "70%",
      marginBottom: 20,
    },
    question: {
      fontSize: 15,
      fontWeight: "bold",
    },
    errorText:{
      color: theme.custom_colors.danger,
      marginBottom:5
    }
  });
  
  
  //Functions
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:'863310686936-nhb4ii7fo0e7bbvrnhcterc0n2hqsoqa.apps.googleusercontent.com',
    // iosClientId:''
  })

  const signinWithGoogle =async()=>{
    if(response?.type === "success"){
      await getInfoFromGoogle(response.authentication.accessToken)
    }
  }
  const getInfoFromGoogle =async(token)=>{
    if(!token) return;

    try{
        const response = await fetch("https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {Authorization: `Bearer ${token}`}
        }
        )

        const user = await response.json()
        // console.log(user)
        setGoogleAccountInfo(user)
        googleLoginCultureVault(user)
    }catch(e){
        console.log(`The error due to google OAuth : ${e}`)
    }
  }

  const googleLoginCultureVault=async(user)=>{
    setGoogelLooading(true)

    const response = await api.postRequest("/client/google/", {email:user.email,password:user.id, name:user.name, profile:user.picture}) 
    if(parseInt(response.data.status) < 299){
      storeToke(response.data.token)
      dispatcher(setUser({isLoggedIn:true, token:response.data.token, user:response.data.data.account}))
     
    }else{
      setErrorMessage(response.data.message)
      setShowErrors(true)
    }

    setGoogelLooading(false)

  }

  useEffect(()=>{
      signinWithGoogle();
  },[response])

  useEffect(async()=>{
    const token = await restoreToken()
    if(token){
      setLoading(true)
      // We need to refresh the token 
      try{
          const response = await api.getRequest('/refresh/', true)
          // console.log(response.data)
          
          if(response.data.status === 200){

             if(response.data.data.account.account_type === "CLIENT"){

              storeToke(response.data.token)
              dispatcher(setUser({isLoggedIn:true, token:response.data.token, user:response.data.data.account}))
  
            }else{
              setErrorMessage("You need to have a CLIENT account.")
              setShowErrors(true)
            }

          }else{
            setErrorMessage(response.data.message)
            setShowErrors(true)
          }
      }catch(e){
        console.log(e)
        setErrorMessage("Something went wrong")
        setShowErrors(true)
        setLoading(false)
      }

      setLoading(false)
      
    }

  },[])

  
  const handlePasswordChange =(text)=>{
    if(text.length > 2){
      setPassword(text)
      setPasswordIsValid(true)
    }else{
      setPasswordIsValid(false)
    }
  }
  const handleEmailChange =(text)=>{
    if(validate_email(text)){
      setEmail(text)
      setEmailIsValid(true)
    }else{
      setEmailIsValid(false)
    }
  }

  const hideDialog =()=>{
    setShowErrors(false)
  }

  const ErrorDisplay =({message})=>{
    const displayMessage = message?message:"Something went wrong"
    return (
      <Portal>
      <Dialog style={{zIndex:1, alignItems:'center', justifyContent:'center'}} visible={showErrors} onDismiss={hideDialog}>
        <Dialog.Icon color="#e02a1d" icon="alert" />
        <Dialog.Title style={styles.title}>Error</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{displayMessage}</Text>
        </Dialog.Content>
      </Dialog>
      </Portal>
    )
  }

  const loginHandler = async ()=>{
    setLoading(true)
    try{
      // console.log(email, password)

      const response = await api.postRequest('/login/',{email:email, password:password}, false);

      if(parseInt(response.data.status) < 299){

        if(response.data.data.account.account_type === "CLIENT"){

            storeToke(response.data.token)
            // console.log(response.data.data.account)
            dispatcher(setUser({isLoggedIn:true, token:response.data.token, user:response.data.data.account}))

        }else{
            setErrorMessage("You need to have a CLIENT account.")
            setShowErrors(true)
        }

      }else{
        setErrorMessage(response.data.message)
        setShowErrors(true)
      }
      
    }catch(e){
      console.log(e)
      setErrorMessage("Something went wrong")
      setShowErrors(true)
      setLoading(false)

    }
    setLoading(false)
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.main}>
        <Image
          source={require("../assets/app-icon.png")}
          style={{ width: 80, height: 80, marginBottom: 20 }}
        />
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Culture{" "}
          <Text style={{ color: theme.custom_colors.buttonMainColor }}>
            Vault
          </Text>
        </Text>
        <Text></Text>
        <TextInput
          mode="outlined"
          label="Email"
          style={styles.textInput}
          onChangeText={handleEmailChange}
          activeOutlineColor={emialIsValid? theme.custom_colors.buttonMainColor:theme.custom_colors.danger}
          outlineColor={emialIsValid? theme.custom_colors.buttonMainColor:theme.custom_colors.danger}
       
       />
        {!emialIsValid &&<Text style={styles.errorText}>Please enter a valid email</Text>}
        <TextInput
          mode="outlined"
          label="Password"
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPassword}
          style={{...styles.textInput, backgroundColor: 'transparent'}}
          activeOutlineColor={passwordIsValid? theme.custom_colors.buttonMainColor:theme.custom_colors.danger}
          outlineColor={passwordIsValid? theme.custom_colors.buttonMainColor:theme.custom_colors.danger}
          right={<TextInput.Icon iconColor={theme.custom_colors.buttonMainColor}  icon={!showPassword ? "eye" : "eye-off"} onPress={() => setShowPassword(!showPassword)} />}
       />

        {!passwordIsValid &&<Text style={styles.errorText}>Too short for a password</Text>}

        {loading?<ActivityIndicator  size={30} style={{color:theme.custom_colors.textMainColor, marginBottom:15}} />
          :<Button
          style={{
            ...styles.button,
            backgroundColor: theme.custom_colors.buttonMainColor,
          }}
          mode="contained"
          onPress={loginHandler}
        >
          
          <Text style={{ color: theme.custom_colors.textMainColor }}>
            Login{" "}
          </Text>
        </Button>}
        {googleLoading ? 
        <ActivityIndicator  size={30} style={{color:theme.custom_colors.textMainColor, marginBottom:15}} />
        :<Button
          style={{
            ...styles.button,
            borderColor: theme.custom_colors.inputTextBorder,
          }}
          icon={() => (
            <Image
              source={require("../assets/google.png")}
              style={{ width: 20, height: 20, marginRight: 12 }}
            />
          )}
          mode="outlined"
          onPress={()=>{promptAsync()}}
        >
          <Text style={{ color: "#919090", fontSize: 18 }}>
            Sign Up with Google
          </Text>
        </Button>}
        <Text style={styles.question}>Don't have an account?</Text>
        <Button mode="text" onPress={() => navigation.navigate("register")}>
          <Text style={{ color: theme.custom_colors.buttonMainColor }}>
            Sign Up
          </Text>
        </Button>
      {showErrors && <ErrorDisplay message={errorMessage} />}

      </View>
    </ScrollView>
  );
};



export default LoginScreen;
