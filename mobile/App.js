import React, {useState} from 'react'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import SignUpScreen from "./screens/SignUpScreen";
import CustomNavBar from "./components/CustomNavBar";
import HomeScreen from "./screens/HomeScreen";
import EventDetailScreen from "./screens/EventDetailScreen";
import { AuthNavigation, MainNavigation } from "./navigation/navigation";
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Creadentials
// Google Certificate Fingerprint:     AA:84:01:3F:89:04:B9:1B:62:81:14:AB:40:E9:FA:44:AB:F3:4E:3F
// Google Certificate Hash (SHA-1):    AA84013F8904B91B628114AB40E9FA44ABF34E3F
// Google Certificate Hash (SHA-256):  F154DB793E06C7C7AF2C681FB71EFA8B79311D56B02DD83227DA6A94FD00B5B9
// Facebook Key Hash:                  qoQBP4kEuRtigRSrQOn6RKvzTj8=

// Android client ID:   863310686936-nhb4ii7fo0e7bbvrnhcterc0n2hqsoqa.apps.googleusercontent.com


const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  ...DefaultTheme.colors,
  // Specify custom property in nested object
  custom_colors: {
    textMainColor: '#fff',
    buttonMainColor:'#0083e7',
    inputTextBorder:'#c9c7c7',
    danger:"#FF0E0E",
    success:"#30b807",
    info:"#0083e7"
  },
};





export default function App() {
  const [userProfile, setUserProfile ]= useState({
    profile:null,
    loggedIn:false,
    token:null
  })

  const updateProfile = (valKey, value)=>{
    updated = {...userProfile, ...{[valKey]:value}}
    setUserProfile(updateProfile)
  }

  return (
    <Provider store={store}>
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <MainNavigation userProfile={userProfile} updateProfile={updateProfile} />
      </PaperProvider>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
