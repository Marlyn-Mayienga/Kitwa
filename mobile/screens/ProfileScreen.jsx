import React from 'react'
import {View, Text} from 'react-native'
import { SimpleCustomNavBar } from '../components/CustomNavBar'
import { API } from '../API/Configs';
import { Avatar, Card, IconButton, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';


const ProfileScreen = (props) => {
  const theme = useTheme();
  const api = new API()
  const { navigation } = props;
  const user = useSelector(state=>state.user)
  // console.log(user)


  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <SimpleCustomNavBar  hasAction={true} action={()=>{}}  name="Profile" actionIcon="pencil" iconName="menu" navigation={navigation} />
      <View style={{height:'30%'}}>
        <View style={{width:'100%', height:'50%', backgroundColor:'#0083e7'}}>

        </View>
        <View style={{position:'absolute', alignItems:'center', justifyContent:'center', top:'10%', padding:4, left:'25%', width:'50%', height:'85%', borderRadius:100, backgroundColor:'#fff', zIndex:1}}>
        <Avatar.Image
          size={180}
          source={{
            uri:"https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
            // uri: "https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?s=612x612&w=0&k=20&c=QjebAlXBgee05B3rcLDAtOaMtmdLjtZ5Yg9IJoiy-VY=",
          }}
        />
        </View>
        <View style={{height:'50%',  width:'100%'}}>
        
        </View>
      </View>
      <View style={{flex:1, alignItems:'center', paddingTop:'5%'}}>
      <Card style={{width:'80%', backgroundColor:'rgb(250, 250, 250)'}}>
        <Card.Content>
        <Card.Title
           titleStyle={{fontSize:20}}
           title={user.user.name}
           left={(props) => <Avatar.Icon style={{backgroundColor:null}}  color='#000' {...props} icon="account-outline" />}
        />
         <Card.Title
           titleStyle={{fontSize:20}}
           title={user.user.email}
           left={(props) => <Avatar.Icon style={{backgroundColor:null}} color='#000' {...props} icon="email-outline" />}
        />
        <Card.Title
           titleStyle={{fontSize:20}}
           title={user.user.phone}
           left={(props) => <Avatar.Icon style={{backgroundColor:null}} color='#000' {...props} icon="phone-outline" />}
        />
        </Card.Content>
     </Card>
      </View>
      
    </View>
  )
}

export default ProfileScreen