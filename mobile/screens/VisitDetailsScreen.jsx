import React, {useState, useRef} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { Avatar, useTheme } from 'react-native-paper';
import {MaterialIcons} from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import ImageMagnifier from '../components/ImageMagnifier';
import MediaImageCard from '../components/MediaImageCard';

const VisitDetailsScreen = (props) => {
    const {navigation} = props;
    const theme = useTheme();
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [magnifyImage, setMagnifier] = useState(false)
  return (
    <View style={{flex:1, alignItems:'center'}}>
        <View style={{height:'30%', width:'100%', padding:15, backgroundColor:theme.custom_colors.buttonMainColor}}>
        <TouchableOpacity style={{height:50, width:40, alignItems:'center', justifyContent:'flex-end'}}>
              <MaterialIcons 
                style={{ borderRadius:50, paddingLeft:8, paddingVertical:5, alignSelf:'center'}}
                onPress={() => navigation.pop()}
                name="arrow-back-ios"  
                size={26} 
                color="#fff" 
              />
              </TouchableOpacity>
              <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'#fff', fontSize:23, fontWeight:'bold'}}>14</Text>
                        <Text style={{fontSize:15, color:'#fff'}}>FEB</Text>
                    </View>
                    <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                        <Image style={{width:'70%', height:'65%', borderRadius:10}} source={{uri:'https://kenyalogue.com/wp-content/uploads/2023/02/KAMBA-Dance-1.jpg'}} />
                    </View>
                    <View style={{flex:3}}>
                        <Text numberOfLines={2} style={{fontSize:25, fontWeight:'bold', color:'#fff'}}>Godmesa was crazy!</Text>
                    </View>
              </View>
        </View>
        <View style={{flex:1, paddingHorizontal:'5%'}}>
            <Text style={{fontSize:23, marginVertical:10, fontWeight:'bold', color:theme.custom_colors.buttonMainColor}}>Pictures and videos</Text>
            <View style={{
                            flex:1, 
                            maxHeight:130,
                               
                        }}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                // contentContainerStyle={{minWidth:'100%', height:130}}
            >
                <MediaImageCard imageUrl="https://kenyalogue.com/wp-content/uploads/2023/02/KAMBA-Dance-1.jpg" onPress={()=>{setMagnifier(true)}} />
                <View style={{
                    height:100, width:95, 
                    borderRadius:7, 
                    backgroundColor:'red', 
                    margin:10,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 9,
                    },
                    shadowOpacity: 0.48,
                    shadowRadius: 11.95,

                    elevation: 18,
                }}>
                    <Video
                        ref={video}
                        style={{width:'100%', height:100, borderRadius:7}}
                        source={{
                        uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                        }}
                        useNativeControls
                        resizeMode={ResizeMode.COVER}
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                </View>
                <MediaImageCard imageUrl="https://kenyalogue.com/wp-content/uploads/2023/02/KAMBA-Dance-1.jpg" onPress={()=>{}} />
                
                <MediaImageCard imageUrl="https://kenyalogue.com/wp-content/uploads/2023/02/KAMBA-Dance-1.jpg" onPress={()=>{}} />
                
            </ScrollView>
            </View>
            <View style={{height:100}}>
                <Text numberOfLines={1} style={{fontSize:20, marginVertical:7, fontWeight:'bold', color:theme.custom_colors.buttonMainColor}}>Godmessa was crazy</Text>
                <View
                    style={{width:'100%', height:'70%', flexDirection:'row', alignItems:'center', padding:3}}
                >
                    <Avatar.Image size={54} source={{uri:'https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?s=612x612&w=0&k=20&c=QjebAlXBgee05B3rcLDAtOaMtmdLjtZ5Yg9IJoiy-VY='}} />
                    <View style={{flex:1, marginLeft:10, justifyContent:'center'}}>
                        <Text numberOfLines={1} style={{fontSize:18, marginVertical:2}} >Patrick Iradukunda</Text>
                        <View style={{flexDirection:'row'}}>
                        <AntDesign name="star" size={14} color={theme.custom_colors.buttonMainColor} />
                        <AntDesign name="star" size={14} color={theme.custom_colors.buttonMainColor} />
                        <AntDesign name="staro" size={14} color={theme.custom_colors.buttonMainColor} />
                        <AntDesign name="staro" size={14} color={theme.custom_colors.buttonMainColor} />
                        <AntDesign name="staro" size={14} color={theme.custom_colors.buttonMainColor} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{marginVertical:10, flex:1}}>
                <Text style={{fontSize:16}} numberOfLines={6}>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis provident ipsam hic officiis, explicabo magnam quod accusantium dolores, ducimus rem ipsa blanditiis voluptas possimus eligendi voluptatem tempore? Dicta veniam quae, numquam unde iure eveniet omnis qui amet porro iste incidunt neque nobis adipisci voluptatum ea, fugit laborum. Nihil vel totam incidunt, officia tenetur eum fuga quo necessitatibus voluptas, expedita exercitationem beatae nostrum! Fugiat magni autem blanditiis facere cupiditate explicabo iste mollitia voluptate, unde temporibus. Repellendus quaerat maiores minima blanditiis libero, ratione magnam dolorum excepturi quae sapiente voluptatem? Odit et, veniam molestiae porro, iure asperiores cupiditate autem labore sit, fugit a.
                </Text>
                <Text style={{color:theme.custom_colors.buttonMainColor}}>Read more..</Text>    
            </View>
            {false?<View style={{flex:1, justifyContent:'center'}}>
                <Text style={{fontSize:20, fontWeight:'bold', color:theme.custom_colors.buttonMainColor}}>Rate this post</Text>
                <View style={{flexDirection:'row', marginVertical:5}}>
                    <AntDesign name="staro" style={{marginHorizontal:5}} size={22} color={theme.custom_colors.buttonMainColor} />
                    <AntDesign name="staro" style={{marginHorizontal:5}} size={22} color={theme.custom_colors.buttonMainColor} />
                    <AntDesign name="staro" style={{marginHorizontal:5}} size={22} color={theme.custom_colors.buttonMainColor} />
                    <AntDesign name="staro" style={{marginHorizontal:5}} size={22} color={theme.custom_colors.buttonMainColor} />
                    <AntDesign name="staro" style={{marginHorizontal:5}} size={22} color={theme.custom_colors.buttonMainColor} />
                </View>
            </View>:
            <View style={{flex:1, justifyContent:'center'}}>
                <View style={{flexDirection:'row', marginVertical:5}}>
                    <TouchableOpacity>
                        <AntDesign name="delete" style={{marginHorizontal:10}} size={24} color={theme.custom_colors.danger} />
                    </TouchableOpacity>
    
                    <View style={{width:20}}></View>
                    <TouchableOpacity>
                        <AntDesign name="edit" style={{marginHorizontal:10}} size={24} color={theme.custom_colors.success} />
                    </TouchableOpacity>
    
                </View>
            </View>}
        </View>
        <ImageMagnifier isVideo={true} isVisible={magnifyImage} close={()=>{setMagnifier(false)}} imageUrl="https://kenyalogue.com/wp-content/uploads/2023/02/KAMBA-Dance-1.jpg"  />
    </View>
  )
}

export default VisitDetailsScreen