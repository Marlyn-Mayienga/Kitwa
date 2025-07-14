import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  Snackbar,
  Card,
  FAB,
  Modal,
  Button,
  MD3Colors,
  Divider,
} from "react-native-paper";
import { useTheme, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { API } from "../API/Configs";
import { getCoverImage, getCoverImageArtifacts } from "../utils/ImageUtiles";
import { List } from "react-native-paper";
import { getFormDate } from "../utils/Dates";
import PaymentModal from "../components/PaymentModal";
import { opneUrl } from "../utils/Utils";
import CustomSkeleton from "../components/CustonSkeleton";

const EventDetailScreen = (props) => {
  // states
  const api = new API();
  const { navigation, route } = props;
  const { eventId } = route.params;
  const theme = useTheme();
  const [liked, setLiked] = useState(false);
  const [visible, setVisible] = useState(true);
  const [event, setEvent] = useState();
  const [hotels, setHotels] = useState([])
  const [serverMessage, setServerMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [artifacts, setArtifacts] = useState([])
  const onDismissSnackBar = () => setErrorVisible(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [modalVisible, setModelVisibleVisible] = React.useState(false);

  // functions
  const addToWishList = () => {
    setLiked(true);
  };

  // CSS
  const styles = StyleSheet.create({
    image: {
      width: "100%",
      resizeMode: "cover",
      height: "100%",
    },
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
      width: 60,
      height: 60,
      borderRadius: 70,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.custom_colors.buttonMainColor,
    },
    containerStyle: {
      backgroundColor:'#fff',
      height: "100%",
      padding: 20,
    },
    containerStylePay: {
      height: "100%",
      padding: 20,
      justifyContent: "flex-start",
    },
  });

  const getEventById = async () => {
    setVisible(true);

    try {
      // console.log(eventId)
      const response = await api.getRequest("/event/?id=" + eventId, true);
      if (response.data.status === 200) {
        setEvent(response.data.data.event);
        setHotels(response.data.data.hotels)
        setArtifacts(response.data.data.artifacts)
        // console.log(response.data.data.artifacts)
        
      } else {
        setErrorVisible(true);
        setServerMessage(response.data.message);
        setTimeout(() => {
          navigation.pop();
        }, 3000);
      }
    } catch (e) {
      console.log(e);
    }
    setVisible(false);
  };

  useEffect(() => {
    getEventById();
  }, []);

  if (visible) {
    return (
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
      >
        <CustomSkeleton/>
        <CustomSkeleton/>
        <CustomSkeleton/>

        {/* <ActivityIndicator size={50} /> */}
      </Modal>
    );
  }

  return (
    <View style={{ height: "100%" }}>
      <Snackbar
        style={{ zIndex: 3 }}
        visible={errorVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: () => {
            // Do something
          },
        }}
      >
        {serverMessage}
      </Snackbar>
      <View style={{ height: "41%" }}>
        <ImageBackground
          style={{ height: "100%" }}
          source={{
            uri: getCoverImage(event),
            // uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXhg3PSRUJpUQFvIT1dzTNe6hTzEz-mR0y4oNeaxagfAIrIJO61-T0hGJ5TMBoWHKI1Gs&usqp=CAU",
          }} // Replace with the actual path to your image
        >
          <LinearGradient
            start={{ x: 0.5, y: 0.7 }}
            colors={["transparent", "rgba(0,0,0,0.8)"]}
          >
            <View style={{ height: "100%" }}>
              <View>
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: 60,
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <MaterialIcons
                    style={{
                      backgroundColor: "rgba(0,0,0,0.2)",
                      borderRadius: 50,
                      paddingLeft: 8,
                      paddingVertical: 5,
                      alignSelf: "center",
                    }}
                    onPress={() => navigation.pop()}
                    name="arrow-back-ios"
                    size={26}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 2, backgroundColor: "transparent" }}></View>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 30,
                  paddingRight: 15,
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}
                  >
                    {event.name}
                  </Text>
                  <Text style={{ color: "#fff", fontSize: 16, marginLeft: 4 }}>
                    {event.event_address}
                  </Text>
                </View>
                {false && (
                  <View style={{ justifyContent: "center" }}>
                    {!liked ? (
                      <TouchableOpacity
                        onPress={addToWishList}
                        activeOpacity={0.5}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <AntDesign
                          name="plus"
                          size={24}
                          color={theme.custom_colors.buttonMainColor}
                        />
                        <Text
                          style={{
                            color: theme.custom_colors.buttonMainColor,
                            marginLeft: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          Wishlist
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <AntDesign
                        name="heart"
                        style={{ marginRight: 20 }}
                        size={24}
                        color={theme.custom_colors.buttonMainColor}
                      />
                    )}
                  </View>
                )}
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <ScrollView>
        <View style={{ paddingHorizontal: "8%", paddingTop: "5%" }}>
          <Card
            style={{ backgroundColor: "#fff", borderRadius: 4, padding: 5 }}
          >
            <Card.Content>
              <Text style={{ fontSize: 16 }}>{event.description}</Text>
            </Card.Content>
          </Card>
        </View>

        {event.event_activities.length > 0 && (
          <View
            style={{
              paddingHorizontal: "8%",
              height: 45,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 8,
                height: 20,
                backgroundColor: theme.custom_colors.success,
                marginRight: 5,
              }}
            ></View>
            <View>
              <Text style={{ fontWeight: "bold" }}>Activities</Text>
            </View>
          </View>
        )}

        <View
          style={{
            flex: 1,
            paddingHorizontal: "8%",
            marginTop: 5,
            width: "100%",
          }}
        >
          {/* <View style={{backgroundColor:'#fff', width:'100%', height:100, marginTop:5}}>

        </View>

        <View style={{backgroundColor:'#fff', width:'100%', height:100, marginTop:20}}>

        </View> */}

          <List.AccordionGroup>
            {event.event_activities.map((activity, key) => {
              return (
                <List.Accordion key={key} title={activity.title} id={key}>
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: "100%",
                      height: 150,
                      marginTop: 5,
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <Text
                      numberOfLines={3}
                      style={{
                        textAlign: "center",
                        marginRight: 3,
                        width: "70%",
                      }}
                    >
                      {activity.description}
                    </Text>
                    {/* <Text>STARTS : 4PM, on 7th of Jun</Text> */}
                    <Text>
                      STARTS: {getFormDate(activity.time, "ACTIVITIES")}
                    </Text>
                    {/* <Button
                      icon="ticket"
                      mode="contained"
                      style={{ backgroundColor: "red" }}
                    >
                      {activity.price > 0 ? `${activity.price} Ksh` : "FREE"}
                    </Button> */}
                  </View>
                </List.Accordion>
              );
            })}
          </List.AccordionGroup>
        </View>
        {hotels.length > 0 &&
        <View
          style={{
            paddingHorizontal: "8%",
            height: 45,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 8,
              height: 20,
              backgroundColor: theme.custom_colors.buttonMainColor,
              marginRight: 5,
            }}
          ></View>
          <View>
            <Text style={{ fontWeight: "bold" }}>Nearest Hotels</Text>
          </View>
        </View>}
        <View style={{ flex: 1, paddingLeft: "8%", marginTop: 5 }}>
          <ScrollView horizontal={true}>
            {hotels.map((hotel, index)=>{
              // console.log(hotel.image)
              return (<TouchableOpacity
              onPress={()=>{opneUrl(hotel.link)}}
              activeOpacity={0.7}
              key={index}
              style={{
                width: 190,
                overflow: "hidden",
                height: 220,
                // backgroundColor: "red",
                margin: 5,
                marginRight: 15,
                borderRadius: 10,
              }}
            >
              <Image
                style={{ resizeMode: "cover", width:"100%", height:"100%", borderWidth:1}}
                defaultSource={{uri:"https://drive.google.com/uc?export=view&id=1UjQSUF-bk7LBfnzu2YZaG2G2mP3G528s"}}
                source={{
                  uri: hotel.image,
                }}
              />
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'flex-start',paddingBottom:10}}>
                <Text numberOfLines={1} style={{backgroundColor:'rgba(0,0,0,.2)',marginLeft:10, fontSize:17, fontWeight:'bold', color:'#fff'}}>{hotel.name}</Text>
              </View>
            </TouchableOpacity>)

            })}
            
          </ScrollView>
        </View>

        {artifacts.length > 0 &&
        <View
          style={{
            paddingHorizontal: "8%",
            height: 45,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 8,
              height: 20,
              backgroundColor: theme.custom_colors.buttonMainColor,
              marginRight: 5,
            }}
          ></View>
          <View>
            <Text style={{ fontWeight: "bold" }}>Some artifacts/Products</Text>
          </View>
        </View>}

        <View style={{ flex: 1, paddingLeft: "8%", marginTop: 5 }}>
          <ScrollView horizontal={true}>
            {artifacts.map((artifact, index)=>{
              // console.log(hotel.image)
              return (<TouchableOpacity
              // onPress={()=>{opneUrl(hotel.link)}}
              onPress={()=>{
                console.log(artifact.id)
                navigation.navigate('artifact_details', {artifactId: artifact.id})
              }}
              activeOpacity={0.7}
              key={index}
              style={{
                width: 190,
                overflow: "hidden",
                height: 220,
                // backgroundColor: "red",
                margin: 5,
                marginRight: 15,
                borderRadius: 10,
                alignItems:'center',
                justifyContent:'center'
              }}
            >
              <Image
                style={{ resizeMode: "cover", width:"100%", height:"100%", borderWidth:1}}
                defaultSource={{uri:"https://drive.google.com/uc?export=view&id=1UjQSUF-bk7LBfnzu2YZaG2G2mP3G528s"}}
                source={{
                  uri: getCoverImageArtifacts(artifact),
                }}
              />
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'flex-start',paddingBottom:10}}>
                <Text numberOfLines={1} style={{backgroundColor:'rgba(0,0,0,.2)',marginLeft:6, marginRight:1, fontSize:17, fontWeight:'bold', color:'#fff'}}>{artifact.name}</Text>
                <Text numberOfLines={1} style={{backgroundColor:'rgba(0,0,0,.2)',marginLeft:6, marginRight:1, fontSize:17, fontWeight:'bold', color:'#fff'}}>${artifact.price}</Text>
              </View>
            </TouchableOpacity>)

            })}
            
          </ScrollView>
        </View>

      </ScrollView>
      {/* <FAB
        icon={() => {
          return (
            <Image
              style={{
                width: 25,
                marginLeft: 0,
                marginTop: 0,
                height: 25,
                tintColor: "#fff",
              }}
              source={require("../assets/tickets.png")}
            />
          );
        }}
        style={styles.fab}
        mode="elevated"
        onPress={() => setModelVisibleVisible(true)}
      /> */}
      <PaymentModal
        navigation={navigation}
        showModel={modalVisible}
        data={{ activities: event.event_activities, event: event }}
        closeModel={() => {
          setModelVisibleVisible(false);
        }}
      />
    </View>
  );
};

export default EventDetailScreen;
