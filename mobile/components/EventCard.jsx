import React, {useCallback}from 'react'
import { Image, TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { getTheDates, monthsList } from '../utils/Dates';
import { getCoverImage } from '../utils/ImageUtiles';
import { opneUrl } from '../utils/Utils';



const EventCard = (props) => {
  const {navigation, data} = props;


  

  const getTheLocation=()=>{
    return data.event_address
  }

  
  // const handleUrlPressed =useCallback(opneUrl,[])
  
  

  return (
    <TouchableOpacity  style={styles.card} onPress={()=>{navigation.navigate('event_details', {eventId: data.id})}}>
    <Image style={styles.image} source={{uri:getCoverImage(data)}} />
    <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex:4, justifyContent:'center', paddingLeft:30}}>
                  <Text style={{"fontWeight":'bold', fontSize:25}}>{data.name}</Text>
                  
                  <Text onPress={()=>{opneUrl(data.event_address_link)}}  numberOfLines={1} style={{marginTop:3, fontSize:13, textDecorationLine:'underline'}}>{getTheLocation()}</Text>
              </View>
              <View style={{flex:1, backgroundColor:'#e3f2fd', alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:22, fontWeight:'bold', color:'#0083e7'}}>{getTheDates(data.date).date}</Text>
                  <Text style={{color:'#0083e7'}}>{getTheDates(data.date).month}</Text>
              </View>
    </View>
  </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
 
    card: {
      backgroundColor: 'white',
      borderRadius: 4,
      marginTop:10,
      marginBottom:10,
      elevation: 2, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      height:300,
      overflow:'hidden'
    },
    image: {
      height: '70%',
      width: '100%',
      resizeMode: 'cover',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  });
  
export default EventCard