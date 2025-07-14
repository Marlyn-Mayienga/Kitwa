import React, {useEffect, useState, useCallback, useRef} from "react";
import { View, Animated, StyleSheet,RefreshControl, ScrollView } from "react-native";
import { Avatar, Button, Card, SegmentedButtons , Searchbar} from 'react-native-paper';
import ArtifactCard from "../components/ArtifactCard";
import EventCard from "../components/EventCard";
import { MainCustomNavBar } from "../components/CustomNavBar";
import { API } from "../API/Configs";
import EmptyListComponent from "../components/EmptyList";
import CustomSkeleton from "../components/CustonSkeleton";


// const listOfEvents = [1,2,3,4,5,6]
// const listOfArtifacts = [1,2,3]


const EventTab =(props)=>{
  if(props.loading){
    return <View>
      <CustomSkeleton/>
    </View>
  }
  if(props.listOfEvents.length === 0){
    return <EmptyListComponent message="The is no event available for now" />
  }
  return props.listOfEvents.map((element, key)=>{
    return <EventCard {...props} data={element} key={key}/>
  })
}


const ArtifactsTab =(props)=>{
  if(props.loading){
    return <View>
      <CustomSkeleton/>
    </View>
  }
  if(props.listOfArtifacts.length === 0){
    return <EmptyListComponent message="The artifacts list is empty for now" />
  }
  return (props.listOfArtifacts.map((element, key)=>{
    return <ArtifactCard {...props} key={key} data={element} />
  }))
}

const HomeScreen = (props) => {
  const api = new API()
  const [tabValue, setTabValue] = useState('events');
  const {navigation} = props;
  const [showEvents, setShowEvents] = useState(true);
  const [listOfEvents, setListOfEvents] = useState([]);
  const [listOfArtifacts, setListOfArtifacts] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false)
  const onChangeSearch = query => setSearchQuery(query);
  const fadeAnimSearch = useRef(new Animated.Value(0)).current;
  const fadeAnimTabs = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false)

  const fadeInTabs = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnimTabs, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutTabs = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnimTabs, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const fadeInSearch = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnimSearch, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutSearch = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnimSearch, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  const showEventsHandler =(value)=>{
    setShowEvents(value)
  }


  const getEvents = async()=>{
    setLoading(true)

    try{
      const response = await api.getRequest("/event/", true)
      if(response.data.status === 200){
        setListOfEvents(response.data.data.events)
      }else{

      }
    }catch(e){
      console.log(e)
    }
    setLoading(false)

  }

  const getArtifacts = async()=>{
    setLoading(true)

    try{
      const response = await api.getRequest("/artifact/", true)
      if(response.data.status === 200){
        // console.log(response.data.data)
        setListOfArtifacts(response.data.data)
      }else{

      }
    }catch(e){

    }
    setLoading(false)

  }


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getEvents()
    getArtifacts()
    setRefreshing(false);
  }, []);


  useEffect(()=>{
    getEvents()
    getArtifacts()
    fadeInTabs()
  },[])

  return (
    <View style={styles.main}>
      <MainCustomNavBar 
      actionLeft={()=>{
        setShowSearch(!showSearch)
        if(showSearch){
          fadeInTabs()
          fadeOutSearch()
        }else{
          fadeOutTabs()
          fadeInSearch()
        }
      }} 
      iconName= {showSearch?"magnify-close" :"magnify"} navigation={navigation} />
     {showSearch? <Animated.View
     style={{opacity: fadeAnimSearch}}
     >
     
     <Searchbar
      style={{margin:5}}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    </Animated.View>
     : <Animated.View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 80,
          backgroundColor:'#fff',
          opacity: fadeAnimTabs
          // marginBottom: 20,
        }}
      >
      <SegmentedButtons
        style={{width:'80%'}}
        value={tabValue}
        onValueChange={setTabValue}
        theme={{ roundness: 0 }}
        buttons={[
          {
            value: 'events',
            label: 'Events',
            style:tabValue=='events'? styles.activeTabButton:styles.tabButton,

          },
          {
            value: 'artifacts',
            label: 'Artifacts',
            style:tabValue=='artifacts'? styles.activeTabButton:styles.tabButton,
          },
          // { value: 'drive', label: 'Driving' },
        ]}
      />
      </Animated.View>}

   
    <ScrollView 
    
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    style={{paddingHorizontal:'8%', backgroundColor:'#eeeeee', flex:1, paddingTop:10}}>
    {tabValue=='events' ? <EventTab listOfEvents={listOfEvents} loading={loading} {...props} /> : <ArtifactsTab loading={loading} listOfArtifacts={listOfArtifacts} {...props} />}            
     {/* <EventTab listOfEvents={listOfEvents} {...props} />              */}
    
    <View style={{marginTop:20}}></View>
    </ScrollView>
      

    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
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
  activeTabButton:{
    borderRadius:0, 
    borderWidth:0, 
    backgroundColor:'#fff', 
    borderBottomWidth:3, 
    borderBottomColor:'#000'
  },
  tabButton:{
    borderRadius:0, 
    borderWidth:0, 
    backgroundColor:'#fff'
  }
});
export default HomeScreen;
