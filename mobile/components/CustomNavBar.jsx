import * as React from 'react';
import {Text} from 'react-native'
import { Appbar } from 'react-native-paper';

export const MainCustomNavBar = (props) => {
 const {navigation, iconName, actionLeft} = props;
 return(
  <Appbar.Header >
    <Appbar.Action size={30} icon="menu" onPress={() => {navigation.toggleDrawer()}} />
    <Appbar.Content style={{alignItems:'flex-start', justifyContent:'center'}} title={<Text style={{fontSize:26, fontWeight:'bold'}}>Culture <Text style={{color:'#0083e7'}}>Vault</Text></Text>} />
    <Appbar.Action  icon={iconName} onPress={actionLeft} />
  </Appbar.Header>
 )
};

export const SimpleCustomNavBar=(props)=>{
  const {navigation, name, iconName, hasAction, action, actionIcon} = props;
  return(
   <Appbar.Header style={{backgroundColor:'#0083e7'}}>
     <Appbar.Action icon={iconName} size={30} iconColor='#fff' onPress={() => {navigation.toggleDrawer()}} />
     <Appbar.Content style={{alignItems:'left', justifyContent:'center'}} title={<Text style={{fontSize:24, color:'#fff'}}>{name} </Text>} />
     {hasAction && <Appbar.Action iconColor='#fff' icon={actionIcon} onPress={action}  />}
   </Appbar.Header>
  )
};

// export const SimpleCustomNavBar=(props)=>{
//   const {navigation, name, iconName} = props;
//   return(
//    <Appbar.Header style={{backgroundColor:'#0083e7'}}>
//      <Appbar.Action icon={iconName} size={30} iconColor='#fff' onPress={() => {navigation.toggleDrawer()}} />
//      <Appbar.Content style={{alignItems:'left', justifyContent:'center'}} title={<Text style={{fontSize:24, color:'#fff'}}>{name} </Text>} />
//    </Appbar.Header>
//   )
// };