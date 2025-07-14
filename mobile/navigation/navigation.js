import React, {useState} from 'react';
import {Text, View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from './CustomDrawer';
import SettingsScreen from '../screens/SettingsScreen';
import VisitsScreen from '../screens/VisitsScreen';


// icons
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import ArtifactDetails from '../screens/ArtifactDetails';
import VisitDetailsScreen from '../screens/VisitDetailsScreen';
import {useDispatch, useSelector} from 'react-redux'
import { Snackbar } from 'react-native-paper';
import {close as closeSnack} from '../redux/slices/app'
import ReservationScreen from '../screens/ReservationScreen';
import ReservationDetailsScreen from '../screens/ReservationDetailsScreen';
import OrdersScreen from '../screens/OrdersScreen';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const MainNavigation=(props)=>{
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
    const showSnack = useSelector(state=>state.app.showSnack)
    const message = useSelector(state=>state.app.message)

    const dispatcher = useDispatch()
    // console.log(showSnack)

    if(isLoggedIn){
        return(
        <View style={{flex:1}}>
        <AppNavigation {...props}  />
        <Snackbar
        style={{zIndex:5}}
        visible={showSnack}
        onDismiss={()=>{      
            // dispatcher(closeSnack())
        }}
        action={{
          label: 'Close',
          onPress: () => {
            dispatcher(closeSnack())
          },
        }}>
       {message}
      </Snackbar> 
        </View>
        )
    }
        return <AuthNavigation {...props} />
}

export const AppNavigation = (props)=>{
    return(
      <Drawer.Navigator drawerContent={(props)=><CustomDrawer {...props} />} 
      screenOptions={{headerShown:false, drawerActiveTintColor:'#0083e7', drawerInactiveBackgroundColor:{height:'100%'}, drawerLabelStyle:{marginLeft:-20}}} 
      initialRouteName="home">
        <Drawer.Screen 
            name="home" 
            options={{
                title:"Home",
                drawerItemStyle:{width:'100%', marginLeft:-0.8, borderTopWidth:0.2, backgroundColor:'#fff', marginVertical:0, paddingLeft:10, paddingVertical:5},
                drawerIcon:({color})=><Feather name="home" size={24} color={color} />
            }} 
            
            component={HomeNavigation} 
        />

        {/* <Drawer.Screen 
            name="reservations"
            options={{
                title:"Reservations",
                drawerItemStyle:{width:'100%', marginLeft:-0.8, borderTopWidth:0.2, backgroundColor:'#fff', marginVertical:0, paddingLeft:10, paddingVertical:5},
                drawerIcon:({color})=><Entypo name="ticket" size={24} color={color} />
            }}  
            component={ReservationsNavigation} 
        /> */}
        {/* <Drawer.Screen 
            name="visits"
            options={{
                title:"Visits",
                drawerItemStyle:{width:'100%', marginLeft:-0.8, borderTopWidth:0.2, backgroundColor:'#fff', marginVertical:0, paddingLeft:10, paddingVertical:5},
                drawerIcon:({color})=><Entypo name="location" size={24} color={color} />
            }}  
            component={VisitsNavigation} 
        /> */}
        <Drawer.Screen name="profile" 
            options={{
                title:"Profile",
                drawerItemStyle:{width:'100%', marginLeft:-0.8, borderTopWidth:0.2, paddingLeft:10, marginVertical:0, paddingVertical:5},
                drawerIcon:({color})=><FontAwesome5 name="user" size={24} color={color} />
            }} 
        component={ProfileScreen} />
         <Drawer.Screen name="orders" 
            options={{
                title:"Purchases",
                drawerItemStyle:{width:'100%', marginLeft:-0.8, borderTopWidth:0.2, borderBottomWidth:0.2, marginVertical:0.5, paddingLeft:10, backgroundColor:'#fff', paddingVertical:5},
                drawerIcon:({color})=><FontAwesome name="shopping-bag" size={24} color={color} />
            }} 
        component={OrdersScreen} />
        {/* <Drawer.Screen name="settings" 
            options={{
                title:"Settings",
                drawerItemStyle:{width:'100%', marginLeft:-0.8, borderTopWidth:0.2, borderBottomWidth:0.2, marginVertical:0.5, paddingLeft:10, backgroundColor:'#fff', paddingVertical:5},
                drawerIcon:({color})=><Ionicons name="settings-outline" size={24} color={color} />
            }} 
        component={SettingsScreen} /> */}
      </Drawer.Navigator>

      
    )
}
export const AuthNavigation =()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="login">
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={SignUpScreen} />
        </Stack.Navigator>
    )
} 



const HomeNavigation =()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="events_artifacts">
            <Stack.Screen name="events_artifacts" component={HomeScreen} />
            <Stack.Screen name="event_details" component={EventDetailScreen} />
            <Stack.Screen name="artifact_details" component={ArtifactDetails} />
        </Stack.Navigator>
    )
}


const ReservationsNavigation = ()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="reservations_list">
            <Stack.Screen name="reservations_list" component={ReservationScreen} />
            <Stack.Screen name="reservation_details" component={ReservationDetailsScreen} />
        </Stack.Navigator>
    )
}

const VisitsNavigation = ()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="visits_list">
            <Stack.Screen name="visits_list" component={VisitsScreen} />
            <Stack.Screen name="visit_details" component={VisitDetailsScreen} />
        </Stack.Navigator>
    )
}


