import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { getTheDates } from '../utils/Dates';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const EventReservationCard = (props) => {
  const {heightPar, navigation, data} = props;
  const height = heightPar?heightPar:110
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate('reservation_details')}} style={{width:'100%', height:height,  flexDirection:'column'}}>
      <View style={{width:'100%', height:'20%'}}>
        <View style={{width:'10%', borderRightWidth:0.5, borderColor:'#000', height:'100%'}}>
       
        </View>
      </View>
      <View style={{width:'100%', height:'60%',  flexDirection:'row' }}>
        <View style={{width:'17%', height:'100%', borderRadius:35, marginLeft:5, borderWidth:0.5, alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize:20, fontWeight:'bold'}}>{getTheDates(data.date).date}</Text>
           <Text>{getTheDates(data.date).month}</Text>
        </View>
        <View style={{width:'5%'}}>
            <View style={{height:'50%', borderBottomWidth:0.5, borderColor:'#000', width:'100%'}}>

            </View>
        </View>

        <View style={{height:'100%', flex:1, alignItems:'center', flexDirection:'row'}}>
             <Image style={{height:'90%', resizeMode:'cover', borderRadius:5, width:60}} source={{uri:'https://qph.cf2.quoracdn.net/main-qimg-fea421e6c2d8cbee3a33ca45030fd56b-lq'}} />
             <View style={{flex:1, height:'70%', marginLeft:10, flexDirection:'row'}}>
                 <View style={{width:'85%'}}>
                     <Text numberOfLines={1} style={{fontWeight:'bold', fontSize:20}}>{data.name}</Text>
                     <Text>Tickets {data.tickets.length}</Text>
                 </View>
                 <View style={{justifyContent:'center', paddingRight:3}}>
                 <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                 </View>
             </View>
         </View>
      </View>
      <View style={{width:'100%', height:'20%'}}>
        <View style={{width:'10%', borderRightWidth:0.5, borderColor:'#000', height:'100%'}}>

        </View>
      </View>
    </TouchableOpacity>
  )
}

export default EventReservationCard