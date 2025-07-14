import React from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-paper'
import { getCoverImage, getCoverImageArtifacts } from '../utils/ImageUtiles';

const ArtifactCard = (props) => {
  const {navigation, data} = props;

  return (
    <TouchableOpacity onPress={()=>{navigation.navigate('artifact_details', {artifactId: data.id})}} style={styles.card}>
    <Image style={styles.image} source={{uri:getCoverImageArtifacts(data)}} />
    <View style={{flex:1}}>
        <View style={{flex:1, paddingLeft:30, justifyContent:'flex-end'}}>
            <Text style={{"fontWeight":'bold', fontSize:25}}>{data.name}</Text>
            
        </View>
        <View style={{flex:1, paddingLeft:30, alignItems:'center', justifyContent:'space-between', flexDirection:'row', paddingRight:10}}>
            <View style={{width:'50%', display:'flex', flexDirection:'row'}}>
              <Avatar.Image size={24} style={{marginRight:5}} source={{uri:'https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?s=612x612&w=0&k=20&c=QjebAlXBgee05B3rcLDAtOaMtmdLjtZ5Yg9IJoiy-VY='}} />
              <Text style={{fontSize:18}}>{data.artist.account.first_name}</Text>
            </View>
            
            {/* <View style={{width:45}}></View> */}
            <Text style={{fontWeight:'bold', fontSize:18}}>$ {data.price}</Text>
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
      height: '67%',
      width: '100%',
      resizeMode: 'cover',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  });
export default ArtifactCard